// ProductCard.tsx
import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/dataTypes";

type ProductCardProps = {
  product: Product; // Define the product prop type
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, price, imageUrl } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    const link = product._id;
    navigate(`/store/product/${link}`);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      display="flex"
      flexDirection="column"
      h="100%"
      onClick={handleClick}
      cursor="pointer"
    >
      {/* Image of the product */}
      <Box flex="1" alignContent="center" p={12}>
        <Image src={imageUrl[0]} alt={name} objectFit="cover" />
      </Box>

      {/* Product details */}
      <Box p="4">
        {/* Product name */}
        <Text fontWeight="bold" fontSize="lg" mb="2" height="3vh">
          {name}
        </Text>
        {/* Product description */}
        <Text color="gray.500" fontSize="sm" height="4vh" overflow="hidden">
          {description}
        </Text>
        {/* Product price */}
        <Text mt="2" fontSize="lg" fontWeight="semibold" height="4vh">
          ${price}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductCard;
