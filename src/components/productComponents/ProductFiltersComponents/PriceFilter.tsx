import React from "react";
import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
} from "@chakra-ui/react";
import { FilterValues } from "../../../types/propsTypes";

type PriceFilterProps = {
  selectedFilters: FilterValues;
  onChange: (value: [number, number]) => void;
};

const PriceFilter: React.FC<PriceFilterProps> = ({
  selectedFilters,
  onChange,
}) => {
  return (
    <Box mb={4}>
      <Text fontWeight="bold">Price</Text>
      <RangeSlider
        aria-label={["min", "max"]}
        min={0}
        max={1000}
        step={10}
        defaultValue={selectedFilters.price}
        onChangeEnd={(value) => onChange(value as [number, number])}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <Text>
        Price Range: ${selectedFilters.price[0]} - ${selectedFilters.price[1]}
      </Text>
    </Box>
  );
};

export default PriceFilter;
