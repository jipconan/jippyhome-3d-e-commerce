import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";
import { Subcategory } from "../types/categoryTypes";

// Function to map subcategories to JSX elements
export const MapSubcategories = (
  subcategories: Subcategory[],
  categoryName: string
): React.ReactNode => {
  return (
    <>
      {/* Iterate over each subcategory */}
      {subcategories.map((subcategory) => (
        <Box key={subcategory._id} mb={2}>
          {/* Display subcategory name if category is not "Decors" or "Spaces" */}
          {categoryName !== "Decors" && categoryName !== "Spaces" && (
            <Text fontSize="md" fontWeight="bold" mb={2}>
              {subcategory.name}
            </Text>
          )}
          {subcategory.subcategories ? (
            subcategory.subcategories.map((subSubcategory) => (
              <Box key={subSubcategory._id}>
                <Link
                  href={`/store/${subSubcategory.name}`}
                  _hover={{ textDecoration: "underline" }}
                >
                  <Text fontSize="sm" mb={1}>
                    {subSubcategory.name}
                  </Text>
                </Link>
              </Box>
            ))
          ) : (
            <Box key={subcategory._id}>
              <Link
                href={`/store/${subcategory.name}`}
                _hover={{ textDecoration: "underline" }}
              >
                <Text>{subcategory.name}</Text>
              </Link>
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};
