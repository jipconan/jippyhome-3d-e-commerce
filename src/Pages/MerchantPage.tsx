import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Spacer,
  Flex,
  Select,
  Text,
} from "@chakra-ui/react";
import { useLoading } from "../utils/PageUtils";
import { Category, Product } from "../types/dataTypes";
import * as Comps from "../components";
import { getCategoriesByLevel } from "../service/categories";
import { sortMerchantProducts } from "../utils/queryUtils";
import { sortMerchantPage } from "../constants/queryConstants";
import { getProductsByCategory, getAllProducts } from "../service/products";

const MerchantPage: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] =
    useState<keyof typeof sortMerchantPage>("Name A-Z");

  const sortOptions = Object.keys(sortMerchantPage) as Array<
    keyof typeof sortMerchantPage
  >;

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { loading, setLoading, LoadingComponent } = useLoading();

  async function fetchAllCategories() {
    setLoading(true);
    try {
      const data: Category[] = await getCategoriesByLevel(1);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAllProducts() {
    setLoading(true);
    try {
      const data: Product[] = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data); // Initially set all products
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProductsByCategory(categoryName: string) {
    setLoading(true);
    try {
      const data: Product[] = await getProductsByCategory(categoryName);

      if (data.length === 0) {
        setFilteredProducts([]);
      } else {
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);

      // Handle specific errors (like 404)
      if (error instanceof Error && error.message.includes("404")) {
        setFilteredProducts([]);
      } else {
        setFilteredProducts([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // console.log("Fetching categories and products");
    fetchAllCategories();
    fetchAllProducts();
  }, []);

  useEffect(() => {
    // console.log("Category changed:", selectedCategory);
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    // console.log("Sorting products");
    const sorted = sortMerchantProducts(filteredProducts, sortOrder);
    setFilteredProducts(sorted);
  }, [sortOrder]);

  const handleUploadModelClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsUploadModalOpen(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as keyof typeof sortMerchantPage);
  };

  const handleRefreshQuery = () => {
    window.location.reload();
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Box px={12} my={4} display="flex" justifyContent="center">
        <Flex
          width="full"
          px={8}
          py={4}
          border="solid 2px lightgrey"
          boxShadow="md"
          borderRadius="lg"
          bg="white"
        >
          <Button
            bg="gray.500"
            color="gray.100"
            variant="ghost"
            size="lg"
            _hover={{ bg: "gray.600", color: "gray.300" }}
            onClick={handleUploadModelClick}
          >
            Upload
          </Button>
          <Spacer />
          <Flex gap={8}>
            <Flex align="center" gap={4}>
              <Text fontWeight="bold">Category Filter:</Text>
              <Select
                size="lg"
                w="10vw"
                placeholder="All Categories"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Flex>
            <Flex align="center" gap={4}>
              <Text fontWeight="bold">Sorter:</Text>
              <Select
                size="lg"
                w="10vw"
                onChange={handleSortChange}
                value={sortOrder}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Flex>
            <Button
              colorScheme="red"
              variant="outline"
              size="lg"
              onClick={handleRefreshQuery}
            >
              Refresh Query
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Box px={12}>
        <Heading as="h2" size="lg" mb={4}>
          Products
        </Heading>

        {filteredProducts.length === 0 ? (
          <Text fontSize="lg" color="gray.500">
            No products available
          </Text>
        ) : (
          <Comps.MerchantGrid products={filteredProducts} />
        )}
      </Box>

      <Comps.MerchantUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseModals}
      />
    </>
  );
};

export default MerchantPage;
