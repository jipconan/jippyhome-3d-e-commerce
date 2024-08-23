import { CartConfirmResponse } from "../types/snipcartTypes";
import { createOrder } from "../service/orders"; // Import the createOrder function

export function initializeSnipcartEventHandlers(userId: string | null) {
  console.log("Initializing Snipcart event handlers...");

  const checkSnipcartAvailability = () => {
    if (typeof window.Snipcart !== "undefined") {
      console.log("Snipcart is loaded and available");

      window.Snipcart.events.on(
        "cart.confirmed",
        async (event: CartConfirmResponse) => {
          console.log("Cart Confirm Response:", event);

          // Access the invoiceNumber directly from the event object
          const { invoiceNumber } = event;
          console.log("Invoice Number:", invoiceNumber);

          // Access the cart details
          const order = event.cart; // Assuming 'cart' contains the order details
          console.log("Order confirmed:", order);

          // Log userId to see if it's available
          console.log("User ID:", userId);

          // Make an API call to store the invoice number with userId
          if (invoiceNumber && userId) {
            try {
              await createOrder(userId, invoiceNumber);
              console.log("Invoice stored successfully.");
            } catch (error) {
              console.error("Error storing invoice:", error);
            }
          } else {
            console.warn("Invoice number or User ID is missing.");
          }
        }
      );
    } else {
      console.warn("Snipcart is not loaded. Retrying...");
      setTimeout(checkSnipcartAvailability, 1000); // Retry after 1 second
    }
  };

  checkSnipcartAvailability();
}
