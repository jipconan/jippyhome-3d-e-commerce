import { ProductsByCategory } from "../types/dataTypes";

const BASE_URL = "http://localhost:3000/finder";

// Fetches all products based on sub-category.
export async function getProductsBySubCategory(): Promise<ProductsByCategory> {
  const createURL = `${BASE_URL}`;
  const res = await fetch(createURL);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Failed to fetch products by sub catagories");
  }
}
