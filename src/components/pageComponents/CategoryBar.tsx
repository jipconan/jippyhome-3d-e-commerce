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
} from "@chakra-ui/react";
import { categoriesContents } from "../../constants/categoriesContents";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CategoryPopOver, Subcategory } from "../../types/categoryTypes";
import { MapSubcategories } from "../../utils/CategoryMapper";
import { Link } from "react-router-dom";

const CategoryBar: React.FC = () => {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  // Handle mouse enter event to show popover
  const handleMouseEnter = (categoryId: string) => {
    setOpenPopover(categoryId);
  };

  // Handle mouse leave event to hide popover
  const handleMouseLeave = () => {
    setOpenPopover(null);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      bg="gray.700"
      color="white"
      w="100%"
      h="100%"
    >
      {/* Main container for category items */}
      <Flex align="center" maxW="75vw" w="100%">
        {/* Link to category page */}
        <Box w="4vw">
          <Link to={`/store`}>
            <Button
              variant="unstyled"
              w="100%"
              h="5vh"
              color="white"
              borderBottom="solid 3px transparent"
              borderRadius="0"
              _hover={{ borderBottom: "solid white 3px" }}
              display="flex"
              alignItems="center"
            >
              <Text fontSize="sm">All</Text>
            </Button>
          </Link>
        </Box>
        {/* Container to hold categories */}
        <Flex align="center" justify="space-between" maxW="40vw" w="100%">
          {categoriesContents.map((category: CategoryPopOver) => (
            <Popover
              key={category._id}
              placement="bottom-start"
              isLazy
              isOpen={openPopover === category._id}
              onClose={handleMouseLeave}
              offset={[0, 0]}
            >
              {/* Trigger element for the popover */}
              <PopoverTrigger>
                <Box
                  flex="1"
                  maxW="200px"
                  data-category-id={category._id}
                  onMouseEnter={() => handleMouseEnter(category._id)}
                >
                  {/* Link to category page */}
                  <Link to={`/store/${category.name}`}>
                    <Button
                      variant="unstyled"
                      w="100%"
                      h="5vh"
                      color="white"
                      borderBottom="solid 3px transparent"
                      borderRadius="0"
                      _hover={{ borderBottom: "solid white 3px" }}
                      display="flex"
                      alignItems="center"
                    >
                      <Text fontSize="sm">{category.name}</Text>
                      <MdOutlineKeyboardArrowDown />
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
                display="flex"
                onMouseEnter={() => handleMouseEnter(category._id)}
                onMouseLeave={handleMouseLeave}
              >
                <Flex gap={12}>
                  <PopoverBody
                    display="flex"
                    flexDirection="column"
                    textAlign="start"
                    minW="300px"
                  >
                    {/* Map and display subcategories */}
                    {MapSubcategories(
                      category.subcategories as Subcategory[],
                      category.name
                    )}
                  </PopoverBody>

                  {/* Content on the right side */}
                  <Flex>
                    <Box p={4} mx={12} minW="300px">
                      <SimpleGrid columns={3} spacing={12}>
                        {category.images?.map((image, index) => (
                          <Box key={index}>
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
