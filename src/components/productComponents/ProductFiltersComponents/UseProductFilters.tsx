import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Product } from "../../../types/dataTypes";
import { FilterValues } from "../../../types/propsTypes";
import { getAllCategories } from "../../../service/categories";
import * as Comps from ".";

const useProductFilters = (
  products: Product[],
  onFilterChange: (filteredProducts: Product[]) => void
) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [colors, setColors] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<{ [id: string]: string }>(
    {}
  );
  const [furnitureCategories, setFurnitureCategories] = useState<{
    [id: string]: string;
  }>({});
  const [roomCategories, setRoomCategories] = useState<{
    [id: string]: string;
  }>({});
  const [selectedFilters, setSelectedFilters] = useState<FilterValues>({
    price: [0, 1000],
    color: [],
    material: [],
    subCategory: [],
    furnitureCategory: [],
    roomCategory: [],
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters = Comps.parseURLFilters(params);

    const price = params.get("price");
    if (price) {
      const [minPrice, maxPrice] = price.split(",").map(Number);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        initialFilters.price = [minPrice, maxPrice];
      }
    }

    params.forEach((value, key) => {
      if (key !== "price") {
        const allValues = params.getAll(key);
        initialFilters[key as keyof FilterValues] =
          allValues.length > 1 ? allValues : [value];
      }
    });
    setSelectedFilters(initialFilters);
  }, [location.search]);

  useEffect(() => {
    const uniqueColors = Array.from(
      new Set(products.flatMap((product) => product.color))
    );
    const uniqueMaterials = Array.from(
      new Set(products.flatMap((product) => product.material))
    );

    const subCategoriesIds = Array.from(
      new Set(products.map((product) => product.subCategory))
    );
    const furnitureCategoriesIds = Array.from(
      new Set(products.map((product) => product.furnitureCategory))
    );
    const roomCategoriesIds = Array.from(
      new Set(products.map((product) => product.roomCategory))
    );

    setColors(uniqueColors);
    setMaterials(uniqueMaterials);

    getAllCategories().then((categories) => {
      const subMap: { [id: string]: string } = {};
      const furnitureMap: { [id: string]: string } = {};
      const roomMap: { [id: string]: string } = {};

      categories.forEach((category) => {
        if (category.level === 2 && subCategoriesIds.includes(category._id)) {
          subMap[category._id] = category.name;
        }
        if (
          category.level === 1 &&
          furnitureCategoriesIds.includes(category._id)
        ) {
          furnitureMap[category._id] = category.name;
        }
        if (category.level === 0 && roomCategoriesIds.includes(category._id)) {
          roomMap[category._id] = category.name;
        }
      });

      setSubCategories(subMap);
      setFurnitureCategories(furnitureMap);
      setRoomCategories(roomMap);
    });
  }, [products]);

  useEffect(() => {
    const filteredProducts = Comps.filterProducts(products, selectedFilters);
    onFilterChange(filteredProducts);
  }, [selectedFilters, products, onFilterChange]);

  const handleFilterChange = (
    filterType: keyof FilterValues,
    value: string | [number, number] | string[],
    checked?: boolean
  ) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (filterType === "price") {
        updatedFilters[filterType] = value as [number, number];
      } else if (checked !== undefined) {
        if (checked) {
          updatedFilters[filterType] = [
            ...(prevFilters[filterType] as string[]),
            value as string,
          ];
        } else {
          updatedFilters[filterType] = (
            prevFilters[filterType] as string[]
          ).filter((item) => item !== value);
        }
      } else {
        updatedFilters[filterType] = value as string[];
      }

      Comps.updateURL(updatedFilters, navigate);

      return updatedFilters;
    });
  };

  return {
    colors,
    materials,
    subCategories,
    furnitureCategories,
    roomCategories,
    selectedFilters,
    handleFilterChange,
  };
};

export default useProductFilters;
