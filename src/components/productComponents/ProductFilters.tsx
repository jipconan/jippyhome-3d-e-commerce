import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { Product } from "../../types/dataTypes";

import * as Comps from "./ProductFiltersComponents";

type ProductFiltersProps = {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
};

const ProductFilters: React.FC<ProductFiltersProps> = ({
  products,
  onFilterChange,
}) => {
  const {
    colors,
    materials,
    subCategories,
    furnitureCategories,
    roomCategories,
    selectedFilters,
    handleFilterChange,
  } = Comps.UseProductFilters(products, onFilterChange);

  return (
    <Box p={4}>
      <Comps.PriceFilter
        selectedFilters={selectedFilters}
        onChange={(value) => handleFilterChange("price", value)}
      />
      <Comps.ColorFilter
        colors={colors}
        selectedFilters={selectedFilters}
        onChange={(color) =>
          handleFilterChange(
            "color",
            color,
            !selectedFilters.color.includes(color)
          )
        }
      />
      <Comps.MaterialFilter
        materials={materials}
        selectedFilters={selectedFilters}
        onChange={(material, checked) =>
          handleFilterChange("material", material, checked)
        }
      />
      <Stack my={4}>
        <Text fontWeight="bold">Sub Categories</Text>
        <Comps.FurnitureCategoryFilter
          categories={subCategories}
          selectedFilters={selectedFilters}
          onChange={(id, checked) =>
            handleFilterChange("subCategory", id, checked)
          }
          categoryType="subCategory"
        />
      </Stack>

      <Stack my={4}>
        <Text fontWeight="bold">Furniture Categories</Text>
        <Comps.FurnitureCategoryFilter
          categories={furnitureCategories}
          selectedFilters={selectedFilters}
          onChange={(id, checked) =>
            handleFilterChange("furnitureCategory", id, checked)
          }
          categoryType="furnitureCategory"
        />
      </Stack>

      <Stack my={4}>
        <Text fontWeight="bold">Room Categories</Text>
        <Comps.FurnitureCategoryFilter
          categories={roomCategories}
          selectedFilters={selectedFilters}
          onChange={(id, checked) =>
            handleFilterChange("roomCategory", id, checked)
          }
          categoryType="roomCategory"
        />
      </Stack>
    </Box>
  );
};

export default ProductFilters;
