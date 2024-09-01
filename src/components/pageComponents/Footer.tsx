import React from "react";
import { Text, Stack } from "@chakra-ui/react";
import { footerContent } from "../../constants/textContents";

const Footer: React.FC = () => {
  return (
    <Stack my={4}>
      {/* Footer text content */}
      <Text textAlign="center" fontSize="1xl">
        {footerContent}
      </Text>
    </Stack>
  );
};

export default Footer;
