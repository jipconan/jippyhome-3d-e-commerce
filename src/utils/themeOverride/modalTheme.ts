import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  closeButton: {
    bg: "red.500",
    color: "white",
    _hover: {
      bg: "red.800",
      color: "red.100",
    },
    _focus: {
      boxShadow: "none",
    },
    marginTop: 2,
    marginRight: 2,
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
