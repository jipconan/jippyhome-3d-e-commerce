import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Stack,
  Text,
  SimpleGrid,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { Product } from "../../types/dataTypes";
import { getAllCategories } from "../../service/categories";
import { useNavigate, useLocation } from "react-router-dom";

type ProductFiltersProps = {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
};

const ProductFilters: React.FC<ProductFiltersProps> = ({
  products,
  onFilterChange,
}) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters: { [key: string]: any } = {
      price: [0, 1000],
      color: [],
      material: [],
      furnitureCategory: [],
      roomCategory: [],
    };

    // Parse price filter only if present in the URL
    const price = params.get("price");
    if (price) {
      const [minPrice, maxPrice] = price.split(",").map(Number);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        initialFilters.price = [minPrice, maxPrice];
      }
    }

    // Parse other filters
    params.forEach((value, key) => {
      if (key !== "price") {
        initialFilters[key] = params.getAll(key);
      }
    });

    setSelectedFilters(initialFilters);
  }, [location.search]);

  const navigate = useNavigate();

  const updateURL = (filters: { [key: string]: any }) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (key === "price") {
        // Only add the price filter if it's different from the default
        const defaultPriceRange = [0, 1000];
        if (
          Array.isArray(value) &&
          (value[0] !== defaultPriceRange[0] ||
            value[1] !== defaultPriceRange[1])
        ) {
          params.set(key, `${value[0]},${value[1]}`);
        }
      } else if (value.length > 0) {
        if (Array.isArray(value)) {
          value.forEach((val) => params.append(key, val));
        } else {
          params.set(key, value);
        }
      }
    }

    navigate({ search: params.toString() });
  };

  const [colors, setColors] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [furnitureCategories, setFurnitureCategories] = useState<{
    [id: string]: string;
  }>({});
  const [roomCategories, setRoomCategories] = useState<{
    [id: string]: string;
  }>({});
  const [selectedFilters, setSelectedFilters] = useState<{
    price: [number, number];
    color: string[];
    material: string[];
    furnitureCategory: string[];
    roomCategory: string[];
  }>({
    price: [0, 1000],
    color: [],
    material: [],
    furnitureCategory: [],
    roomCategory: [],
  });

  useEffect(() => {
    // Extract unique values for filters
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

    // Fetch all categories from the service
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
    // Filter products based on selectedFilters
    const filteredProducts = products.filter((product) => {
      // Price filter
      if (
        product.price < selectedFilters.price[0] ||
        product.price > selectedFilters.price[1]
      ) {
        return false;
      }

      // Color filter
      if (
        selectedFilters.color.length > 0 &&
        !selectedFilters.color.some((color) => product.color.includes(color))
      ) {
        return false;
      }

      // Material filter
      if (
        selectedFilters.material.length > 0 &&
        !selectedFilters.material.some((material) =>
          product.material.includes(material)
        )
      ) {
        return false;
      }

      // Furniture Category filter
      if (
        selectedFilters.furnitureCategory.length > 0 &&
        !selectedFilters.furnitureCategory.includes(product.furnitureCategory)
      ) {
        return false;
      }

      // Room Category filter
      if (
        selectedFilters.roomCategory.length > 0 &&
        !selectedFilters.roomCategory.includes(product.roomCategory)
      ) {
        return false;
      }

      return true;
    });

    // Notify parent component of filtered products
    onFilterChange(filteredProducts);
  }, [selectedFilters, products, onFilterChange]);

  const handleFilterChange = (
    filterType: string,
    value: string | [number, number],
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

      // Update the URL with the new filters
      updateURL(updatedFilters);

      return updatedFilters;
    });
  };

  return (
    <Box p={4}>
      {/* Price Filter */}
      <Box mb={4}>
        <Text fontWeight="bold">Price</Text>
        <RangeSlider
          aria-label={["min", "max"]}
          min={0}
          max={1000}
          step={10}
          defaultValue={selectedFilters.price}
          onChangeEnd={(value) => handleFilterChange("price", value)}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Text>
          Price Range: ${selectedFilters.price[0]} - ${selectedFilters.price[1]}
        </Text>
      </Box>

      {/* Color Filter */}
      <Box mb={4}>
        <Text fontWeight="bold">Color</Text>
        <SimpleGrid columns={5} spacing={2}>
          {colors.map((color, index) => (
            <Box
              key={index}
              w="30px"
              h="30px"
              bg={color}
              borderRadius="full"
              border="1px solid #ccc"
            >
              <Checkbox
                isChecked={selectedFilters.color.includes(color)}
                onChange={(e) =>
                  handleFilterChange("color", color, e.target.checked)
                }
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Material Filter */}
      <Box mb={4}>
        <Text fontWeight="bold">Material</Text>
        <Stack spacing={1}>
          {materials.map((material, index) => (
            <Checkbox
              key={index}
              isChecked={selectedFilters.material.includes(material)}
              onChange={(e) =>
                handleFilterChange("material", material, e.target.checked)
              }
            >
              {material}
            </Checkbox>
          ))}
        </Stack>
      </Box>

      {/* Furniture Category Filter */}
      <Box mb={4}>
        <Text fontWeight="bold">Furniture Category</Text>
        <Stack spacing={1}>
          {Object.entries(furnitureCategories).map(([id, name]) => (
            <Checkbox
              key={id}
              isChecked={selectedFilters.furnitureCategory.includes(id)}
              onChange={(e) =>
                handleFilterChange("furnitureCategory", id, e.target.checked)
              }
            >
              {name}
            </Checkbox>
          ))}
        </Stack>
      </Box>

      {/* Room Category Filter */}
      <Box mb={4}>
        <Text fontWeight="bold">Room Category</Text>
        <Stack spacing={1}>
          {Object.entries(roomCategories).map(([id, name]) => (
            <Checkbox
              key={id}
              isChecked={selectedFilters.roomCategory.includes(id)}
              onChange={(e) =>
                handleFilterChange("roomCategory", id, e.target.checked)
              }
            >
              {name}
            </Checkbox>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductFilters;
