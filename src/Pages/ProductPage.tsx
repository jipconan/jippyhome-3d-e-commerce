import React, { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Text,
  IconButton,
  keyframes,
  Heading,
  Icon,
  Box,
} from "@chakra-ui/react";
import {
  MdArrowBack,
  MdArrowForward,
  Md3dRotation,
  MdCalendarToday,
  MdDeliveryDining,
} from "react-icons/md";
import { Product } from "../types/dataTypes";
import * as Comps from "../components";
import { useLoading } from "../utils/PageUtils";
import {
  formatArrayToStringWithComma,
  capitalizeWords,
  formatDate,
} from "../utils/formatUtils";
import { useParams } from "react-router-dom";
import { getProductById } from "../service/products";
import { User } from "../types/propsTypes";
import { productPageContent } from "../constants/textContents";

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

  // Calculate shipping dates
  const today = new Date();
  const todayString = today.toISOString();

  const threeWeeksLaterDate = new Date();
  threeWeeksLaterDate.setDate(new Date().getDate() + 21);
  const threeWeeksLaterString = threeWeeksLaterDate.toISOString();

  const formattedToday = formatDate(todayString);
  const formattedThreeWeeksLater = formatDate(threeWeeksLaterString);

  return (
    <Flex as="header" align="center" justify="center" w="100%" py={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        p={8}
        align="center"
        justify="center"
        gap={12}
      >
        {/* Left Side */}
        <Flex gap={4} direction="column">
          {/* Main Image Gallery */}
          <Flex
            border="solid 1px lightgrey"
            borderRadius="5px"
            position="relative"
            bgColor="whitesmoke"
            w={{ base: "auto", md: "40vw" }}
            h={{ base: "220px", md: "80vh" }}
            direction="column"
            align="center"
            justify="center"
            p={4}
          >
            <Image
              src={product.imageUrl[currentImageIndex]}
              alt="Product Image"
              objectFit="contain"
              w={{ base: "300px", md: "auto" }}
              h={{ base: "200px", md: "auto" }}
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
              ml={{ base: 2, md: 8 }}
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
              mr={{ base: 2, md: 8 }}
            />
          </Flex>

          {/* Thumbnails */}
          <Flex maxW={{ base: "95vw", md: "100vw" }}>
            <Flex direction="row" gap={2}>
              {product.imageUrl.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  boxSize="65px"
                  objectFit="cover"
                  border={
                    currentImageIndex === index ? "2px solid gray" : "none"
                  }
                  cursor="pointer"
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
              <Flex
                cursor="pointer"
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
                  h="100%"
                  w="65px"
                  fontSize="5xl"
                  animation={`${spin} 2s infinite`}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Right Side */}
        <Flex gap={8} direction="column" w={{ base: "300px", md: "auto" }}>
          <Flex direction="column">
            <Text fontSize="2xl" fontWeight="bold">
              {product.name}
            </Text>
            <Text fontSize="sm" color="gray">
              {product.public_id}
            </Text>
          </Flex>

          <Flex direction="column">
            <Heading fontSize="lg">Price</Heading>
            <Text fontSize="xl" color="green.500">
              ${product.price.toFixed(2)}
            </Text>
          </Flex>

          <Flex direction="column">
            <Heading fontSize="lg">Materials</Heading>
            <Text>
              {capitalizeWords(formatArrayToStringWithComma(product.material))}
            </Text>
          </Flex>

          <Flex direction="column">
            <Heading fontSize="lg">Colors</Heading>
            <Flex direction="row" gap={8}>
              {product.color.map((color, index) => (
                <React.Fragment key={index}>
                  <Flex direction="row" gap={1} align="center">
                    <Box
                      w="30px"
                      h="30px"
                      bg={`linear-gradient(to bottom right, ${color}, rgba(0, 0, 0, 0.75))`}
                      borderRadius="full"
                      border={"1px solid lightgrey"}
                    />
                    <Text fontSize="sm">{color}</Text>
                  </Flex>
                </React.Fragment>
              ))}
            </Flex>
          </Flex>

          <Flex direction="column">
            <Heading fontSize="lg">Dimensions</Heading>
            <Text>
              {product.dimensions.width} x {product.dimensions.height} x{" "}
              {product.dimensions.depth} cm
            </Text>
          </Flex>

          <Flex direction="column">
            <Heading fontSize="lg">Description</Heading>
            <Text>{product.description}</Text>
          </Flex>

          <Flex key={product.public_id}>
            <Comps.AddToCartButton product={product} user={user} />
          </Flex>

          {/* Shipping Estimation */}
          <Flex gap={4} align="center" direction="column">
            <Flex direction="row" gap={8} my={4}>
              <Flex align="center" direction="column">
                <Text fontWeight="bold">Order Today</Text>
                <Icon as={MdCalendarToday} boxSize={8} my={2} />
                <Text>{formattedToday}</Text>
              </Flex>
              <Flex align="center" direction="column">
                <Text fontWeight="bold">Door Delivery</Text>
                <Icon as={MdDeliveryDining} boxSize={8} my={2} />
                <Text>{formattedThreeWeeksLater}</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex direction="column">
            {productPageContent.map((text) => (
              <Text key={text} fontSize="sm">
                {text}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Flex>

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
