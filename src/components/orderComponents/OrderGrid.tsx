import React, { useEffect, useState } from "react";
import { SnipcartOrdersResponse } from "../../types/snipcartFetchTypes";
import { getOrdersByUserId } from "../../service/orders";
import { getSnipcartOrdersByOrderId } from "../../service/snipcart";
import {
  Grid,
  GridItem,
  Box,
  Text,
  useDisclosure,
  Heading,
  Stack,
  Flex,
} from "@chakra-ui/react";
import * as Comps from "../../components";
import { useLoading, useError } from "../../utils/PageUtils";
import { formatDate } from "../../utils/formatUtils";
import { getColumnTemplate } from "../../utils/mathUtil";

type OrderPageProps = {
  user: string | null;
};

const headerItems = [
  "Date",
  "Status",
  "Order ID",
  "Total",
  "Payment Method",
  "Address",
];

const OrderGrid: React.FC<OrderPageProps> = ({ user }) => {
  const [orderIds, setOrderIds] = useState<string[]>([]);
  const [snipcartOrders, setSnipcartOrders] = useState<SnipcartOrdersResponse>(
    []
  );
  const [selectedOrder, setSelectedOrder] = useState<
    SnipcartOrdersResponse[number] | null
  >(null);
  const [hasOrders, setHasOrders] = useState<boolean>(true); // New state for checking if there are orders
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, setLoading, LoadingComponent } = useLoading();
  const { setError, ErrorComponent } = useError();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(snipcartOrders.length / itemsPerPage);

  const currentData = snipcartOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchOrderIds = async () => {
    if (!user) {
      setError("User is not logged in.");
      return;
    }
    try {
      const orders = await getOrdersByUserId(user);

      if (orders.length === 0) {
        setHasOrders(false);
        return;
      }

      setOrderIds(orders);
      setHasOrders(true);
    } catch (error) {
      console.error("Error fetching order IDs:", error);
      setError("Failed to fetch order IDs.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSnipcartOrders = async (orderIds: string[]) => {
    try {
      setLoading(true);
      const fetchedOrders = await getSnipcartOrdersByOrderId(orderIds);
      setSnipcartOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching Snipcart orders:", error);
      setError("Failed to fetch Snipcart orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (order: SnipcartOrdersResponse[number]) => {
    setSelectedOrder(order);
    onOpen();
  };

  useEffect(() => {
    if (user) {
      fetchOrderIds();
    }
  }, [user]);

  useEffect(() => {
    if (orderIds.length > 0) {
      fetchSnipcartOrders(orderIds);
    }
  }, [orderIds]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Box p={6} maxW="100vw" overflowX="auto">
      {hasOrders ? (
        <Stack spacing={4}>
          <Heading as="h3" size="lg" mb={8} textAlign="start">
            Your Orders
          </Heading>

          <Box px={4}>
            <Grid
              templateColumns={getColumnTemplate(headerItems.length)}
              gap={4}
              fontWeight="bold"
            >
              {headerItems.map((header) => (
                <GridItem key={header}>
                  <strong>{header}</strong>
                </GridItem>
              ))}
            </Grid>
          </Box>

          <Stack minH="35vh">
            {currentData.map((order) => (
              <Box
                key={order.invoiceNumber}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                boxShadow="md"
                bg="white"
                cursor="pointer"
                onClick={() => handleCardClick(order)}
              >
                <Grid
                  templateColumns={getColumnTemplate(headerItems.length)}
                  gap={4}
                  alignItems="center"
                >
                  <GridItem>
                    {formatDate(order.items[0]?.creationDate ?? "")}
                  </GridItem>
                  <GridItem>{order.items[0].status}</GridItem>
                  <GridItem>{order.invoiceNumber}</GridItem>
                  <GridItem>
                    <Stack direction="row">
                      <Text textTransform="uppercase">
                        {order.items[0].currency}
                      </Text>
                      <Text>{order.items[0].finalGrandTotal}</Text>
                    </Stack>
                  </GridItem>

                  <GridItem>{order.items[0].paymentMethod}</GridItem>
                  <GridItem>
                    {order.items[0].user?.shippingAddress?.fullAddress}
                  </GridItem>
                </Grid>
              </Box>
            ))}
          </Stack>

          <Box py={4}>
            {/* Pagination */}
            <Comps.Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>

          {selectedOrder && (
            <Comps.OrderCardModal
              isOpen={isOpen}
              onClose={onClose}
              order={selectedOrder}
            />
          )}

          {/* Show error message if there's an error */}
          <ErrorComponent />
        </Stack>
      ) : (
        <Box h="80vh">
          <Flex align="center" justify="center" height="full">
            <Text fontSize="4xl">No orders available</Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default OrderGrid;
