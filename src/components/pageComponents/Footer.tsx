import React from "react";
import { Text, Box, Stack } from "@chakra-ui/react";
import { footerContent } from "../../constants/textContents";

const Footer: React.FC = () => {
  return (
    <Stack>
      <Box>
        {/* Footer text content */}
        <Text textAlign="center" my={8} fontSize="1xl">
          {footerContent}
        </Text>
      </Box>
    </Stack>
  );
};

export default Footer;
