import { Product } from "../../../types/dataTypes";
import { FilterValues } from "../../../types/propsTypes";

export const filterProducts = (products: Product[], filters: FilterValues) => {
  return products.filter((product) => {
    // Assume filters.price is [number, number], but check if it's an array before casting
    if (Array.isArray(filters.price)) {
      const [minPrice, maxPrice] = filters.price as [number, number];

      // Proceed with filtering by price range
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
    }

    // Filtering by color
    if (
      filters.color.length > 0 &&
      !filters.color.some((color) => product.color.includes(color))
    ) {
      return false;
    }

    // Filtering by material
    if (
      filters.material.length > 0 &&
      !filters.material.some((material) => product.material.includes(material))
    ) {
      return false;
    }

    // Filtering by sub category
    if (
      filters.subCategory.length > 0 &&
      !filters.subCategory.includes(product.subCategory)
    ) {
      return false;
    }

    // Filtering by furniture category
    if (
      filters.furnitureCategory.length > 0 &&
      !filters.furnitureCategory.includes(product.furnitureCategory)
    ) {
      return false;
    }

    // Filtering by room category
    if (
      filters.roomCategory.length > 0 &&
      !filters.roomCategory.includes(product.roomCategory)
    ) {
      return false;
    }

    return true;
  });
};
