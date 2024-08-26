import { Product } from "../types/dataTypes";
import { sortProductPage } from "../constants/queryConstants";

// Define sortOrder as one of the keys of sortProductPage
export function sortProducts(
  productsToSort: Product[],
  sortOrder: keyof typeof sortProductPage
) {
  const sortFunction = sortProductPage[sortOrder] || (() => 0);
  return [...productsToSort].sort(sortFunction);
}
