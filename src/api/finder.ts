import axios from "axios";
import { ProductsByCategory } from "../types/dataTypes";

// const BASE_URL = "http://localhost:3000/finder";
// const BASE_URL = "https://jippy.home.ngrok.app/finder";
const BASE_URL =
  "https://jippyhome-be-node-express-mongodb.onrender.com/finder";

// Fetches all products based on sub-category.
export async function getProductsBySubCategory(): Promise<ProductsByCategory> {
  try {
    const response = await axios.get<ProductsByCategory>(`${BASE_URL}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products by sub-categories:", error);
    throw new Error("Failed to fetch products by sub-categories.");
  }
}
