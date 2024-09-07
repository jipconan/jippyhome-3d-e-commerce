import React from "react";
import { Box, VStack, Flex, useBreakpointValue } from "@chakra-ui/react";
import * as Comps from "../components";
import { contactPageContent } from "../constants/textContents";
import { contentMapper } from "../utils/ContentMapper";

const ContactPage: React.FC = () => {
  // Responsive widths
  const contentWidth = useBreakpointValue({ base: "100%", md: "50vw" });

  return (
    <Flex
      justify="center"
      maxWidth="100vw"
      w="100%"
      p={4}
      direction={{ base: "column", md: "row" }}
      align="center"
    >
      <VStack spacing={8} align="center">
        <Box w={contentWidth} textAlign={{ base: "center", md: "left" }}>
          <VStack
            spacing={2}
            align="center"
            textAlign={{ base: "center", md: "left" }}
          >
            {/* Mapping over the contactPageContent */}
            {contactPageContent.map((content, index) => (
              <Box key={index} w="full">
                {contentMapper(content)}
              </Box>
            ))}
          </VStack>
        </Box>
        <Box w={contentWidth}>
          {/* Render the ticket form component */}
          <Comps.TicketForm />
        </Box>
      </VStack>
    </Flex>
  );
};

export default ContactPage;
