import { extendTheme } from "@chakra-ui/react";
import { popoverTheme } from "./popoverTheme";
import { modalTheme } from "./modalTheme";

export const theme = extendTheme({
  fonts: {
    body: "DM Sans, sans-serif",
    heading: "DM Sans, sans-serif",
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
    Modal: modalTheme,
  },
});
