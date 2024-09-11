import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { FilterValues } from "../../../types/propsTypes";

type ColorFilterProps = {
  colors: string[];
  selectedFilters: FilterValues;
  onChange: (color: string) => void;
};

const ColorFilter: React.FC<ColorFilterProps> = ({
  colors,
  selectedFilters,
  onChange,
}) => {
  return (
    <>
      <SimpleGrid columns={5} spacing={3}>
        {colors.map((color, index) => (
          <Box
            key={index}
            position="relative"
            w="30px"
            h="30px"
            bg={`linear-gradient(to bottom right, ${color}, rgba(0, 0, 0, 0.75))`}
            borderRadius="full"
            cursor="pointer"
            onClick={() => onChange(color)}
            border={"1px solid lightgrey"}
            _before={
              selectedFilters.color.includes(color)
                ? {
                    content: '""',
                    position: "absolute",
                    top: "-3px",
                    left: "-3px",
                    right: "-3px",
                    bottom: "-3px",
                    borderRadius: "full",
                    border: "2px solid white",
                    zIndex: 1,
                  }
                : undefined
            }
            _after={
              selectedFilters.color.includes(color)
                ? {
                    content: '""',
                    position: "absolute",
                    top: "-6px",
                    left: "-6px",
                    right: "-6px",
                    bottom: "-6px",
                    borderRadius: "full",
                    border: "1px solid gray",
                    zIndex: 0,
                  }
                : undefined
            }
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ColorFilter;
