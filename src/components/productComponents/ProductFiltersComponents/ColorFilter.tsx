import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
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
    <Box mb={4}>
      <Text fontWeight="bold" my={4}>
        Color
      </Text>
      <SimpleGrid columns={5} spacing={4}>
        {colors.map((color, index) => (
          <Box
            key={index}
            position="relative"
            w="30px"
            h="30px"
            bg={color}
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
    </Box>
  );
};

export default ColorFilter;
