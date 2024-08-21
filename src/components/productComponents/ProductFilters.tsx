import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Product } from "../../types/dataTypes";
import { FilterValues } from "../../types/propsTypes";
import { getAllCategories } from "../../service/categories";
import { useNavigate, useLocation } from "react-router-dom";
import * as Comps from "./ProductFiltersComponents";

type ProductFiltersProps = {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
};

const ProductFilters: React.FC<ProductFiltersProps> = ({
  products,
  onFilterChange,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [colors, setColors] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
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
    furnitureCategory: [],
    roomCategory: [],
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters = Comps.parseURLFilters(params);
    setSelectedFilters(initialFilters);
  }, [location.search]);

  useEffect(() => {
    const uniqueColors = Array.from(
      new Set(products.flatMap((product) => product.color))
    );
    const uniqueMaterials = Array.from(
      new Set(products.flatMap((product) => product.material))
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
      const furnitureMap: { [id: string]: string } = {};
      const roomMap: { [id: string]: string } = {};

      categories.forEach((category) => {
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

  return (
    <Box p={4}>
      <Comps.PriceFilter
        selectedFilters={selectedFilters}
        onChange={(value) => handleFilterChange("price", value)}
      />
      <Comps.ColorFilter
        colors={colors}
        selectedFilters={selectedFilters}
        onChange={(color, checked) =>
          handleFilterChange("color", color, checked)
        }
      />
      <Comps.MaterialFilter
        materials={materials}
        selectedFilters={selectedFilters}
        onChange={(material, checked) =>
          handleFilterChange("material", material, checked)
        }
      />
      <Comps.FurnitureCategoryFilter
        furnitureCategories={furnitureCategories}
        selectedFilters={selectedFilters}
        onChange={(id, checked) =>
          handleFilterChange("furnitureCategory", id, checked)
        }
      />
      <Comps.RoomCategoryFilter
        roomCategories={roomCategories}
        selectedFilters={selectedFilters}
        onChange={(id, checked) =>
          handleFilterChange("roomCategory", id, checked)
        }
      />
    </Box>
  );
};

export default ProductFilters;
