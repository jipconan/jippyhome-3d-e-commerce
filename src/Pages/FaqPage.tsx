import { Stack, Flex, Box } from "@chakra-ui/react";
import * as Comps from "../components";
import { faqPageContent } from "../constants/textContents";
import { contentMapper } from "../utils/ContentMapper";

const FaqPage: React.FC = () => {
  return (
    <Stack py={20}>
      <Flex h="100%" justify="center" align="center">
        <Stack p={4} spacing={6} align="flex-start" maxWidth="50%">
          {/* Mapping over the FAQ content */}
          {faqPageContent.map((content, index) => (
            <Comps.FadingBox key={index}>
              <Box w={"100%"}>{contentMapper(content)}</Box>
            </Comps.FadingBox>
          ))}
        </Stack>
      </Flex>
    </Stack>
  );
};

export default FaqPage;
