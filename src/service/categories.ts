import * as categoriesAPI from "../api/categories";
import { type Category } from "../types/dataTypes";

// Retrieves all categories from the API
export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await categoriesAPI.getAllCategories();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Retrieves categories based on the specified type from the API
export async function getCategoriesByType(type: string): Promise<Category[]> {
  try {
    const categories = await categoriesAPI.getCategoriesByType(type);
    return categories;
  } catch (error) {
    console.error("Error fetching user categories:", error);
    throw error;
  }
}

// Retrieves categories based on the specified name from the API
export async function getCategoriesByName(name: string): Promise<Category> {
  try {
    const categories = await categoriesAPI.getCategoriesByName(name);
    return categories;
  } catch (error) {
    console.error("Error fetching user categories:", error);
    throw error;
  }
}

// Retrieves categories based on the specified type from the API
export async function getCategoriesByLevel(level: number): Promise<Category[]> {
  try {
    const categories = await categoriesAPI.getCategoriesByLevel(level);
    return categories;
  } catch (error) {
    console.error("Error fetching user categories:", error);
    throw error;
  }
}
