import { useState } from "react";
import { Spinner, Text, Flex, Box } from "@chakra-ui/react";

// format array into strings join with |
export const formatArrayToStringWithPipe = (items: string[]): string => {
  return items.join("|");
};

// format array into strings join with |
export const formatArrayToStringWithComma = (items: string[]): string => {
  return items.map((item) => `${item}`).join(", ");
};
// Hook to manage loading state
export function useLoading() {
  const [loading, setLoading] = useState<boolean>(true);

  // Component to show during loading
  const LoadingComponent = () => {
    if (loading) {
      return (
        <Box h="80vh">
          <Flex align="center" justify="center" height="full">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="gray.500"
              size="xl"
            />
          </Flex>
        </Box>
      );
    }
    return null;
  };

  return { loading, setLoading, LoadingComponent };
}

// Hook to manage error state
export function useError() {
  const [error, setError] = useState<string | null>(null);

  // Component to show during error
  const ErrorComponent = () => {
    if (error) {
      return <Text color="red.500">{error}</Text>;
    }
    return null;
  };

  return { error, setError, ErrorComponent };
}

// Delay function
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const capitalizeWords = (text: string): string => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
