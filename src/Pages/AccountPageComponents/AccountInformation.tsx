import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
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
  // Handle case where userDetails might be null
  if (!userDetails) {
    return <LoadingComponent />;
  }

  // Number of rows in the grid
  const numRows = 7;

  return (
    <Box p={6} maxW="50vw" minH="60vh" display="flex" flexDirection="column">
      <Heading as="h3" size="lg" mb={8} textAlign="start">
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
        <Box
          p={4}
          borderBottom="1px solid lightgrey"
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" color="gray.600" flex="1">
            Address Line 1:
          </Text>
          <Text color="gray.800" flex="2">
            {userDetails.addressLine1 || "Not provided"}
          </Text>
        </Box>
        <Box
          p={4}
          borderBottom="1px solid lightgrey"
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" color="gray.600" flex="1">
            Address Line 2:
          </Text>
          <Text color="gray.800" flex="2">
            {userDetails.addressLine2 || "Not provided"}
          </Text>
        </Box>
        <Box
          p={4}
          borderBottom="1px solid lightgrey"
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" color="gray.600" flex="1">
            Postal Code:
          </Text>
          <Text color="gray.800" flex="2">
            {userDetails.postalCode || "Not provided"}
          </Text>
        </Box>
        <Box mt={4} display="flex" alignItems="start">
          <Button
            size="lg"
            w="10vw"
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
