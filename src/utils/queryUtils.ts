import { Product } from "../types/dataTypes";
import { sortProductPage, sortMerchantPage } from "../constants/queryConstants";

// Define sortOrder as one of the keys of sortProductPage
export function sortProducts(
  productsToSort: Product[],
  sortOrder: keyof typeof sortProductPage
) {
  const sortFunction = sortProductPage[sortOrder] || (() => 0);
  return [...productsToSort].sort(sortFunction);
}

// Define sortOrder as one of the keys of sortProductPage
export function sortMerchantProducts(
  productsToSort: Product[],
  sortOrder: keyof typeof sortMerchantPage
) {
  const sortFunction = sortMerchantPage[sortOrder] || (() => 0);
  return [...productsToSort].sort(sortFunction);
}
