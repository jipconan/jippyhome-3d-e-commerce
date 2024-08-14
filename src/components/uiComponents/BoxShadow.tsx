import { Box } from "@chakra-ui/react";
import React from "react";

// Accept children as props
const BoxShadow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box border="solid 1px lightgrey" boxShadow="md" borderRadius="4px" p={4}>
      {children}
    </Box>
  );
};

export default BoxShadow;
