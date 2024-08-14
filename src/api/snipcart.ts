const BASE_URL = "http://localhost:3000/snipcart";

// Function to get snipcart API key from backend
export async function getSnipcartApiKey(): Promise<string> {
  const url = `${BASE_URL}/key`;

  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error("Failed to fetch Snipcart API key");
    }
    const data = await response.json();
    return data.apiKey;
  } catch (error) {
    console.error("Error fetching Snipcart API key from backend:", error);
    throw error;
  }
}
