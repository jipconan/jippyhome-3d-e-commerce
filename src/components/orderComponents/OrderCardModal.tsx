import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  Divider,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SnipcartOrdersResponse } from "../../types/snipcartFetchTypes";

type OrderCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  order: SnipcartOrdersResponse[number];
};

const OrderCardModal: React.FC<OrderCardModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  // Define responsive modal size
  const modalSize = useBreakpointValue({ base: "full", md: "full", lg: "6xl" });

  // Define responsive grid templates
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    md: "repeat(3, 1fr)",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={8}>
            {/* Order ID and Status */}
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Order ID: {order.invoiceNumber}
            </Text>
            <Divider mb={4} />

            {/* Responsive Grid for Order Details */}
            <Grid templateColumns={gridTemplateColumns} gap={6}>
              {/* User Details */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  User Details:
                </Text>
                <Text>Name: {order.items[0].billingAddress?.fullAddress}</Text>
                <Text>Email: {order.items[0].user?.email}</Text>
              </Box>

              {/* Order Summary */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Order Summary:
                </Text>
                <Text>Products: {order.items[0].items[0].subtotal}</Text>
                <Text>Total: {order.items[0].summary?.total}</Text>
              </Box>

              {/* Payment Details */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Payment Details:
                </Text>
                <Text>Payment Status: {order.items[0].paymentStatus}</Text>
                <Text>Payment Method: {order.items[0].paymentMethod}</Text>
                <Text>Card Holder Name: {order.items[0].cardHolderName}</Text>
                <Text>Card Type: {order.items[0].cardType}</Text>
                <Text>
                  Card Last 4 no.: {order.items[0].creditCardLast4Digits}
                </Text>
              </Box>
            </Grid>

            <Divider my={4} />

            {/* Responsive Grid for Addresses and Tracking */}
            <Grid templateColumns={gridTemplateColumns} gap={6}>
              {/* Billing Address */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Billing Address:
                </Text>
                <Text>
                  Address: {order.items[0].user?.billingAddress?.fullAddress}
                </Text>
                <Text>
                  Postal Code: {order.items[0].billingAddress?.postalCode}
                </Text>
                <Text>Country: {order.items[0].billingAddress?.country}</Text>
                <Text>City: {order.items[0].billingAddress?.city}</Text>
                <Text>Province: {order.items[0].billingAddress?.province}</Text>
                <Text>Phone: {order.items[0].billingAddress?.phone}</Text>
              </Box>

              {/* Shipping Address */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Shipping Address:
                </Text>
                <Text>
                  Address: {order.items[0].user?.shippingAddress?.fullAddress}
                </Text>
                <Text>
                  Postal Code: {order.items[0].shippingAddress?.postalCode}
                </Text>
                <Text>Country: {order.items[0].shippingAddress?.country}</Text>
                <Text>City: {order.items[0].shippingAddress?.city}</Text>
                <Text>
                  Province: {order.items[0].shippingAddress?.province}
                </Text>
                <Text>Phone: {order.items[0].shippingAddress?.phone}</Text>
              </Box>

              {/* Tracking Details */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Tracking Details:
                </Text>
                <Text>
                  Tracking Number: {order.items[0].trackingNumber || "none"}
                </Text>
                <Text>
                  Tracking URL: {order.items[0].trackingUrl || "none"}
                </Text>
              </Box>
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderCardModal;
