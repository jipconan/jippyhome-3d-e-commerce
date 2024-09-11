// ProductCard.tsx
import { Image, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/dataTypes";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    const link = product._id;
    navigate(`/store/product/${link}`);
  };

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      direction="column"
      maxH="300px"
      maxW="auto"
      onClick={handleClick}
      cursor="pointer"
      p={4}
    >
      {/* Image of the product */}
      <Flex flex="1" align="center" justify="center" p={4}>
        <Image
          src={imageUrl[0]}
          alt={name}
          objectFit="contain"
          maxH="150px"
          maxW="auto"
        />
      </Flex>

      {/* Product details */}
      <Flex direction="column">
        {/* Product name */}
        <Text
          fontWeight="bold"
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          h="6vh"
          mb={{ base: 0, md: 2 }}
        >
          {name}
        </Text>
        {/* Product description */}
        {/* <Text color="gray.500" fontSize="xs" height="4vh" overflow="hidden">
          {description}
        </Text> */}
        {/* Product price */}
        <Text
          mt="2"
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          fontWeight="semibold"
          height="4vh"
          color="gray.500"
        >
          ${price}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
