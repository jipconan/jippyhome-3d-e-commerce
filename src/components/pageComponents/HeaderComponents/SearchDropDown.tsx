import { forwardRef } from "react";
import {
  Box,
  List,
  ListItem,
  Text,
  Heading,
  Flex,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Product, Category } from "../../../types/dataTypes";
import { Link } from "react-router-dom";

type SearchDropDownProps = {
  products: Product[];
  categories: Category[];
  onClose: () => void;
};

const SearchDropDown = forwardRef<HTMLDivElement, SearchDropDownProps>(
  ({ products, categories, onClose }, ref) => {
    if (products.length === 0 && categories.length === 0) return null;

    const handleClick = () => {
      onClose();
    };

    return (
      <Box
        ref={ref}
        position="absolute"
        bg="white"
        color="black"
        mt={2}
        p={8}
        width={{ base: "90vw", md: "60vw", lg: "30vw" }}
        zIndex={20}
        boxShadow="md"
      >
        <Flex direction="column" gap={8}>
          {/* Products Section */}
          {products.length > 0 && (
            <Box>
              <Heading as="h4" size="sm" mb={2}>
                Products
              </Heading>
              <Divider borderColor="gray.300" my={2} />
              <List spacing={2} maxHeight="300px" overflowY="auto">
                {products.map((product) => (
                  <ListItem key={product._id}>
                    <ChakraLink
                      as={Link}
                      to={`/store/product/${product._id}`}
                      onClick={handleClick}
                      _hover={{ bg: "gray.300" }}
                      display="block"
                      p={2}
                    >
                      <Flex align="center" gap={2}>
                        <Box boxSize="75px" bg="gray.200" overflow="hidden">
                          <img
                            src={product.imageUrl[0]}
                            alt={product.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Text fontSize="sm">{product.name}</Text>
                      </Flex>
                    </ChakraLink>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Categories Section */}
          {categories.length > 0 && (
            <Box>
              <Heading as="h4" size="sm" mb={2}>
                Categories
              </Heading>
              <Divider borderColor="gray.300" my={2} />
              <List spacing={2} maxHeight="150px" overflowY="auto">
                {categories.map((category) => (
                  <ListItem key={category._id}>
                    <ChakraLink
                      as={Link}
                      to={`/store/${category.name}`}
                      onClick={handleClick}
                      _hover={{ bg: "gray.300" }}
                      display="block"
                      p={2}
                    >
                      <Text fontSize="sm">{category.name}</Text>
                    </ChakraLink>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Flex>
      </Box>
    );
  }
);

export default SearchDropDown;
