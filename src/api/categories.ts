import { type Category } from "../types/dataTypes";

const BASE_URL = "http://localhost:3000/categories";

// Fetches all categories from the backend.
export async function getAllCategories(): Promise<Category[]> {
  const url = BASE_URL;
  // console.log(`Fetching all categories from: ${url}`);

  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to fetch all categories. Please try again later.");
  }
}

// Fetches categories of a specific type from the backend.
export async function getCategoriesByType(type: string): Promise<Category[]> {
  const url = `${BASE_URL}/${type}`;
  // console.log(`Fetching categories by type from: ${url}`);

  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(
      `Failed to fetch categories of type ${type}. Please try again later.`
    );
  }
}
