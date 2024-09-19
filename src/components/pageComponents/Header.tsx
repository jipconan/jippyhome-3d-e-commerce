// Header.tsx
import React, { useEffect, useState } from "react";
import { Flex, Image, Box, useBreakpointValue } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import * as Comps from "../../components";
import { UserProps } from "../../types/propsTypes";
import { Product, Category } from "../../types/dataTypes";
import { getAllProducts } from "../../service/products";
import { getCategoriesByLevel } from "../../api/categories";
import MenuDrawer from "./HeaderComponents/MenuDrawer";
import SearchBar from "./HeaderComponents/SearchBar";

const Header: React.FC<UserProps> = ({ user, admin }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const isPhonePortrait = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
  });

  // Fetch products and categories when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getAllProducts();
        setProducts(productsResponse);

        const categoriesResponse = await getCategoriesByLevel(2);
        setCategories(categoriesResponse);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Comps.AnnouncementHeader />
      <Flex
        as="header"
        align="center"
        justify="center"
        bg="gray.700"
        color="white"
        maxW="100vw"
        borderBottom="solid 1px"
        borderColor="gray.600"
      >
        <Flex
          align="center"
          justify="space-between"
          maxW={{ base: "auto", md: "98vw", lg: "70vw" }}
          w="100%"
        >
          {/* If it's portrait, show MenuDrawer */}
          {isPhonePortrait ? (
            <Flex direction="column">
              <MenuDrawer
                user={user}
                admin={admin}
                products={products}
                categories={categories}
              />
            </Flex>
          ) : (
            <>
              <Flex align="center">
                {/* Logo */}
                <Link to="/">
                  <Flex align="center" ml={4}>
                    <Image
                      src="/media/jippylogocolored.png"
                      alt="Logo"
                      boxSize="8vh"
                      maxW="8vw"
                      objectFit="cover"
                    />
                  </Flex>
                </Link>

                {/* SearchBar component */}
                <Box ml={4}>
                  <SearchBar products={products} categories={categories} />
                </Box>
              </Flex>

              {/* UserNav */}
              <Comps.UserNav user={user} admin={admin} />
            </>
          )}
        </Flex>
      </Flex>

      {/* If not in portrait mode, render CategoryBar */}
      {!isPhonePortrait && <Comps.CategoryBar />}
    </>
  );
};

export default Header;
