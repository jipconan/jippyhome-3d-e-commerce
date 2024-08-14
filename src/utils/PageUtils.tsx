import { useState } from "react";
// import { useEffect } from "react";
// import { getCategoriesByType } from "../service/categories";
// import { getProductsByCategory } from "../service/products";
// import { Category, ProductsByCategory } from "../types/dataTypes";

// format array into strings join with |
export const formatArrayToStringWithLine = (items: string[]): string => {
  return items.map((item) => `${item}`).join(" | ");
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

// Hook to fetch products by category
// export const useProductsByCategory = (
//   categoryType: string,
//   delayTime: number = 1000
// ) => {
//   const { setLoading, LoadingComponent } = useLoading();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [productsByCategory, setProductsByCategory] =
//     useState<ProductsByCategory>({});

//   // Fetch categories and products
//   const fetchCategoriesAndProducts = async () => {
//     try {
//       // Fetch categories by type
//       const allCategories = await getCategoriesByType(categoryType);
//       setCategories(allCategories);

//       const newProductsByCategory: ProductsByCategory = {};

//       for (const category of allCategories) {
//         newProductsByCategory[category._id] = await getProductsByCategory(
//           category._id
//         );
//         await delay(delayTime);
//       }

//       setProductsByCategory(newProductsByCategory);
//       console.log(
//         "categoryType, newProductsByCategory:",
//         categoryType,
//         newProductsByCategory
//       );
//     } catch (error) {
//       console.error("Error fetching categories or products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategoriesAndProducts();
//   }, [categoryType, delayTime]);

//   return { categories, productsByCategory, LoadingComponent };
// };
