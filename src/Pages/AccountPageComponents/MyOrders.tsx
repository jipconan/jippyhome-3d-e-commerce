import React, { useEffect, useState } from "react";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useLoading, useError } from "../../utils/PageUtils";
import { Order } from "../../types/propsTypes";
import axios from "axios";

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { loading, setLoading, LoadingComponent } = useLoading();
  const { setError, ErrorComponent } = useError();

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
    return <LoadingComponent />;
  }

  return (
    <>
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
      {/* Show error message if there's an error */}
      <ErrorComponent />
    </>
  );
};

export default MyOrders;
