import * as finderAPI from "../api/finder";
import { ProductsByCategory } from "../types/dataTypes";

// Retrieves products grouped by subcategories and handles potential errors
export async function getProductsBySubCategory(): Promise<ProductsByCategory> {
  try {
    const products = await finderAPI.getProductsBySubCategory();
    // console.log("incoming - getProductsBySubCategory - products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products by sub categories:", error);
    throw error;
  }
}
