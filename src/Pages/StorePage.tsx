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
} from "@chakra-ui/react";
import { useLoading } from "../utils/PageUtils";
import { getAllProducts, getProductsByCategory } from "../service/products";
import { Product } from "../types/dataTypes";
import * as Comps from "../components";
import { useParams } from "react-router-dom";
import { sortProducts } from "../utils/queryUtils";
import { sortProductPage } from "../constants/queryConstants";

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] =
    useState<keyof typeof sortProductPage>("Name A-Z"); // Define sortOrder as one of the keys
  const { loading, setLoading, LoadingComponent } = useLoading();
  const { category } = useParams<{ category?: string }>();

  const sortOptions = Object.keys(sortProductPage) as Array<
    keyof typeof sortProductPage
  >; // Ensure sortOptions is typed correctly

  async function fetchProducts() {
    setLoading(true);
    try {
      let data;
      if (category) {
        data = await getProductsByCategory(category);
      } else {
        data = await getAllProducts();
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
      <Stack align="stretch" justify="center" w="100%" p={4} h="12vh">
        <Heading as="h1" fontFamily="'Baskervville', serif" fontWeight={600}>
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : null}
        </Heading>
      </Stack>
      <Divider border="1px solid lightgrey" />
      <Stack direction="row" spacing={0} w="100%" p={4}>
        <VStack align="stretch" w="17vw">
          <Comps.ProductFilters
            products={products}
            onFilterChange={handleFilterChange}
          />
        </VStack>
        <Box w="100%">
          <Flex justifyContent="flex-end" mb={4}>
            <Select
              width="200px"
              value={sortOrder}
              onChange={handleSortChange}
              placeholder="Sort by"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Flex>
          <Comps.ProductGrid products={filteredProducts} />
        </Box>
      </Stack>
    </Container>
  );
};

export default StorePage;
