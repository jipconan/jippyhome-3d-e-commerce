import { useState } from "react";
// import { useEffect } from "react";
// import { getCategoriesByType } from "../service/categories";
// import { getProductsByCategory } from "../service/products";
// import { Category, ProductsByCategory } from "../types/dataTypes";

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
      return null;
    }
    return null;
  };

  return { loading, setLoading, LoadingComponent };
}

// Delay function
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
