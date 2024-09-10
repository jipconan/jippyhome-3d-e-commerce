import React from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { SiSuperuser } from "react-icons/si";
import { SlUser } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { GrUserNew } from "react-icons/gr";
import { Link } from "react-router-dom";
import { UserProps } from "../../../types/propsTypes";
import { logoutUser } from "../../../service/users";

const MenuUserNav: React.FC<UserProps> = ({ user, admin }) => {
  // Handles user logout and reloads the page
  async function handleLogout() {
    await logoutUser();
    window.location.reload();
  }

  return (
    <Flex align="start" gap={4} direction="column">
      {/* Merchant button */}
      {admin && (
        <Link to="/merchant">
          <Flex align="center" cursor="pointer">
            <IconButton
              aria-label="Merchant"
              variant="ghost"
              colorScheme="white"
              icon={<SiSuperuser />}
              fontSize="lg"
              pr={{ base: 4, md: 4, lg: 0 }}
            />
            <Text ml={2}>Merchant</Text>
          </Flex>
        </Link>
      )}
      {/* Render account and logout options if user is logged in */}
      {user ? (
        <>
          {/* Link to account page */}
          <Link to="/account">
            <Flex align="center">
              <IconButton
                aria-label="Account"
                variant="ghost"
                colorScheme="white"
                icon={<SlUser />}
                fontSize="lg"
                pr={{ base: 4, md: 4, lg: 0 }}
              />
              <Text ml={2}>Account</Text>
            </Flex>
          </Link>

          {/* Logout button */}
          <Flex align="center" onClick={handleLogout} cursor="pointer">
            <IconButton
              aria-label="Logout"
              variant="ghost"
              colorScheme="white"
              icon={<CiLogout />}
              fontSize="lg"
              pr={{ base: 4, md: 4, lg: 0 }}
            />
            <Text ml={2}>Logout</Text>
          </Flex>
        </>
      ) : (
        <>
          {/* Link to sign-in page */}
          <Link to="/signin">
            <Flex align="center">
              <IconButton
                aria-label="Login"
                variant="ghost"
                colorScheme="white"
                icon={<SlUser />}
                fontSize="lg"
                pr={{ base: 4, md: 4, lg: 0 }}
              />
              <Text ml={2}>Login</Text>
            </Flex>
          </Link>

          {/* Link to sign-up page */}
          <Link to="/signup">
            <Flex align="center">
              <IconButton
                aria-label="Signup"
                variant="ghost"
                colorScheme="white"
                icon={<GrUserNew />}
                fontSize="lg"
                pr={{ base: 4, md: 4, lg: 0 }}
              />
              <Text ml={2}>Signup</Text>
            </Flex>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default MenuUserNav;
