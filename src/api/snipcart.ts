import axios from "axios";

// const BASE_URL = "http://localhost:3000/snipcart";
const BASE_URL =
  "https://jippyhome-be-node-express-mongodb.onrender.com/snipcart";

// Function to get snipcart API key from backend
export async function getSnipcartApiKey(): Promise<string> {
  try {
    const response = await axios.get<{ apiKey: string }>(`${BASE_URL}/key`);

    return response.data.apiKey;
  } catch (error) {
    console.error("Error fetching Snipcart API key from backend:", error);
    throw new Error("Failed to fetch Snipcart API key.");
  }
}
