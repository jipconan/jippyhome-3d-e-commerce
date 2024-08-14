import { Box, VStack, Flex } from "@chakra-ui/react";
import * as Comps from "../components";
import { contactPageContent } from "../constants/textContents";
import { contentMapper } from "../utils/ContentMapper";

const ContactPage: React.FC = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      maxWidth="100vw"
      w="80vw"
      minH="100vh" // Ensures the content takes up the full viewport height
      mx="auto" // Centers horizontally
    >
      <VStack spacing={8} align="center">
        <Box w="50vw" py={12}>
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
