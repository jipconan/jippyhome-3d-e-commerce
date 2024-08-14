// ProductGrid.tsx
import { Stack, SimpleGrid } from "@chakra-ui/react";
import * as Comps from "../../components";
import { Product } from "../../types/dataTypes";
import { usePagination } from "../../utils/PaginationUtils";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { currentPage, totalPages, currentProducts, handlePageChange } =
    usePagination(products);

  return (
    <Stack>
      <Stack spacing={4} align="start">
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
          {currentProducts.map((product) => (
            <Comps.ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
      </Stack>
      <Comps.Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Stack>
  );
};

export default ProductGrid;
