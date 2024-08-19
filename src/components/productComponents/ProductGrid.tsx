import React, { useEffect, useState } from "react";
import { Button, Stack, SimpleGrid, Flex } from "@chakra-ui/react";
import * as Comps from "../../components";
import { Product } from "../../types/dataTypes";

const INITIAL_LOAD_COUNT = 8;
const LOAD_MORE_COUNT = 48;

type ProductGridProps = {
  products: Product[]; // Pass the full list of products
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(INITIAL_LOAD_COUNT);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    // Initialize displayed products
    setDisplayedProducts(products.slice(0, INITIAL_LOAD_COUNT));
  }, [products]);

  const handleLoadMore = () => {
    if (loadedCount >= products.length) {
      setHasMore(false); // No more products to load
      return;
    }
    const newLoadedCount = loadedCount + LOAD_MORE_COUNT;
    setLoadedCount(newLoadedCount);
    setDisplayedProducts(products.slice(0, newLoadedCount));
  };

  useEffect(() => {
    if (loadedCount >= products.length) {
      setHasMore(false); // Update the hasMore flag when there are no more products
    }
  }, [loadedCount, products.length]);

  return (
    <Stack spacing={4} align="start">
      <SimpleGrid columns={4} spacing={4}>
        {displayedProducts.map((product) => (
          <Comps.ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
      {hasMore && (
        <Flex justify="center" mt={4} width="100%">
          <Button
            onClick={handleLoadMore}
            bg="gray.500"
            color="gray.100"
            size="lg"
            _hover={{ bg: "gray.700", color: "gray.300" }}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

export default ProductGrid;
