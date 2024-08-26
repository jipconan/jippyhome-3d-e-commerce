import React from "react";
import { Stack, SimpleGrid, Box } from "@chakra-ui/react";
import * as Comps from "../../components";
import { Product } from "../../types/dataTypes";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <Stack spacing={4} align="start">
      <Box overflowY="scroll" minHeight="80vh" maxHeight="80vh">
        <SimpleGrid columns={4} spacing={4}>
          {products.map((product) => (
            <Comps.ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default ProductGrid;
