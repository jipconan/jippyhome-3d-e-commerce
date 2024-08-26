// Define the types for ProductSort and MerchantSort
import { ProductSort, MerchantSort } from "../types/propsTypes";

// Update the sort functions with proper typing

const sortProductPage = {
  "Name A-Z": (a: ProductSort, b: ProductSort) => a.name.localeCompare(b.name),
  "Name Z-A": (a: ProductSort, b: ProductSort) => b.name.localeCompare(a.name),
  "Price Low-High": (a: ProductSort, b: ProductSort) => a.price - b.price,
  "Price High-Low": (a: ProductSort, b: ProductSort) => b.price - a.price,
};

const sortMerchantPage = {
  "name-A-Z": (a: MerchantSort, b: MerchantSort) =>
    a.name.localeCompare(b.name),
  "name-Z-A": (a: MerchantSort, b: MerchantSort) =>
    b.name.localeCompare(a.name),
  "stock-Low-High": (a: MerchantSort, b: MerchantSort) => a.stock - b.stock,
  "stock-High-Low": (a: MerchantSort, b: MerchantSort) => b.stock - a.stock,
  "price-Low-High": (a: MerchantSort, b: MerchantSort) => a.price - b.price,
  "price-High-Low": (a: MerchantSort, b: MerchantSort) => b.price - a.price,
};

export { sortProductPage, sortMerchantPage };
