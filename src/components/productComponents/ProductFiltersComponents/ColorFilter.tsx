// src/components/ProductFiltersComponents/ColorFilter.tsx

import React from "react";
import { Box, Checkbox, SimpleGrid, Text } from "@chakra-ui/react";
import { FilterValues } from "../../../types/propsTypes";

type ColorFilterProps = {
  colors: string[];
  selectedFilters: FilterValues;
  onChange: (color: string, checked: boolean) => void;
};

const ColorFilter: React.FC<ColorFilterProps> = ({
  colors,
  selectedFilters,
  onChange,
}) => {
  return (
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
              onChange={(e) => onChange(color, e.target.checked)}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ColorFilter;
