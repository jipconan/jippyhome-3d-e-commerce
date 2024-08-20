import React, { useEffect, useState } from "react";
import { Box, Heading, List, ListItem, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>
        My Orders
      </Heading>
      <List spacing={3}>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <Text fontWeight="bold">Order ID:</Text> {order.id}
            <Text fontWeight="bold">Date:</Text>{" "}
            {new Date(order.date).toLocaleDateString()}
            <Text fontWeight="bold">Total:</Text> ${order.total.toFixed(2)}
            <Text fontWeight="bold">Status:</Text> {order.status}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyOrders;
