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
import { homePageCategoryContent } from "../constants/categoriesContents";
import { Product } from "../types/dataTypes";
import * as Comps from "../components";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the backend and randomize the results
    getAllProducts().then((data) => {
      const shuffledProducts = data.sort(() => 0.5 - Math.random()).slice(0, 5);
      setProducts(shuffledProducts);
    });
  }, []);

  return (
    <Stack spacing={8}>
      {/* 1. Landing Page Section */}
      <Flex>
        <Box>
          <Image
            src="https://fakeimg.pl/1440x400"
            alt="Landing Image"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
        <Box position="relative" height="60vh" w="40vw" bg="gray.200">
          <Image
            src="https://fakeimg.pl/400x400"
            alt="Landing Image"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            direction="column"
            align="start"
          >
            <Text fontSize="4xl" color="white">
              Welcome to Our Store
            </Text>
            <Button mt={4} as={Link} to="/store" colorScheme="teal">
              Shop Now
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* 2b. Categories Grid */}
      <Box px={24} py={12}>
        {/* 2a. Shop by Categories */}
        <Text fontSize="2xl" fontWeight="bold" textAlign="start" mb={4}>
          Shop by Categories
        </Text>
        <SimpleGrid columns={6} spacing={8}>
          {homePageCategoryContent.map((category) => (
            <Link key={category._id} to={`/store/${category.name}`}>
              <Flex direction="column" align="center">
                <Image
                  src={category.image}
                  alt={category.name}
                  boxSize="250px"
                  borderRadius="50%"
                />
                <Text mt={4}>{category.name}</Text>
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
      </Box>

      {/* 3. Branding Section with Sofa Image */}
      <Flex my={8}>
        <Box position="relative" height="60vh" w="40vw" bg="gray.200">
          <Image
            src="https://fakeimg.pl/400x400"
            alt="Landing Image"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            direction="column"
            align="start"
          >
            <Text fontSize="4xl" color="white">
              Welcome to Our Store
            </Text>
            <Button mt={4} as={Link} to="/store" colorScheme="teal">
              Shop Now
            </Button>
          </Flex>
        </Box>
        <Box>
          <Image
            src="https://fakeimg.pl/1440x400"
            alt="Landing Image"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
      </Flex>

      <Box px={24} py={12}>
        {/* 4a. Interesting Products Heading */}
        <Text fontSize="2xl" fontWeight="bold" textAlign="start" mb={4}>
          Interesting Products
        </Text>

        {/* 4b. Product Cards */}
        <SimpleGrid columns={5} spacing={4}>
          {products.map((product) => (
            <Comps.ProductCard product={product} />
          ))}
        </SimpleGrid>
      </Box>

      {/* 5. Image Row with Headings */}
      <Flex justify="center">
        <SimpleGrid columns={4} spacing={4} maxW="70%">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Flex key={index} direction="column" align="center">
                <Box alignContent="center">
                  <Image
                    // src={`/path-to-image-${index + 1}.jpg`}
                    src={`https://fakeimg.pl/300x300`}
                    alt={`Image ${index + 1}`}
                    boxSize="200px"
                  />
                </Box>
                <Text fontSize="lg" fontWeight="bold" mt={2}>
                  Heading {index + 1}
                </Text>
                <Text mt={2}>Some description about this section.</Text>
                <Text mt={2} textDecoration="underline" cursor="pointer">
                  Learn More
                </Text>
              </Flex>
            ))}
        </SimpleGrid>
      </Flex>

      {/* 6. Column of Texts */}
      <Stack spacing={4} align="center" my={12}>
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
