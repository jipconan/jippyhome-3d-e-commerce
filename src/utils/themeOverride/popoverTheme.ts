import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // Define the part you're going to style
  content: {
    py: 50,
    px: 200,
    margin: 0,
    gap: 0,
    border: "none",
    boxShadow: "lg",
  },
  body: {
    padding: 0,
    margin: 0,
    gap: 0,
  },
  footer: {
    padding: 0,
    margin: 0,
    gap: 0,
  },
  popper: {
    padding: 0,
    margin: 0,
    gap: 0,
  },
  arrow: {
    padding: 0,
    margin: 0,
    gap: 0,
  },
});

export const popoverTheme = defineMultiStyleConfig({ baseStyle });
