import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  BoxProps,
  useBreakpointValue,
  ResponsiveValue,
} from "@chakra-ui/react";
import { getUserDetails, logoutUser } from "../service/users";
import { getColumnTemplate } from "../utils/mathUtil";
import * as Comps from "./AccountPageComponents";
import OrderGrid from "../components/orderComponents/OrderGrid";
import { UserDetailsProps } from "../types/autheticationTypes";
import ContactPage from "./ContactPage";

type AccountPageProps = {
  user: string | null;
};

type ContentWrapperProps = BoxProps;

const AccountPage: React.FC<AccountPageProps> = ({ user }) => {
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

  const BoxWrapper: React.FC<ContentWrapperProps> = ({
    children,
    ...props
  }) => {
    return (
      <Box p={4} minH={{ base: "10vh", md: "80vh" }} {...props}>
        {children}
      </Box>
    );
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const userName = (userDetails?.firstName ?? "Guest").toUpperCase();

  const gridHeight = useBreakpointValue({
    base: "55vh",
    md: "100vh",
    lg: "60vh",
  });
  const buttonHeight = useBreakpointValue({
    base: "auto",
    md: `calc(${gridHeight} / 6)`,
  });

  // Correctly typing useBreakpointValue
  const flexDirection: ResponsiveValue<
    "row" | "column" | "row-reverse" | "column-reverse"
  > = useBreakpointValue({ base: "column", md: "row" }) || "row";

  const leftColumnWidth = useBreakpointValue({
    base: "100%",
    md: "35%",
    lg: "25%",
  });
  const rightColumnWidth = useBreakpointValue({ base: "100%", md: "80%" });

  const isPortrait = useBreakpointValue({ base: true, md: false, lg: false });

  const renderContent = () => {
    switch (selectedOption) {
      case "account-info":
        return (
          <BoxWrapper>
            <Comps.AccountInformation userDetails={userDetails} />
          </BoxWrapper>
        );
      case "orders":
        return (
          <BoxWrapper>
            <OrderGrid user={user} />
          </BoxWrapper>
        );
      case "wishlist":
        return <BoxWrapper>Your Wishlist (Coming Soon!)</BoxWrapper>;
      case "change-password":
        return <BoxWrapper>Change Password (Coming Soon!)</BoxWrapper>;
      case "contact-us":
        return (
          <BoxWrapper>
            <ContactPage />
          </BoxWrapper>
        );
      case "logout":
        return (
          <BoxWrapper>
            <Text mb={4}>Are you sure you want to log out?</Text>
            <Button
              colorScheme="red"
              size="lg"
              onClick={handleLogout}
              cursor="pointer"
            >
              Logout
            </Button>
          </BoxWrapper>
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
      <Box p={4} my={{ base: 0, md: 4 }}>
        <Heading as="h2" size="lg">
          HELLO {userName}!
        </Heading>
      </Box>

      <Flex direction={flexDirection}>
        {/* Left Side - Navigation */}
        <Flex
          direction="column"
          w={leftColumnWidth}
          border="1px solid lightgrey"
        >
          <Grid
            templateRows={getColumnTemplate(6)}
            gap={0}
            h={gridHeight}
            templateColumns="1fr"
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
              borderBottom="1px solid lightgrey"
              borderRadius="0"
              height={buttonHeight}
              color={selectedOption === "contact-us" ? "black" : "gray.500"}
              fontWeight={selectedOption === "contact-us" ? "bold" : "normal"}
              _hover={{ bg: "gray.100" }}
              onClick={() => setSelectedOption("contact-us")}
            >
              CONTACT US
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

          {/* Conditionally render the empty box based on portrait mode */}
          {!isPortrait && <Box flex="1" borderTop="1px solid lightgrey" />}
        </Flex>

        {/* Right Side - Main Content */}
        <Box
          w={rightColumnWidth}
          p={{ base: 0, md: 4 }}
          borderTop={{ base: 0, md: "1px solid lightgrey" }}
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
