// StorePage.tsx
import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useLoading } from "../utils/PageUtils";
import { getProductsBySubCategory } from "../service/finder";
import { ProductsByCategory } from "../types/dataTypes";
import * as Comps from "../components";

const StorePage: React.FC = () => {
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory>({});
  const { loading, setLoading, LoadingComponent } = useLoading();

  // Fetches products by subcategory and updates state
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

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Display loading component while data is being fetched
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Box p={4}>
      {/* Map through categories and subcategories to display products */}
      {Object.entries(productsByCategory).map(([category, subCategories]) => (
        <Box
          key={category}
          borderWidth="2px"
          borderRadius="md"
          boxShadow="dark-lg"
          p={8}
          mb={8}
        >
          {/* Category name */}
          <Heading as="h2" size="lg" mb={4}>
            {category}
          </Heading>
          {/* Map through subcategories to display products */}
          {Object.entries(subCategories).map(([subCategory, products]) => (
            <Box
              key={subCategory}
              borderWidth="2px"
              borderRadius="md"
              borderColor="lightgrey"
              boxShadow="md"
              p={8}
              mb={8}
            >
              {/* subCategory name */}
              <Heading as="h3" size="md" mb={3}>
                {subCategory}
              </Heading>
              <Comps.ProductGrid products={products} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default StorePage;
