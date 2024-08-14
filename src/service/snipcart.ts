import * as snipcartAPI from "../api/snipcart";

// Retrieves the Snipcart API key from the API and handles potential errors
export async function getSnipcartApiKey(): Promise<string> {
  try {
    const response = await snipcartAPI.getSnipcartApiKey();
    return response;
  } catch (error) {
    console.error("Error fetching Snipcart API key:", error);
    throw error;
  }
}
