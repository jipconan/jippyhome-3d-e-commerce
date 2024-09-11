import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Select,
  Divider,
  Container,
  Heading,
  Text,
  Image,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useLoading } from "../utils/PageUtils";
import { capitalizeWords } from "../utils/formatUtils";
import { getAllProducts, getProductsByCategory } from "../service/products";
import { getCategoriesByName } from "../service/categories";
import { Product, Category } from "../types/dataTypes";
import * as Comps from "../components";
import { useParams } from "react-router-dom";
import { sortProducts } from "../utils/queryUtils";
import { sortProductPage } from "../constants/queryConstants";
import FilterDrawer from "./StorePageComponents/FilterDrawer";
import { GiHamburgerMenu } from "react-icons/gi";

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function fetchProducts() {
    setLoading(true);
    try {
      let data;
      let details;
      if (category) {
        data = await getProductsByCategory(category);
        details = await getCategoriesByName(category);

        if (details) {
          setCategoryDetails(details);
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
    // Sort the currently filtered products, not the full products list
    setFilteredProducts((prevFilteredProducts) =>
      sortProducts(prevFilteredProducts, sortOrder)
    );
  }, [sortOrder]);

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortOrder(e.target.value as keyof typeof sortProductPage);
  }

  // When filters are applied, keep sorting the filtered list
  function handleFilterChange(filteredProducts: Product[]) {
    setFilteredProducts(sortProducts(filteredProducts, sortOrder));
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Container maxW={{ base: "100vw", md: "90vw", lg: "65vw" }} centerContent>
      {/* Product or Category Details*/}
      <Flex direction="column" gap={4} w="100%" h="auto" my={8}>
        {/* Category Header */}
        <Heading as="h1" fontFamily="'Baskervville', serif" fontWeight="bold">
          {category ? capitalizeWords(category) : null}
        </Heading>

        {/* Category Details */}
        <Text fontSize="sm" maxW={{ base: "auto", md: "40vw" }} my={4}>
          {categoryDetails?.description}
        </Text>
        <Flex gap={4} direction={{ base: "column", md: "row" }}>
          {categoryDetails?.gridImages.map((image, index) => (
            <Box
              boxSize={{ base: "auto", md: "400px" }}
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
        </Flex>
      </Flex>

      <Divider border="1px solid lightgrey" />

      {/* Product Grid & Queries */}
      <Flex direction="row" w="100%" my={8}>
        <Flex direction="row" justify="space-between" w="100%">
          <Button
            border="1px solid #E2E8F0"
            borderRadius={2}
            variant="ghost"
            onClick={onOpen}
            aria-label="Menu"
            size={{ base: "sm", md: "lg" }}
            fontSize={{ base: "sm", md: "lg" }}
          >
            <Flex align="center" gap={4}>
              <GiHamburgerMenu />
              <Text>Filters</Text>
            </Flex>
          </Button>

          <FilterDrawer
            products={products}
            onFilterChange={handleFilterChange}
            isOpen={isOpen}
            onClose={onClose}
          />

          {/* Sort Option & Product Grid */}
          <Select
            width={{ base: "150px", md: "200px" }}
            size={{ base: "sm", md: "lg" }}
            value={sortOrder}
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>

      {/* Product Grid */}
      <Box
        boxShadow="lg"
        border="1px"
        borderColor="rgba(211, 211, 211, 0.5)"
        borderRadius="20px"
        p={4}
      >
        <Comps.ProductGrid products={filteredProducts} />
      </Box>
    </Container>
  );
};

export default StorePage;
