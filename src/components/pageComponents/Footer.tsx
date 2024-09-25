import React from "react";
import { Text, Flex } from "@chakra-ui/react";
import { footerContent } from "../../constants/textContents";

const Footer: React.FC = () => {
  return (
    <Flex as="footer" w="100%" align="center" justify="center" py={4}>
      {/* Footer text content */}
      <Text textAlign="center" maxW="90vw">
        {footerContent}
      </Text>
    </Flex>
  );
};

export default Footer;
