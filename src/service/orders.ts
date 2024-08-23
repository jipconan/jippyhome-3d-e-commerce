import * as ordersAPI from "../api/orders";

// Creates a new order and handles potential errors
export async function createOrder(
  userId: string | null,
  invoiceNumber: string
): Promise<void> {
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }
    await ordersAPI.createOrder(userId, invoiceNumber);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Fetches all orders for a specific user and handles potential errors
export async function getOrdersByUserId(userId: string): Promise<string[]> {
  try {
    const orderIds = await ordersAPI.getOrdersByUserId(userId);
    return orderIds;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw error;
  }
}

// Updates orders by user ID and handles potential errors
export async function updateOrdersByUserId(
  userId: string,
  invoiceNumber: string
): Promise<void> {
  try {
    await ordersAPI.updateOrdersByUserId(userId, invoiceNumber);
  } catch (error) {
    console.error("Error updating orders by user ID:", error);
    throw new Error("Failed to update orders. Please try again.");
  }
}
