import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { UserDetailsProps } from "../../types/autheticationTypes";
import { getRowTemplate } from "../../utils/mathUtil";
import { useLoading } from "../../utils/PageUtils";

type AccountInformationProps = {
  userDetails: UserDetailsProps | null;
};

const AccountInformation: React.FC<AccountInformationProps> = ({
  userDetails,
}) => {
  const { LoadingComponent } = useLoading();

  // Number of rows in the grid
  const numRows = 4;

  // Responsive values
  const boxPadding = useBreakpointValue({ base: 4, md: 6 });
  const buttonWidth = useBreakpointValue({ base: "full", md: "10vw" });

  // Handle case where userDetails might be null
  if (!userDetails) {
    return <LoadingComponent />;
  }

  return (
    <Box
      p={boxPadding}
      maxW={{ base: "100%", md: "50vw" }}
      minH={{ base: "auto", md: "60vh" }}
      display="flex"
      flexDirection="column"
    >
      <Heading
        as="h3"
        size="lg"
        mb={8}
        textAlign={{ base: "center", md: "start" }}
      >
        Account Information
      </Heading>
      <Box
        flex="1"
        display="grid"
        gridTemplateRows={getRowTemplate(numRows)}
        gap={4}
      >
        <Box
          borderBottom="1px solid lightgrey"
          p={4}
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" color="gray.600" flex="1">
            Email:
          </Text>
          <Text color="gray.800" flex="2">
            {userDetails.email}
          </Text>
        </Box>
        <Box
          borderBottom="1px solid lightgrey"
          p={4}
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" color="gray.600" flex="1">
            First Name:
          </Text>
          <Text color="gray.800" flex="2">
            {userDetails.firstName}
          </Text>
        </Box>
        <Box
          borderBottom="1px solid lightgrey"
          p={4}
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" color="gray.600" flex="1">
            Last Name:
          </Text>
          <Text color="gray.800" flex="2">
            {userDetails.lastName}
          </Text>
        </Box>
        <Box mt={4} display="flex" justifyContent="Start" alignItems="start">
          <Button
            size="lg"
            w={buttonWidth}
            bg="gray.500"
            color="gray.100"
            borderRadius="0"
            _hover={{ bg: "gray.700", color: "gray.300" }}
          >
            EDIT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountInformation;
