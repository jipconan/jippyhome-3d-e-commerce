import React, { useState, useEffect } from "react";
import {
  Stack,
  Image,
  Text,
  Flex,
  HStack,
  IconButton,
  keyframes,
} from "@chakra-ui/react";
import { MdArrowBack, MdArrowForward, Md3dRotation } from "react-icons/md";
import { Product } from "../types/dataTypes";
import * as Comps from "../components";
import { useLoading } from "../utils/PageUtils";
import { formatArrayToStringWithComma } from "../utils/formatUtils";
import { useParams } from "react-router-dom";
import { getProductById } from "../service/products";
import { User } from "../types/propsTypes";

type ProductPageProps = {
  user: User;
};

// Keyframes for the spin animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const ProductPage: React.FC<ProductPageProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { LoadingComponent } = useLoading();

  const fetchProduct = async () => {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }

    try {
      const data: Product = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : product.imageUrl.length - 1
      );
    }
  };

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < product.imageUrl.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (product) {
      if (index === product.imageUrl.length) {
        // Open 3D model previewer modal
        setIsModalOpen(true);
      } else {
        setCurrentImageIndex(index);
      }
    }
  };

  const closeModal = () => setIsModalOpen(false);

  if (!product) return <LoadingComponent />;

  return (
    <Flex as="header" align="center" justify="center" w="100%" py={4}>
      <Stack direction="row" spacing={8} p={8} maxW="75vw" w="100%">
        {/* Left Side */}
        <Stack spacing={4} flex="1">
          {/* Main Image Gallery */}
          <Flex
            h="100%"
            w="45vw"
            align="center"
            justify="center"
            border="solid 1px lightgrey"
            borderRadius="5px"
            position="relative"
            bgColor="whitesmoke"
          >
            <Image
              src={product.imageUrl[currentImageIndex]}
              alt="Product Image"
              boxSize="600px"
              objectFit="cover"
            />
            <IconButton
              aria-label="Previous Image"
              icon={<MdArrowBack />}
              position="absolute"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              onClick={handlePrevImage}
              bgColor="white"
              border="solid 1px black"
              borderRadius="50%"
              ml={8}
            />
            <IconButton
              aria-label="Next Image"
              icon={<MdArrowForward />}
              position="absolute"
              right="0"
              top="50%"
              transform="translateY(-50%)"
              onClick={handleNextImage}
              zIndex="10"
              bgColor="white"
              border="solid 1px black"
              borderRadius="50%"
              mr={8}
            />
          </Flex>

          {/* Thumbnails */}
          <Flex>
            <HStack spacing={2}>
              {product.imageUrl.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  boxSize="80px"
                  objectFit="cover"
                  border={
                    currentImageIndex === index ? "2px solid blue" : "none"
                  }
                  cursor="pointer"
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
              <Flex
                cursor="pointer"
                h="100%"
                w="80px"
                align="center"
                justify="center"
                border="solid 1px lightgrey"
                borderRadius="5px"
                onClick={() => handleThumbnailClick(product.imageUrl.length)}
              >
                <IconButton
                  aria-label="3D View"
                  variant="ghost"
                  colorScheme="white"
                  icon={<Md3dRotation />}
                  size="lg"
                  fontSize="5xl"
                  animation={`${spin} 2s infinite`}
                />
              </Flex>
            </HStack>
          </Flex>
        </Stack>

        {/* Right Side */}
        <Stack spacing={4} flex="1">
          <Text fontSize="2xl" fontWeight="bold">
            {product.name}
          </Text>
          <Text>{product.description}</Text>
          <Text fontSize="xl" color="green.500">
            ${product.price.toFixed(2)}
          </Text>
          <Text>{product.public_id}</Text>
          <Text>
            Materials: {formatArrayToStringWithComma(product.material)}
          </Text>
          <Text>Colors: {formatArrayToStringWithComma(product.color)}</Text>
          <Text>
            Measurements: {product.dimensions.width} x{" "}
            {product.dimensions.height} x {product.dimensions.depth} cm
          </Text>
          <Stack key={product.public_id}>
            <Comps.AddToCartButton product={product} user={user} />
          </Stack>
        </Stack>
      </Stack>

      {/* 3D Model Previewer Modal */}
      <Comps.ProductThreeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modelUrl={product.modelUrl}
      />
    </Flex>
  );
};

export default ProductPage;
