import React from "react";
import { Stack, SimpleGrid, Box } from "@chakra-ui/react";
import * as Comps from "../../components";
import { Product } from "../../types/dataTypes";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <Stack align="start">
      <Box
        overflowY="scroll"
        h={{ base: "auto", md: "70vh" }}
        w={{ base: "auto", md: "80vw", lg: "62vw" }}
      >
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          {products.map((product) => (
            <Comps.ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default ProductGrid;
