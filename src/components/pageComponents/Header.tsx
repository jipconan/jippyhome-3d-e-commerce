import React from "react";
import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Box,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import * as Comps from "../../components";
import { UserProps } from "../../types/propsTypes";

const Header: React.FC<UserProps> = ({ user, admin }) => {
  return (
    <Flex
      as="header"
      align="center"
      justify="center"
      bg="gray.700"
      color="white"
      w="100%"
      py={1}
      borderBottom="solid 1px"
      borderColor="gray.600"
    >
      <Flex align="center" justify="space-between" maxW="75vw" w="100%">
        <Flex align="center">
          {/* Logo */}
          <Link to="/">
            <Flex align="center" ml={4}>
              <Image
                src="/media/jippylogocolored.png"
                alt="Logo"
                boxSize="70px"
              />
            </Flex>
          </Link>

          {/* Search Input */}
          <Box
            position="relative"
            bg="gray.500"
            borderRadius="20px"
            p={1}
            ml={4}
            width="30vw"
          >
            <InputGroup>
              <Input
                placeholder="Search..."
                size="sm"
                variant="outline"
                bg="transparent"
                borderRadius="20px"
                color="gray.100"
                border="none"
                _placeholder={{ color: "gray.300" }}
              />
              <InputRightElement
                display="flex"
                alignItems="center"
                justifyContent="center"
                paddingRight="10px"
                pb={2}
              >
                <Icon as={CiSearch} color="gray.600" w={6} h={6} />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>

        {/* User Navigation */}
        <Comps.UserNav user={user} admin={admin} />
      </Flex>
    </Flex>
  );
};

export default Header;
