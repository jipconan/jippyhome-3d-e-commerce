import React from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { SiSuperuser } from "react-icons/si";
import { SlUser } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { GrUserNew } from "react-icons/gr";
import { Link } from "react-router-dom";
import { UserProps } from "../../types/propsTypes";
import { logoutUser } from "../../service/users";

const UserNav: React.FC<UserProps> = ({ user, admin }) => {
  // Handles user logout and reloads the page
  async function handleLogout() {
    await logoutUser();
    window.location.reload();
  }

  return (
    <Flex align="center" mr={4} gap={4}>
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
                size="lg"
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
              size="lg"
              fontSize="2xl"
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
                size="lg"
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
                size="md"
              />
              <Text ml={2}>Signup</Text>
            </Flex>
          </Link>
        </>
      )}

      {/* Link to the shopping cart */}
      <Flex align="center" className="snipcart-checkout" cursor="pointer">
        <IconButton
          aria-label="Cart"
          variant="ghost"
          colorScheme="white"
          icon={<PiShoppingCartSimple />}
          size="lg"
          fontSize="2xl"
        />
        <Text ml={2}>Cart</Text>
      </Flex>
    </Flex>
  );
};

export default UserNav;
