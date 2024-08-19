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

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const { loading, setLoading, LoadingComponent } = useLoading();
  const { category } = useParams<{
    category?: string;
  }>();

  async function fetchProducts() {
    setLoading(true);
    try {
      if (category) {
        console.log(category);
        setProducts([]);
        // Fetch products by category
        const data = await getProductsByCategory(category);
        setProducts(data);
      } else {
        setProducts([]);
        // Fetch all products
        const data = await getAllProducts();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSortOrder(value);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (value === "price-low-high") {
        return a.price - b.price;
      } else if (value === "price-high-low") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

    setFilteredProducts(sortedProducts);
  }

  function handleFilterChange(filteredProducts: Product[]) {
    setFilteredProducts(filteredProducts);
  }

  useEffect(() => {
    fetchProducts();
  }, [category]); // Fetch products whenever category changes

  useEffect(() => {
    setFilteredProducts(products); // Initialize filtered products
  }, [products]);

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
          {/* Add filter components here */}
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
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </Select>
          </Flex>

          <Comps.ProductGrid products={filteredProducts} />
        </Box>
      </Stack>
    </Container>
  );
};

export default StorePage;
