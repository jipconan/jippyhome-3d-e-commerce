import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Text,
  Image,
  SimpleGrid,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/products";
import {
  homePageCategoryContent,
  homePageBenefitsContent,
} from "../constants/categoriesContents";
import { Product } from "../types/dataTypes";
import * as Comps from "../components";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((data) => {
      const shuffledProducts = data.sort(() => 0.5 - Math.random()).slice(0, 6);
      setProducts(shuffledProducts);
    });
  }, []);

  return (
    <Stack spacing={8}>
      {/* Landing Page Section 1 */}
      <Flex
        direction={{ base: "column", md: "row" }}
        mb={8}
        align="stretch"
        minHeight={{ base: "auto", md: "100vh" }}
      >
        {/* Landing Image Big 1 */}
        <Image
          src={`/media/homepageimages/homepageimage-large-1.jpg`}
          alt="Landing Image"
          objectFit="cover"
          w={{ base: "100%", md: "60%" }}
          h={{ base: "60vh", md: "auto" }}
        />
        <Box position="relative" w={{ base: "100%", md: "40%" }} bg="gray.200">
          {/* Landing Image Small 1 */}
          <Image
            src="/media/homepageimages/homepageimage-small-1.jpg"
            alt="Landing Image"
            objectFit="cover"
            w="100%"
            h={{ base: "70vh", md: "100%" }}
          />
          <Flex
            position="absolute"
            top={{ base: "10%", md: "25%", lg: "20%" }}
            right="0"
            direction="column"
            align="end"
            color="white"
            p={{ base: 4, md: 8 }}
            textAlign="end"
            gap={4}
          >
            <Heading
              fontSize={{ base: "2xl", md: "3xl", lg: "6xl" }}
              color="gray.700"
              fontFamily="'Baskervville', serif"
            >
              Buy Furniture Online In <br /> JippyHome At Your Leisure
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg", lg: "2xl" }}
              color="gray.700"
            >
              Enjoy unbeatable prices with the highest quality!
            </Text>
            <Button
              as={Link}
              to="/store"
              colorScheme="teal"
              bgColor="gray.700"
              _hover={{ bgColor: "gray.600" }}
              size={{ base: "md", md: "lg" }}
              borderRadius="30px"
            >
              Shop Now
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* Categories Grid */}
      <Box maxW="90vw" mx="auto" my={8}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          my={12}
          fontFamily="'Baskervville', serif"
          fontWeight="bold"
          textAlign="center"
        >
          Shop by Categories
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={12}>
          {homePageCategoryContent.map((category) => (
            <Link key={category._id} to={`/store/${category.name}`}>
              <Flex direction="column" align="center">
                <Image
                  src={category.image}
                  alt={category.name}
                  boxSize={{ base: "120px", md: "180px", lg: "200px" }}
                  objectFit="cover"
                />
                <Text mt={2} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                  {category.name}
                </Text>
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
      </Box>

      {/* 2nd Landing Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        mb={8}
        align="stretch"
        minHeight={{ base: "auto", md: "70vh", lg: "100vh" }}
      >
        <Box position="relative" w={{ base: "100%", md: "40%" }} bg="gray.200">
          <Flex
            position="absolute"
            top={{ base: "10%", md: "25%", lg: "25%" }}
            right={{ base: "30%", md: "25%", lg: "10%" }}
            direction="column"
            align="start"
            color="white"
            p={{ base: 4, md: 8 }}
            textAlign="start"
            gap={4}
          >
            <Heading
              fontSize={{ base: "2xl", md: "3xl", lg: "6xl" }}
              color="gray.700"
              fontFamily="'Baskervville', serif"
            >
              Shop for sofas here, whenever it suits you.
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg", lg: "2xl" }}
              color="gray.700"
            >
              Find your ideal sofa online at JippyHome.
            </Text>
            <Button
              as={Link}
              to="/store/sofas"
              colorScheme="teal"
              bgColor="gray.700"
              _hover={{ bgColor: "gray.600" }}
              size={{ base: "md", lg: "lg" }}
              borderRadius="30px"
            >
              Shop Now
            </Button>
          </Flex>

          {/* Landing Image Small 2 */}
          <Image
            src="/media/homepageimages/homepageimage-small-2.jpg"
            alt="Landing Image Small 2"
            objectFit="cover"
            w="100%"
            h={{ base: "60vh", md: "100%" }}
          />
        </Box>
        {/* Landing Image Big 2 */}
        <Image
          src={`/media/homepageimages/homepageimage-large-2.jpg`}
          alt="Landing Image Big 2"
          objectFit="cover"
          w={{ base: "100%", md: "60%" }}
          h={{ base: "70vh", md: "auto" }}
        />
      </Flex>

      {/* Products Grid */}
      <Box maxW="80vw" mx="auto" my={8}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          my={12}
          fontFamily="'Baskervville', serif"
          fontWeight="bold"
          textAlign="center"
        >
          Interesting Products
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={4}>
          {products.map((product) => (
            <Comps.ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Benefits Section */}
      <Box maxW="70vw" mx="auto" my={8}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {homePageBenefitsContent.map((info, index) => (
            <Flex key={index} direction="column" align="center">
              <Box maxW={{ base: "60px", md: "80px", lg: "100px" }}>
                <Image src={info.image} alt={info.heading} objectFit="cover" />
              </Box>
              <Heading fontSize={{ base: "lg", md: "xl" }} mt={4}>
                {info.heading}
              </Heading>
              <Text textAlign="center" mt={2}>
                {info.description}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>

      {/* Store Information */}
      <Stack
        spacing={4}
        align="center"
        justify="center"
        textAlign="center"
        my={8}
      >
        <Heading fontSize="2xl">Store Information</Heading>
        <Text fontSize={{ base: "md", md: "lg" }}>
          Fake address to the show room | Singapore 530000
        </Text>
        <Text>Open 10am to 8pm daily, includes Eves & Public Holidays</Text>
        <Text as="u" cursor="pointer">
          Visit Showroom
        </Text>
      </Stack>
    </Stack>
  );
};

export default HomePage;
