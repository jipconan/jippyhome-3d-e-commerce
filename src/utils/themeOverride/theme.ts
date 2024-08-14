import { extendTheme } from "@chakra-ui/react";
import { popoverTheme } from "./popoverTheme";

export const theme = extendTheme({
  fonts: {
    heading: "DM Sans, sans-serif",
    body: "DM Sans, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        overflowY: "scroll",
        overflowX: "hidden",
      },
    },
  },
  components: {
    Popover: popoverTheme,
  },
});
