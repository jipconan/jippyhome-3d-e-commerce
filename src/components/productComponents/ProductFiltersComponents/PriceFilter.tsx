import React from "react";
import {
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
  const [minPrice, maxPrice] = selectedFilters.price as [number, number];

  return (
    <>
      <RangeSlider
        aria-label={["min", "max"]}
        min={0}
        max={1000}
        step={10}
        defaultValue={[minPrice, maxPrice]}
        onChangeEnd={(value) => onChange(value as [number, number])}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb
          index={0}
          border="2px solid lightgrey"
          borderRadius="full"
          boxSize="24px"
        />
        <RangeSliderThumb
          index={1}
          border="2px solid lightgrey"
          borderRadius="full"
          boxSize="24px"
        />
      </RangeSlider>
      <Text align="center">
        ${selectedFilters.price[0]} - ${selectedFilters.price[1]}
      </Text>
    </>
  );
};

export default PriceFilter;
