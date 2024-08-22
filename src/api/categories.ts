import axios from "axios";
import { type Category } from "../types/dataTypes";

// const BASE_URL = "http://localhost:3000/categories";
const BASE_URL =
  "https://jippyhome-be-node-express-mongodb.onrender.com/categories";

// Fetches all categories from the backend.
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await axios.get<Category[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all categories:", error);
    throw new Error("Failed to fetch all categories. Please try again later.");
  }
}

// Fetches categories of a specific type from the backend.
export async function getCategoriesByType(type: string): Promise<Category[]> {
  try {
    const response = await axios.get<Category[]>(`${BASE_URL}/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch categories of type ${type}:`, error);
    throw new Error(
      `Failed to fetch categories of type ${type}. Please try again later.`
    );
  }
}
