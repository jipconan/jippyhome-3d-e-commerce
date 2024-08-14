import { useState } from "react";
import { Product } from "../types/dataTypes";
import { PaginationResultProps } from "../types/propsTypes";

export const usePagination = (
  products: Product[],
  itemsPerPage: number = 8
): PaginationResultProps => {
  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate the total number of pages based on the number of products and items per page
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get the products to be displayed on the current page
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    currentProducts,
    handlePageChange,
  };
};
