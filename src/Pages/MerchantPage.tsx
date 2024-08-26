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
import { getProductsBySubCategory } from "../service/finder";
import { ProductsByCategory, Category } from "../types/dataTypes";
import * as Comps from "../components";
import { getCategoriesByLevel } from "../service/categories";

const MerchantPage: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleUploadModelClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsUploadModalOpen(false);
  };

  // State to store products by category
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory>({});

  // Custom hook for loading state management
  const { loading, setLoading, LoadingComponent } = useLoading();

  async function fetchAllCategories() {
    try {
      const data: Category[] = await getCategoriesByLevel(1);
      setCategories(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  // Function to fetch products by subcategory
  async function fetchProducts() {
    setLoading(true);
    try {
      const data: ProductsByCategory = await getProductsBySubCategory();
      setProductsByCategory(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch products on component mount
  useEffect(() => {
    fetchAllCategories();
    fetchProducts();
  }, []);

  // Show loading component while data is being fetched
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Box p={4}>
      {/* Upload Button */}
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
              <Select size="lg" w="10vw">
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Flex>
            <Flex align="center" gap={4}>
              <Text fontWeight="bold">Sorter:</Text>
              <Select size="lg" w="10vw">
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* Render categories and subcategories */}
      {Object.entries(productsByCategory || {}).map(
        ([category, subCategories]) => (
          <Box key={category} my={4} px={12}>
            <Heading as="h2" size="lg" mb={4}>
              {category}
            </Heading>
            {Object.entries(subCategories).map(([subCategory, products]) => (
              <Box
                key={subCategory}
                borderRadius="md"
                border="solid 2px lightgrey"
                boxShadow="md"
                p={8}
                mb={4}
              >
                <Heading as="h3" size="md" mb={4}>
                  {subCategory}
                </Heading>
                <Comps.MerchantGrid products={products} />
              </Box>
            ))}
          </Box>
        )
      )}

      {/* Upload Modal */}
      <Comps.MerchantUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseModals}
      />
    </Box>
  );
};

export default MerchantPage;
