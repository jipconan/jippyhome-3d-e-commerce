import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import * as Comps from "../../components";
import { UserProps } from "../../types/propsTypes";
import { getAllProducts } from "../../service/products";
import { getCategoriesByLevel } from "../../api/categories";
import { searchItems } from "../../utils/queryUtils";
import SearchDropDown from "./HeaderComponents/SearchDropDown";
import { Product, Category } from "../../types/dataTypes";
import MenuDrawer from "./HeaderComponents/MenuDrawer";

const Header: React.FC<UserProps> = ({ user, admin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{
    products: Product[];
    categories: Category[];
  }>({ products: [], categories: [] });
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const isPhonePortrait = useBreakpointValue({ base: true, md: false });

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

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setDropdownOpen(term.length > 0);

    // Perform search using the utility function for both products and categories
    const results = searchItems(
      products,
      categories,
      term,
      ["name", "description", "tags"],
      ["name", "description"]
    );

    setSearchResults(results);
  };

  // Close dropdown if clicked outside or on a navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to close dropdown and clear search input
  const handleCloseDropdown = () => {
    setDropdownOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      <Comps.AnnouncementHeader />
      <Flex
        as="header"
        align="center"
        justify="center"
        bg="gray.700"
        color="white"
        w="100%"
        py={1}
        borderBottom="solid 1px"
        borderColor="gray.600"
      >
        <Flex
          align="center"
          justify="space-between"
          maxW={{ base: "98vw", md: "90vw", lg: "70vw" }}
          w="100%"
        >
          {/* If it's portrait, show MenuDrawer */}
          {isPhonePortrait ? (
            <MenuDrawer user={user} admin={admin} />
          ) : (
            <>
              <Flex align="center">
                {/* Logo */}
                <Link to="/">
                  <Flex align="center" ml={4}>
                    <Image
                      src="/media/jippylogocolored.png"
                      alt="Logo"
                      maxH="100%"
                      maxW={{ base: "15vw", md: "7vw", lg: "3vw" }}
                      objectFit="cover"
                    />
                  </Flex>
                </Link>

                {/* Search bar */}
                <Box
                  position="relative"
                  bg="gray.500"
                  borderRadius="20px"
                  p={1}
                  ml={4}
                  width="30vw"
                >
                  <InputGroup>
                    <Input
                      placeholder="Search..."
                      size="sm"
                      variant="outline"
                      bg="transparent"
                      borderRadius="20px"
                      color="gray.100"
                      border="none"
                      _placeholder={{ color: "gray.300" }}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <InputRightElement
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      paddingRight="10px"
                      pb={2}
                    >
                      <Icon as={CiSearch} color="gray.600" w={6} h={6} />
                    </InputRightElement>
                  </InputGroup>

                  {/* Search Dropdown */}
                  {isDropdownOpen && (
                    <SearchDropDown
                      ref={dropdownRef}
                      products={searchResults.products}
                      categories={searchResults.categories}
                      onClose={handleCloseDropdown}
                    />
                  )}
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
