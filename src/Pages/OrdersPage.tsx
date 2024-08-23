import React, { useEffect, useState } from "react";
import { SnipcartOrdersResponse } from "../types/snipcartFetchTypes"; // Ensure this import matches your file structure
import { getOrdersByUserId } from "../service/orders";
import { getSnipcartOrdersByOrderId } from "../service/snipcart";
import {
  Stack,
  Heading,
  Text,
  Box,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import * as Comps from "../components";

// Ensure that `user` can be `string` or `null`
type OrderPageProps = {
  user: string | null;
};

// Define the component
const OrderPage: React.FC<OrderPageProps> = ({ user }) => {
  const [orderIds, setOrderIds] = useState<string[]>([]);
  const [snipcartOrders, setSnipcartOrders] = useState<SnipcartOrdersResponse>(
    []
  );
  const [selectedOrder, setSelectedOrder] = useState<
    SnipcartOrdersResponse[number] | null
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch order IDs by user
  const fetchOrderIds = async () => {
    if (!user) {
      setError("User is not logged in.");
      return;
    }
    try {
      const orders = await getOrdersByUserId(user);
      setOrderIds(orders);
      console.log("Fetched Order IDs:", orders);
    } catch (error) {
      console.error("Error fetching order IDs:", error);
      setError("Failed to fetch order IDs.");
    }
  };

  // Fetch Snipcart orders based on order IDs
  const fetchSnipcartOrders = async (orderIds: string[]) => {
    try {
      const fetchedOrders = await getSnipcartOrdersByOrderId(orderIds);
      setSnipcartOrders(fetchedOrders);
      // console.log("Fetched Snipcart Orders:", fetchedOrders);
    } catch (error) {
      console.error("Error fetching Snipcart orders:", error);
      setError("Failed to fetch Snipcart orders.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch order IDs when the user changes
  useEffect(() => {
    if (user) {
      fetchOrderIds();
    }
  }, [user]);

  // Fetch Snipcart orders when order IDs are available
  useEffect(() => {
    if (orderIds.length > 0) {
      fetchSnipcartOrders(orderIds);
    }
  }, [orderIds]);

  // Handle card click to open the modal
  const handleCardClick = (order: SnipcartOrdersResponse[number]) => {
    setSelectedOrder(order);
    onOpen();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Stack spacing={4} p={4}>
      <Heading as="h1" mb={4}>
        Snipcart Orders
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={4}>
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
            <Text fontSize="lg" fontWeight="bold">
              Order ID:
            </Text>
            <Text mb={4}>{order.invoiceNumber}</Text>
            <Text fontSize="lg" fontWeight="bold">
              Status:
            </Text>
            <Text mb={4}>{order.items[0].status}</Text>
            <Text fontSize="lg" fontWeight="bold">
              Total:
            </Text>
            <Stack direction="row">
              <Text textTransform="uppercase">{order.items[0].currency}</Text>
              <Text>{order.items[0].finalGrandTotal}</Text>
            </Stack>
            <Box mt={4}>
              <Text fontSize="lg" fontWeight="bold">
                User Details:
              </Text>
              <Text>Name: {order.items[0].user?.fullName}</Text>
              <Text>Email: {order.items[0].user?.email}</Text>
              <Text>
                Address: {order.items[0].user?.shippingAddress?.fullAddress}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {selectedOrder && (
        <Comps.OrderCardModal
          isOpen={isOpen}
          onClose={onClose}
          order={selectedOrder}
        />
      )}
    </Stack>
  );
};

export default OrderPage;
