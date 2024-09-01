import React from "react";
import { Checkbox, Stack } from "@chakra-ui/react";
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
    <>
      <Stack>
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
    </>
  );
};

export default MaterialFilter;
