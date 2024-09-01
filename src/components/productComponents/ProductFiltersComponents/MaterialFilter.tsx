import React from "react";
import { Checkbox, Stack, Box, Text } from "@chakra-ui/react";
import { FilterValues } from "../../../types/propsTypes";
import { capitalizeWords } from "../../../utils/formatUtils";

type MaterialFilterProps = {
  materials: string[];
  selectedFilters: FilterValues;
  onChange: (material: string, checked: boolean) => void;
};

const MaterialFilter: React.FC<MaterialFilterProps> = ({
  materials,
  selectedFilters,
  onChange,
}) => {
  return (
    <Box mb={4}>
      <Text fontWeight="bold">Material</Text>
      <Stack spacing={1}>
        {materials.map((material, index) => (
          <Checkbox
            key={index}
            isChecked={selectedFilters.material.includes(material)}
            onChange={(e) => onChange(material, e.target.checked)}
          >
            {capitalizeWords(material)}
          </Checkbox>
        ))}
      </Stack>
    </Box>
  );
};

export default MaterialFilter;
