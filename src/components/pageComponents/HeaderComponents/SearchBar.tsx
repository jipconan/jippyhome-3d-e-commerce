// SearchBar.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { searchItems } from "../../../utils/queryUtils";
import SearchDropDown from "./SearchDropDown";
import { Product, Category } from "../../../types/dataTypes";

interface SearchBarProps {
  products: Product[];
  categories: Category[];
}

const SearchBar: React.FC<SearchBarProps> = ({ products, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{
    products: Product[];
    categories: Category[];
  }>({ products: [], categories: [] });
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <Box
      position="relative"
      bg="gray.500"
      borderRadius="20px"
      p={1}
      width={{ base: "90vw", md: "98vw", lg: "30vw" }}
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
  );
};

export default SearchBar;
