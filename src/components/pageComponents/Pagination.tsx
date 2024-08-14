import { Box, Button } from "@chakra-ui/react";

// Define the type for pagination props
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Handle clicking the "previous" button
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Handle clicking the "next" button
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box margin={4} display="flex" justifyContent="center" alignItems="center">
      {/* Button for previous page */}
      <Button
        onClick={handlePrevPage}
        isDisabled={currentPage === 1}
        marginX={1}
        variant="outline"
      >
        &lt;
      </Button>

      {/* Buttons for each page number */}
      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i}
          onClick={() => onPageChange(i + 1)}
          marginX={1}
          variant={currentPage === i + 1 ? "solid" : "outline"}
          colorScheme={currentPage === i + 1 ? "red" : "gray"}
        >
          {i + 1}
        </Button>
      ))}

      {/* Button for next page */}
      <Button
        onClick={handleNextPage}
        isDisabled={currentPage === totalPages}
        marginX={1}
        variant="outline"
      >
        &gt;
      </Button>
    </Box>
  );
};

export default Pagination;
