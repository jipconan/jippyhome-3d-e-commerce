import { Product, Category } from "../types/dataTypes";
import { sortProductPage, sortMerchantPage } from "../constants/queryConstants";
import Fuse from "fuse.js";

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

export const searchItems = (
  products: Product[],
  categories: Category[],
  searchTerm: string,
  productKeys: (keyof Product)[],
  categoryKeys: (keyof Category)[]
) => {
  // Return empty results if searchTerm is less than 2 characters
  if (searchTerm.length < 2) {
    return {
      products: [],
      categories: [],
    };
  }

  const fuseProducts = new Fuse(products, {
    keys: productKeys as string[],
    includeScore: true,
    threshold: 0.2,
  });

  const fuseCategories = new Fuse(categories, {
    keys: categoryKeys as string[],
    includeScore: true,
    threshold: 0.2,
  });

  // Perform search for both products and categories
  const productResults = fuseProducts.search(searchTerm.trim());
  const categoryResults = fuseCategories.search(searchTerm.trim());

  return {
    products: productResults.map((res) => res.item),
    categories: categoryResults.map((res) => res.item),
  };
};
