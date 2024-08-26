// queryUtils.ts

import { Product } from "../types/dataTypes";
import { sortProductPage } from "../constants/queryConstants";

// Sorting function based on selected sort order
export function sortProducts(productsToSort: Product[], sortOrder: string) {
  const sortFunction = sortProductPage[sortOrder] || (() => 0); // Fallback to no sorting
  return [...productsToSort].sort(sortFunction);
}
