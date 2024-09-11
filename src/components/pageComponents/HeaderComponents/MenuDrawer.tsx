import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Flex,
  Text,
  Box,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserMenuProps } from "../../../types/propsTypes";
import { categoriesContents } from "../../../constants/categoriesContents";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CategoryPopOver, Subcategory } from "../../../types/categoryTypes";
import { MapSubcategories } from "../../../utils/CategoryMapper";
import { PiShoppingCartSimple } from "react-icons/pi";
import SearchBar from "./SearchBar";
import MenuUserNav from "./MenuUserNav";

const MenuDrawer: React.FC<UserMenuProps> = ({
  user,
  admin,
  products,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryPopOver | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle category click to toggle the drawer content
  const handleCategoryClick = (category: CategoryPopOver) => {
    if (selectedCategory?._id === category._id) {
      // Close the category if it's already selected
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // Handle link click to close the drawer
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <Flex align="center" direction="column" w="98vw">
        <Flex align="center" justify="space-between" direction="row" w="100%">
          <Button
            colorScheme="teal"
            variant="unstyle"
            onClick={onOpen}
            aria-label="Menu"
            fontSize="xl"
          >
            <GiHamburgerMenu />
          </Button>

          {/* Shopping cart */}
          <Flex
            align="center"
            className="snipcart-checkout"
            cursor="pointer"
            px={4}
          >
            <IconButton
              aria-label="Cart"
              variant="ghost"
              colorScheme="white"
              icon={<PiShoppingCartSimple />}
              size="lg"
              fontSize="2xl"
              pr={{ base: 0, md: 4, lg: 0 }}
            />
            <Text ml={2}>Cart</Text>
          </Flex>
        </Flex>

        <Box my={2}>
          <SearchBar products={products} categories={categories} />
        </Box>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent maxW="80%">
          <DrawerHeader borderBottomWidth="1px" bgColor="gray.700">
            <Flex align="center" justify="space-between" h="5vh">
              <RouterLink to={`/`}>
                <Heading
                  color="gray.100"
                  fontSize="1xl"
                  onClick={handleLinkClick}
                >
                  JippyHome
                </Heading>
              </RouterLink>
              <Button onClick={onClose} variant="unstyle" color="gray.100">
                CLOSE
              </Button>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex mb={8} py={4} borderBottom="1px solid lightgrey">
              <MenuUserNav user={user} admin={admin} />
            </Flex>
            <Flex direction="column" gap={2}>
              <>
                <Box
                  my={2}
                  borderBottom="solid lightgrey 1px"
                  w={{ base: "50vw", md: "25vw" }}
                >
                  <RouterLink to={`/store`}>
                    <Button
                      variant="unstyled"
                      w="full"
                      color="black"
                      border="solid 3px transparent"
                      borderRadius="0"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      onClick={handleLinkClick}
                    >
                      <Text fontSize="lg">All</Text>
                    </Button>
                  </RouterLink>
                </Box>

                {categoriesContents.map((category: CategoryPopOver) => (
                  <Box
                    key={category._id}
                    my={2}
                    borderBottom="solid lightgrey 1px"
                    w={{ base: "50vw", md: "25vw" }}
                  >
                    <Button
                      variant="unstyled"
                      w="full"
                      color="black"
                      border="solid 3px transparent"
                      borderRadius="0"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <Text fontSize="lg">{category.name}</Text>
                      <MdOutlineKeyboardArrowDown />
                    </Button>
                    {/* Display content below the selected category */}
                    {selectedCategory?._id === category._id && (
                      <Flex flexDirection="column" align="start" gap={4}>
                        <Button
                          variant="unstyled"
                          color="black"
                          onClick={handleLinkClick}
                        >
                          <RouterLink
                            to={
                              category.name.toLowerCase() === "spaces"
                                ? "/store"
                                : `/store/${category.name.toLowerCase()}`
                            }
                          >
                            <Text fontSize="sm" fontWeight={400}>
                              All {category.name}
                            </Text>
                          </RouterLink>
                        </Button>
                        {/* Map and display subcategories */}
                        {MapSubcategories(
                          selectedCategory.subcategories as Subcategory[],
                          selectedCategory.name
                        )}
                      </Flex>
                    )}
                  </Box>
                ))}
              </>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
