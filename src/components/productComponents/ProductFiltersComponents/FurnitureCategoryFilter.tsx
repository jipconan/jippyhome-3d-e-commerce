import React from "react";
import { Checkbox, Stack } from "@chakra-ui/react";
import { FilterValues } from "../../../types/propsTypes";
import { capitalizeWords } from "../../../utils/formatUtils";

type FurnitureCategoryFilterProps = {
  categories: { [id: string]: string };
  selectedFilters: FilterValues;
  onChange: (id: string, checked: boolean) => void;
  categoryType: keyof Omit<FilterValues, "price">;
};

const FurnitureCategoryFilter: React.FC<FurnitureCategoryFilterProps> = ({
  categories,
  selectedFilters,
  onChange,
  categoryType,
}) => {
  return (
    <>
      <Stack>
        {Object.entries(categories).map(([id, name]) => (
          <Checkbox
            key={id}
            isChecked={selectedFilters[categoryType].includes(id)}
            onChange={(e) => onChange(id, e.target.checked)}
          >
            {capitalizeWords(name)}
          </Checkbox>
        ))}
      </Stack>
    </>
  );
};

export default FurnitureCategoryFilter;
