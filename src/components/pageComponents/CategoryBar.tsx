import React, { useState } from "react";
import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Box,
  Text,
  Image,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { categoriesContents } from "../../constants/categoriesContents";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CategoryPopOver, Subcategory } from "../../types/categoryTypes";
import { MapSubcategories } from "../../utils/CategoryMapper";
import { Link } from "react-router-dom";

const CategoryBar: React.FC = () => {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const offsetValue = useBreakpointValue({
    md: [0, 20],
    lg: [0, 0],
  }) || [0, 0];

  // Handle mouse enter event to show popover
  const handleMouseEnter = (categoryId: string | null) => {
    setOpenPopover(categoryId);
  };

  // Handle mouse leave event to hide popover
  const handleMouseLeave = () => {
    setOpenPopover(null);
  };

  return (
    <Flex as="nav" align="center" justify="center" bg="gray.700" color="white">
      {/* Main container for category items */}
      <Flex
        align="center"
        maxW={{ md: "90vw", lg: "70vw" }}
        w="full"
        position="relative"
      >
        {/* Link to "All" category page */}
        <Box mr={4}>
          <Link to={`/store`}>
            <Button
              variant="unstyled"
              w={{ md: "8vw", lg: "7vw" }}
              h={{ base: "10vh", md: "12vh", lg: "4vh" }}
              color="white"
              borderBottom="solid 3px transparent"
              borderRadius="0"
              _hover={{ borderBottom: "solid white 3px" }}
              display="flex"
              alignItems="center"
              onMouseEnter={() => handleMouseEnter(null)}
            >
              <Text fontSize="sm">All</Text>
            </Button>
          </Link>
        </Box>

        {/* Container to hold categories */}
        <Flex align="center" justify="space-between" gap={{ md: 8, lg: 4 }}>
          {categoriesContents.map((category: CategoryPopOver) => (
            <Popover
              key={category._id}
              placement="bottom-start"
              isLazy
              isOpen={openPopover === category._id}
              onClose={handleMouseLeave}
              offset={offsetValue as [number, number]}
            >
              {/* Trigger element for the popover */}
              <PopoverTrigger>
                <Box
                  flex="1"
                  data-category-id={category._id}
                  onMouseEnter={() => handleMouseEnter(category._id)}
                >
                  <Link
                    to={
                      category.name.toLowerCase() === "spaces"
                        ? "/store"
                        : `/store/${category.name.toLowerCase()}`
                    }
                  >
                    <Button
                      variant="unstyled"
                      w={{ md: "8vw", lg: "8vw" }}
                      h={{ base: "10vh", md: "12vh", lg: "4vh" }}
                      color="white"
                      borderBottom="solid 3px transparent"
                      borderRadius="0"
                      _hover={{ borderBottom: "solid white 3px" }}
                      display="flex"
                      alignItems="center"
                    >
                      <Flex align="center">
                        <Text fontSize="sm">{category.name}</Text>
                        <MdOutlineKeyboardArrowDown />
                      </Flex>
                    </Button>
                  </Link>
                </Box>
              </PopoverTrigger>

              {/* Popover content displayed when hovering over the category */}
              <PopoverContent
                bg="white"
                color="gray.500"
                borderColor="gray.500"
                width="100vw"
                borderRadius="0"
                left="0"
                onMouseEnter={() => handleMouseEnter(category._id)}
                onMouseLeave={handleMouseLeave}
              >
                <Flex justifyContent="center" gap={12} align="start">
                  <PopoverBody
                    display="flex"
                    flexDirection="column"
                    textAlign="start"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    minW="10vw"
                  >
                    {/* Map and display subcategories */}
                    {MapSubcategories(
                      category.subcategories as Subcategory[],
                      category.name
                    )}
                  </PopoverBody>

                  {/* Content on the right side */}
                  <Flex justifyContent="center" alignItems="center">
                    <Box p={4} mx={12}>
                      <SimpleGrid
                        columns={3}
                        spacing={12}
                        justifyContent="center"
                        alignItems="center"
                      >
                        {category.images?.map((image, index) => (
                          <Box key={index} justifyContent="center">
                            <Image
                              src={image}
                              alt={`Category image ${index}`}
                              boxSize="300px"
                              objectFit="cover"
                            />
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  </Flex>
                </Flex>
              </PopoverContent>
            </Popover>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CategoryBar;
