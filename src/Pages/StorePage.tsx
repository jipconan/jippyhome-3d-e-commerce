import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Flex,
  Select,
  VStack,
  Divider,
  Container,
  Heading,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { useLoading } from "../utils/PageUtils";
import { capitalizeWords } from "../utils/formatUtils";
import { getAllProducts, getProductsByCategory } from "../service/products";
import { getCategoriesByName } from "../service/categories";
import { Product, Category } from "../types/dataTypes";
import * as Comps from "../components";
import { useParams, Link } from "react-router-dom";
import { sortProducts } from "../utils/queryUtils";
import { sortProductPage } from "../constants/queryConstants";

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] =
    useState<keyof typeof sortProductPage>("Name A-Z");
  const [categoryDetails, setCategoryDetails] = useState<Category | null>(null);
  const { loading, setLoading, LoadingComponent } = useLoading();
  const { category } = useParams<{ category?: string }>();

  const sortOptions = Object.keys(sortProductPage) as Array<
    keyof typeof sortProductPage
  >;

  async function fetchProducts() {
    setLoading(true);
    try {
      let data;
      let details;
      if (category) {
        // console.log(category);
        data = await getProductsByCategory(category);
        details = await getCategoriesByName(category);

        if (details) {
          setCategoryDetails(details);
          // console.log(details);
        } else {
          setCategoryDetails(null);
        }
      } else {
        data = await getAllProducts();
        setCategoryDetails(null);
      }

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [category]);

  useEffect(() => {
    setFilteredProducts(sortProducts(products, sortOrder));
  }, [products, sortOrder]);

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortOrder(e.target.value as keyof typeof sortProductPage);
  }

  function handleFilterChange(filteredProducts: Product[]) {
    setFilteredProducts(sortProducts(filteredProducts, sortOrder));
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Container maxW="80vw" centerContent>
      {/* Product or Category Details*/}
      <Flex
        direction="column"
        gap={4}
        w="100%"
        p={4}
        h="12vh"
        height="full"
        my={4}
      >
        {/* Category Header */}
        <Heading
          as="h1"
          fontFamily="'Baskervville', serif"
          fontWeight={600}
          my={4}
        >
          {category ? capitalizeWords(category) : null}
        </Heading>

        {/* Category Details */}
        <Text>{categoryDetails?.description}</Text>
        <Stack spacing={4} flexDir="row">
          {categoryDetails?.gridImages.map((image, index) => (
            <Box
              maxBlockSize="400px"
              boxSize="400px"
              border="1px solid lightgrey"
              boxShadow="lg"
              key={index}
            >
              <Image
                src={image}
                alt={image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Stack>
      </Flex>

      <Divider border="1px solid lightgrey" />

      {/* Product Grid & Queries*/}
      <Stack direction="row" spacing={0} w="100%" p={4}>
        <VStack align="stretch" w="17vw" mx={4}>
          <Comps.ProductFilters
            products={products}
            onFilterChange={handleFilterChange}
          />
        </VStack>
        <Box w="100%">
          <Flex justifyContent="flex-end" mb={4} gap={8}>
            <Select width="200px" value={sortOrder} onChange={handleSortChange}>
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            <Link to="/store">
              <Button colorScheme="red" variant="outline">
                Clear Filters
              </Button>
            </Link>
          </Flex>
          <Box
            boxShadow="lg"
            border="1px"
            borderColor="rgba(211, 211, 211, 0.5)"
            borderRadius="20px"
            p={10}
          >
            <Comps.ProductGrid products={filteredProducts} />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default StorePage;
