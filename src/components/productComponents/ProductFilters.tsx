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
    <Box
      overflow="auto"
      maxH="80vh"
      w={{ base: "auto", md: "30vw", lg: "15vw" }}
      px={4}
    >
      <Box mt={4} mb={12}>
        <Text fontWeight="bold" mb={4}>
          Price
        </Text>
        <Stack px={4}>
          <Comps.PriceFilter
            selectedFilters={selectedFilters}
            onChange={(value) => handleFilterChange("price", value)}
          />
        </Stack>
      </Box>

      <Box mt={4} mb={12}>
        <Text fontWeight="bold" mb={4}>
          Color
        </Text>
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
      </Box>

      <Box mt={4} mb={12}>
        <Text fontWeight="bold" mb={4}>
          Material
        </Text>
        <Comps.MaterialFilter
          materials={materials}
          selectedFilters={selectedFilters}
          onChange={(material, checked) =>
            handleFilterChange("material", material, checked)
          }
        />
      </Box>

      <Box mt={4} mb={12}>
        <Text fontWeight="bold" mb={4}>
          Room Categories
        </Text>
        <Comps.FurnitureCategoryFilter
          categories={roomCategories}
          selectedFilters={selectedFilters}
          onChange={(id, checked) =>
            handleFilterChange("roomCategory", id, checked)
          }
          categoryType="roomCategory"
        />
      </Box>

      <Box mt={4} mb={12}>
        <Text fontWeight="bold" mb={4}>
          Furniture Categories
        </Text>
        <Comps.FurnitureCategoryFilter
          categories={furnitureCategories}
          selectedFilters={selectedFilters}
          onChange={(id, checked) =>
            handleFilterChange("furnitureCategory", id, checked)
          }
          categoryType="furnitureCategory"
        />
      </Box>

      <Box mt={4} mb={12}>
        <Text fontWeight="bold" mb={4}>
          Sub Categories
        </Text>
        <Comps.FurnitureCategoryFilter
          categories={subCategories}
          selectedFilters={selectedFilters}
          onChange={(id, checked) =>
            handleFilterChange("subCategory", id, checked)
          }
          categoryType="subCategory"
        />
      </Box>
    </Box>
  );
};

export default ProductFilters;
