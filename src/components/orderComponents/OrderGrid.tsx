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
} from "@chakra-ui/react";
import * as Comps from "../../components";
import { useLoading, useError } from "../../utils/PageUtils";
import { getColumnTemplate } from "../../utils/mathUtil";

type OrderPageProps = {
  user: string | null;
};

const headerItems = ["Order ID", "Status", "Total", "Name", "Email", "Address"];

const OrderGrid: React.FC<OrderPageProps> = ({ user }) => {
  const [orderIds, setOrderIds] = useState<string[]>([]);
  const [snipcartOrders, setSnipcartOrders] = useState<SnipcartOrdersResponse>(
    []
  );
  const [selectedOrder, setSelectedOrder] = useState<
    SnipcartOrdersResponse[number] | null
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, setLoading, LoadingComponent } = useLoading();
  const { setError, ErrorComponent } = useError();

  const fetchOrderIds = async () => {
    if (!user) {
      setError("User is not logged in.");
      return;
    }
    try {
      const orders = await getOrdersByUserId(user);
      setOrderIds(orders);
    } catch (error) {
      console.error("Error fetching order IDs:", error);
      setError("Failed to fetch order IDs.");
    }
  };

  const fetchSnipcartOrders = async (orderIds: string[]) => {
    try {
      const fetchedOrders = await getSnipcartOrdersByOrderId(orderIds);
      setSnipcartOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching Snipcart orders:", error);
      setError("Failed to fetch Snipcart orders.");
    } finally {
      setLoading(false);
    }
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

  const handleCardClick = (order: SnipcartOrdersResponse[number]) => {
    setSelectedOrder(order);
    onOpen();
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Box p={6} maxW="100vw" overflowX="auto">
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
        {snipcartOrders.map((order) => (
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
              <GridItem>{order.invoiceNumber}</GridItem>
              <GridItem>{order.items[0].status}</GridItem>
              <GridItem>
                <Stack direction="row">
                  <Text textTransform="uppercase">
                    {order.items[0].currency}
                  </Text>
                  <Text>{order.items[0].finalGrandTotal}</Text>
                </Stack>
              </GridItem>
              <GridItem>{order.items[0]?.cardHolderName}</GridItem>
              <GridItem>{order.items[0].user?.email}</GridItem>
              <GridItem>
                {order.items[0].user?.shippingAddress?.fullAddress}
              </GridItem>
            </Grid>
          </Box>
        ))}

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
    </Box>
  );
};

export default OrderGrid;
