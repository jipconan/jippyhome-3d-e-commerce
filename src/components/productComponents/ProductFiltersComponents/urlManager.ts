import { FilterValues } from "../../../types/propsTypes";
import { NavigateFunction } from "react-router-dom";

export const parseURLFilters = (params: URLSearchParams): FilterValues => {
  const filters: FilterValues = {
    price: [0, 1000],
    color: [],
    material: [],
    subCategory: [],
    furnitureCategory: [],
    roomCategory: [],
  };

  const price = params.get("price");
  if (price) {
    const [minPrice, maxPrice] = price.split(",").map(Number);
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filters.price = [minPrice, maxPrice];
    }
  }

  params.forEach((key) => {
    if (key !== "price") {
      // Only use getAll for keys other than price
      filters[key as keyof Omit<FilterValues, "price">] = params.getAll(key);
    }
  });

  return filters;
};

export const updateURL = (
  filters: FilterValues,
  navigate: NavigateFunction
) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (key === "price") {
      const defaultPriceRange = [0, 1000];
      if (
        Array.isArray(value) &&
        (value[0] !== defaultPriceRange[0] || value[1] !== defaultPriceRange[1])
      ) {
        params.set(key, `${value[0]},${value[1]}`);
      }
    } else if (Array.isArray(value) && value.length > 0) {
      value.forEach((val) => params.append(key, String(val)));
    }
  }

  navigate({ search: params.toString() });
};
