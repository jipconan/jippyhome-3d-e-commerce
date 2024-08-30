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
      const shuffledProducts = data.sort(() => 0.5 - Math.random()).slice(0, 5);
      setProducts(shuffledProducts);
    });
  }, []);

  return (
    <Stack spacing={8}>
      {/* Landing Page Section */}
      <Flex direction="row" mb={8} align="stretch" h="100vh">
        <Image
          src={`/media/homepageimages/homepageimage-large-1.jpg`}
          alt="Landing Image"
          objectFit="cover"
          flex="1"
          minW="300px"
          h="100%"
        />
        <Box position="relative" flex="0 1 40%" bg="gray.200" minW="300px">
          <Image
            src="/media/homepageimages/homepageimage-small-1.jpg"
            alt="Landing Image"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Flex
            position="absolute"
            top="25%"
            right="0"
            direction="column"
            align="end"
            color="white"
            p={12}
            mr={4}
          >
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              color="gray.700"
              textAlign="end"
              fontFamily="'Baskervville', serif"
              my={4}
            >
              Buy Furniture Online In JippyHome At Your Leisure
            </Heading>
            <Text
              fontSize={{ base: "1xl", md: "2xl" }}
              color="gray.700"
              textAlign="end"
              fontFamily="'Baskervville', serif"
              my={4}
            >
              Enjoy unbeatable prices with the highest quality!
            </Text>
            <Button
              mt={4}
              as={Link}
              to="/store"
              colorScheme="teal"
              bgColor="gray.700"
              _hover={{ bgColor: "gray.600" }}
              size="lg"
              borderRadius="30px"
              textAlign="end"
            >
              Shop Now
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* Categories Grid */}
      <Flex justify="center" my={8}>
        <Box maxW="90vw" w="100%" px={4}>
          <Heading
            fontSize="3xl"
            my={12}
            fontFamily="'Baskervville', serif"
            fontWeight="bold"
          >
            Shop by Categories
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={8}>
            {homePageCategoryContent.map((category) => (
              <Link key={category._id} to={`/store/${category.name}`}>
                <Flex direction="column" align="center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    h="100%"
                    w="100%"
                    objectFit="cover"
                    borderRadius="50%"
                  />
                  <Text mt={4}>{category.name}</Text>
                </Flex>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>

      <Flex direction="row" my={8} align="stretch" h="100vh">
        <Box position="relative" flex="0 1 40%" bg="gray.200" minW="300px">
          <Image
            src="/media/homepageimages/homepageimage-small-2.jpg"
            alt="Landing Image"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Flex
            position="absolute"
            top="25%"
            right="0"
            direction="column"
            align="start"
            color="white"
            p={12}
            ml={8}
          >
            <Heading
              fontSize={{ base: "4xl", md: "5xl" }}
              color="gray.700"
              textAlign="start"
              fontFamily="'Baskervville', serif"
              my={4}
            >
              Shop for sofas online at JippyHome, anytime you like.
            </Heading>
            <Text
              fontSize={{ base: "1xl", md: "2xl" }}
              color="gray.700"
              textAlign="start"
              fontFamily="'Baskervville', serif"
              my={4}
            >
              Find your ideal sofa online at JippyHome.
            </Text>
            <Button
              mt={4}
              as={Link}
              to="/store/sofas"
              colorScheme="teal"
              bgColor="gray.700"
              _hover={{ bgColor: "gray.600" }}
              size="lg"
              borderRadius="30px"
              textAlign="start"
            >
              Shop Now
            </Button>
          </Flex>
        </Box>
        <Image
          src={`/media/homepageimages/homepageimage-large-2.jpg`}
          alt="Landing Image"
          objectFit="cover"
          flex="1"
          minW="300px"
          h="100%"
        />
      </Flex>

      {/* Grid of interesting products */}
      <Flex direction="column" justify="center" align="center" my={8}>
        <Box maxW="80vw" w="100%" px={4}>
          <Heading
            fontSize="3xl"
            my={12}
            fontFamily="'Baskervville', serif"
            fontWeight="bold"
          >
            Interesting Products
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
            {products.map((product) => (
              <Comps.ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>

      {/* Benefits Information */}
      <Flex direction="column" justify="center" align="center" my={8}>
        <Box maxW="70vw" w="100%">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
            {homePageBenefitsContent.map((info, index) => (
              <Flex key={index} direction="column" align="center">
                <Box
                  position="relative"
                  width="100%"
                  maxW="100px"
                  overflow="hidden"
                >
                  <Image
                    src={info.image}
                    alt={info.heading}
                    objectFit="cover"
                  />
                </Box>
                <Flex
                  direction="column"
                  align="center"
                  justify="space-between"
                  minHeight="120px"
                  mt={8}
                >
                  <Heading fontSize="2xl" mb={2}>
                    {info.heading}
                  </Heading>
                  <Text align="center" mb={4}>
                    {info.description}
                  </Text>
                  <Text textDecoration="underline" cursor="pointer">
                    Learn More
                  </Text>
                </Flex>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>

      {/* Store Information Texts */}
      <Stack spacing={4} align="center" my={8}>
        <Heading fontSize="2xl">Store Information</Heading>
        <Text fontSize="lg">
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
