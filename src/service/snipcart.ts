import * as snipcartAPI from "../api/snipcart";
import { SnipcartOrdersResponse } from "../types/snipcartFetchTypes";

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

// Retrieves orders by invoice number from Snipcart API
export async function getSnipcartOrdersByOrderId(
  invoiceNumbers: string[]
): Promise<SnipcartOrdersResponse> {
  try {
    const orders = await snipcartAPI.getSnipcartOrdersByOrderId(invoiceNumbers);
    return orders;
  } catch (error) {
    console.error("Error retrieving orders by invoice number:", error);
    throw error;
  }
}
