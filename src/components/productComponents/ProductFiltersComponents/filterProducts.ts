import { Product } from "../../../types/dataTypes";
import { FilterValues } from "../../../types/propsTypes";

export const filterProducts = (products: Product[], filters: FilterValues) => {
  return products.filter((product) => {
    if (product.price < filters.price[0] || product.price > filters.price[1]) {
      return false;
    }

    if (
      filters.color.length > 0 &&
      !filters.color.some((color) => product.color.includes(color))
    ) {
      return false;
    }

    if (
      filters.material.length > 0 &&
      !filters.material.some((material) => product.material.includes(material))
    ) {
      return false;
    }

    if (
      filters.furnitureCategory.length > 0 &&
      !filters.furnitureCategory.includes(product.furnitureCategory)
    ) {
      return false;
    }

    if (
      filters.roomCategory.length > 0 &&
      !filters.roomCategory.includes(product.roomCategory)
    ) {
      return false;
    }

    return true;
  });
};
