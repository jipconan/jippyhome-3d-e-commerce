import axios from "axios";
import { type Category } from "../types/dataTypes";

// const BASE_URL = "http://localhost:3000/categories";
// const BASE_URL = "https://jippy.home.ngrok.app/categories";
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
    const response = await axios.get<Category[]>(
      `${BASE_URL}/categorytype/${type}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch categories of type ${type}:`, error);
    throw new Error(
      `Failed to fetch categories of type ${type}. Please try again later.`
    );
  }
}

// Fetches categories of a specific name from the backend.
export async function getCategoriesByName(name: string): Promise<Category> {
  try {
    const response = await axios.get<Category>(
      `${BASE_URL}/categoryname/${name}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch categories of name ${name}:`, error);
    throw new Error(
      `Failed to fetch categories of name ${name}. Please try again later.`
    );
  }
}

// Fetches categories by level from the backend.
export async function getCategoriesByLevel(level: number): Promise<Category[]> {
  try {
    const response = await axios.get<Category[]>(`${BASE_URL}/level/${level}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch categories of level ${level}:`, error);
    throw new Error(
      `Failed to fetch categories of level ${level}. Please try again later.`
    );
  }
}
