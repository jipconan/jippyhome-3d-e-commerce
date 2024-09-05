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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import UserNav from "../UserNav";
import { UserProps } from "../../../types/propsTypes";
import { categoriesContents } from "../../../constants/categoriesContents";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CategoryPopOver, Subcategory } from "../../../types/categoryTypes";
import { MapSubcategories } from "../../../utils/CategoryMapper";

const MenuDrawer: React.FC<UserProps> = ({ user, admin }) => {
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
      <Flex align="center" justify="space-between" maxW="100vw" w="100%">
        <Button
          colorScheme="teal"
          variant="unstyle"
          onClick={onOpen}
          aria-label="Menu"
          fontSize="xl"
        >
          <GiHamburgerMenu />
        </Button>
        <UserNav user={user} admin={admin} />
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" bgColor="gray.700">
            <Flex align="center" justify="space-between">
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
            <Flex flexDirection="column" align="start" gap={2}>
              <>
                <Box my={2} borderBottom="solid lightgrey 1px" w="50vw">
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
                    w="50vw"
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
