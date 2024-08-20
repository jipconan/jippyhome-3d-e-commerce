import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { getUserDetails, logoutUser } from "../service/users";
import { getColumnTemplate } from "../utils/mathUtil";
import * as Comps from "./AccountPageComponents";
import { UserDetailsProps } from "../types/autheticationTypes";

const AccountPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("account-info");
  const [userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);

  const fetchUserDetails = async () => {
    try {
      const details = await getUserDetails();
      setUserDetails(details);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Provide a fallback value for userName
  const userName = (userDetails?.firstName ?? "Guest").toUpperCase();

  // Set gridHeight and number of buttons.
  const gridHeight = "50vh";
  const numberOfButtons = 5;

  // Calculate button height based on the grid height and number of buttons
  const buttonHeight = `calc(${gridHeight} / ${numberOfButtons})`;

  const renderContent = () => {
    switch (selectedOption) {
      case "account-info":
        return <Comps.AccountInformation userDetails={userDetails} />;
      case "orders":
        return <div>Your Orders</div>;
      case "wishlist":
        return <div>Your Wishlist (Coming Soon!)</div>;
      case "change-password":
        return <div>Change Password</div>;
      case "logout":
        return (
          <Box p={4}>
            <Text mb={4}>Are you sure you want to log out?</Text>
            <Button
              colorScheme="red"
              size="lg"
              onClick={handleLogout}
              cursor="pointer"
            >
              Logout
            </Button>
          </Box>
        );
      default:
        return <div>Welcome to your account page</div>;
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.reload();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box p={4} my={4}>
        <Heading as="h2" size="lg">
          HELLO {userName}!
        </Heading>
      </Box>

      {/* Main Content */}
      <Flex>
        {/* Left Side - Navigation */}
        <Flex direction="column" w="20%" h="80vh" border="1px solid lightgrey">
          <Grid
            templateRows={getColumnTemplate(numberOfButtons)}
            gap={0}
            h={gridHeight}
          >
            <Button
              variant="ghost"
              justifyContent="flex-start"
              borderBottom="1px solid lightgrey"
              borderRadius="0"
              height={buttonHeight}
              color={selectedOption === "account-info" ? "black" : "gray.500"}
              fontWeight={selectedOption === "account-info" ? "bold" : "normal"}
              _hover={{ bg: "gray.100" }}
              onClick={() => setSelectedOption("account-info")}
            >
              ACCOUNT INFORMATION
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              borderBottom="1px solid lightgrey"
              borderRadius="0"
              height={buttonHeight}
              color={selectedOption === "orders" ? "black" : "gray.500"}
              fontWeight={selectedOption === "orders" ? "bold" : "normal"}
              _hover={{ bg: "gray.100" }}
              onClick={() => setSelectedOption("orders")}
            >
              MY ORDERS
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              borderBottom="1px solid lightgrey"
              borderRadius="0"
              height={buttonHeight}
              color={selectedOption === "wishlist" ? "black" : "gray.500"}
              fontWeight={selectedOption === "wishlist" ? "bold" : "normal"}
              _hover={{ bg: "gray.100" }}
              onClick={() => setSelectedOption("wishlist")}
            >
              MY WISHLIST
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              borderBottom="1px solid lightgrey"
              borderRadius="0"
              height={buttonHeight}
              color={
                selectedOption === "change-password" ? "black" : "gray.500"
              }
              fontWeight={
                selectedOption === "change-password" ? "bold" : "normal"
              }
              _hover={{ bg: "gray.100" }}
              onClick={() => setSelectedOption("change-password")}
            >
              CHANGE PASSWORD
            </Button>
            <Button
              variant="ghost"
              justifyContent="flex-start"
              borderRadius="0"
              height={buttonHeight}
              color={selectedOption === "logout" ? "black" : "gray.500"}
              fontWeight={selectedOption === "logout" ? "bold" : "normal"}
              _hover={{ bg: "gray.100" }}
              onClick={() => setSelectedOption("logout")}
            >
              LOG OUT
            </Button>
          </Grid>

          {/* Empty box below the buttons */}
          <Box flex="1" borderTop="1px solid lightgrey" />
        </Flex>

        {/* Right Side - Main Content */}
        <Box
          w="80%"
          p={4}
          borderTop="1px solid lightgrey"
          borderBottom="1px solid lightgrey"
          borderRight="1px solid lightgrey"
        >
          {renderContent()}
        </Box>
      </Flex>
    </Box>
  );
};

export default AccountPage;
