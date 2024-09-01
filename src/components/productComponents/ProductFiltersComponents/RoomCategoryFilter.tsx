import React from "react";
import { Checkbox, Stack, Box, Text } from "@chakra-ui/react";
import { FilterValues } from "../../../types/propsTypes";
import { capitalizeWords } from "../../../utils/formatUtils";

type RoomCategoryFilterProps = {
  roomCategories: { [id: string]: string };
  selectedFilters: FilterValues;
  onChange: (id: string, checked: boolean) => void;
};

const RoomCategoryFilter: React.FC<RoomCategoryFilterProps> = ({
  roomCategories,
  selectedFilters,
  onChange,
}) => {
  return (
    <Box mb={4}>
      <Text fontWeight="bold">Spaces</Text>
      <Stack spacing={1}>
        {Object.entries(roomCategories).map(([id, name]) => (
          <Checkbox
            key={id}
            isChecked={selectedFilters.roomCategory.includes(id)}
            onChange={(e) => onChange(id, e.target.checked)}
          >
            {capitalizeWords(name)}
          </Checkbox>
        ))}
      </Stack>
    </Box>
  );
};

export default RoomCategoryFilter;
