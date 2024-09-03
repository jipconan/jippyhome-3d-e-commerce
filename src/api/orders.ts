import axios from "axios";

// API base URL
// const BASE_URL = "http://localhost:3000/orders";
// const BASE_URL = "https://jippy.home.ngrok.app/orders";
const BASE_URL =
  "https://jippyhome-be-node-express-mongodb.onrender.com/orders";

// Creates a new order with the given user ID and invoice number
export async function createOrder(
  userId: string,
  invoiceNumber: string
): Promise<void> {
  try {
    await axios.post(
      BASE_URL,
      { userId, invoiceNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order. Please try again.");
  }
}

// Fetches orders by user ID and returns an array of order IDs
export async function getOrdersByUserId(userId: string): Promise<string[]> {
  try {
    const response = await axios.get<string[]>(`${BASE_URL}/${userId}`);
    // console.log("in - api/getOrdersByUserId - response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw new Error("Failed to fetch orders. Please try again.");
  }
}

// Updates orders by user ID
export async function updateOrdersByUserId(
  userId: string,
  invoiceNumber: string
): Promise<void> {
  try {
    await axios.put(
      `${BASE_URL}/${userId}`,
      { invoiceNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error updating orders by user ID:", error);
    throw new Error("Failed to update orders. Please try again.");
  }
}
