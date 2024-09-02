import { Box, VStack, Flex } from "@chakra-ui/react";
import * as Comps from "../components";
import { contactPageContent } from "../constants/textContents";
import { contentMapper } from "../utils/ContentMapper";

const ContactPage: React.FC = () => {
  return (
    <Flex justify="center" maxWidth="100vw" w="75vw">
      <VStack spacing={8} align="center">
        <Box w="50vw">
          <VStack spacing={2}>
            {/* Mapping over the contactPageContent */}
            {contactPageContent.map((content, index) => (
              <Box key={index} w="full" textAlign="left">
                {contentMapper(content)}
              </Box>
            ))}
          </VStack>
        </Box>
        <Box w="50vw">
          {/* Render the ticket form component */}
          <Comps.TicketForm />
        </Box>
      </VStack>
    </Flex>
  );
};

export default ContactPage;
