// ProductCard.tsx
import { Box, Image, Text } from "@chakra-ui/react";
import { Product } from "../../types/dataTypes";

type ProductCardProps = {
  product: Product; // Define the product prop type
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, price, imageUrl } = product;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p="4"
      bg="white"
      display="flex"
      flexDirection="column"
      h="100%"
    >
      {/* Image of the product */}
      <Box flex="1">
        <Image src={imageUrl[0]} alt={name} boxSize="400px" objectFit="cover" />
      </Box>

      {/* Product details */}
      <Box mt="4" p="2">
        {/* Product name */}
        <Text fontWeight="bold" fontSize="lg" mb="2">
          {name}
        </Text>
        {/* Product description */}
        <Text color="gray.500" fontSize="sm">
          {description}
        </Text>
        {/* Product price */}
        <Text mt="2" fontSize="lg" fontWeight="semibold" p="5">
          ${price}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductCard;
