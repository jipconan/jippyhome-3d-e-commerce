import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Spinner, Text, Flex, Box } from "@chakra-ui/react";

// Hook to manage loading state
export function useLoading() {
  const [loading, setLoading] = useState<boolean>(true);

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

  const ErrorComponent = () => {
    if (error) {
      return <Text color="red.500">{error}</Text>;
    }
    return null;
  };

  return { error, setError, ErrorComponent };
}

// ScrollToTop
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
