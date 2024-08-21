import React from "react";
import { Checkbox, Stack, Box, Text } from "@chakra-ui/react";
import { FilterValues } from "../../../types/propsTypes";

type FurnitureCategoryFilterProps = {
  furnitureCategories: { [id: string]: string };
  selectedFilters: FilterValues;
  onChange: (id: string, checked: boolean) => void;
};

const FurnitureCategoryFilter: React.FC<FurnitureCategoryFilterProps> = ({
  furnitureCategories,
  selectedFilters,
  onChange,
}) => {
  return (
    <Box mb={4}>
      <Text fontWeight="bold">Furnitures</Text>
      <Stack spacing={1}>
        {Object.entries(furnitureCategories).map(([id, name]) => (
          <Checkbox
            key={id}
            isChecked={selectedFilters.furnitureCategory.includes(id)}
            onChange={(e) => onChange(id, e.target.checked)}
          >
            {name}
          </Checkbox>
        ))}
      </Stack>
    </Box>
  );
};

export default FurnitureCategoryFilter;
