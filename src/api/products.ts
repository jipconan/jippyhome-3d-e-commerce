import axios from "axios";
import { getToken, getUserIdFromToken } from "../utils/security";
import { Product, ProductWithUrl } from "../types/dataTypes";
import { Filters } from "../types/propsTypes";

// const BASE_URL = "http://localhost:3000/products";
// const BASE_URL = "https://jippy.home.ngrok.app/products";
const BASE_URL =
  "https://jippyhome-be-node-express-mongodb.onrender.com/products";

// Fetches all products from the backend.
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(BASE_URL);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products. Please try again later.");
  }
}

// Creates a new product with the given details.
export async function createProduct(
  product: Partial<Product>
): Promise<Product> {
  try {
    const token = getToken();
    const user = getUserIdFromToken();
    const url = `${BASE_URL}/createproduct`;

    const response = await axios.post<Product>(
      url,
      { ...product, user_id: user },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product. Please try again.");
  }
}

// Updates an existing product by its ID.
export async function updateProduct(
  id: string,
  product: Partial<Product>
): Promise<Product> {
  try {
    const token = getToken();
    const user = getUserIdFromToken();
    const url = `${BASE_URL}/updateproduct/${id}`;

    console.log(token);

    const response = await axios.put<Product>(
      url,
      { ...product, user_id: user },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product. Please try again.");
  }
}

// Deletes a product by its ID.
export async function deleteProduct(id: string): Promise<void> {
  try {
    const token = getToken();
    const user = getUserIdFromToken();
    const url = `${BASE_URL}/deleteproduct/${id}`;

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id, user_id: user },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product. Please try again.");
  }
}

// Retrieves a product by its ID.
export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await axios.get<Product>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    throw new Error("Failed to fetch product by ID. Please try again later.");
  }
}

// Retrieves a Snipcart product by its ID.
export async function getSnipcartProductById(
  id: string
): Promise<ProductWithUrl> {
  try {
    const response = await axios.get<ProductWithUrl>(`${BASE_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    throw new Error("Failed to fetch product by ID. Please try again later.");
  }
}

// Fetches products belonging to a specific category.
export async function getProductsByCategory(param: string): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${BASE_URL}/type/${param}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    throw new Error(
      "Failed to fetch products by category. Please try again later."
    );
  }
}

// Fetches products based on multiple filters.
export async function getProductsByFiltersApi(
  filters: Filters
): Promise<Product[]> {
  try {
    // Convert filters object to query string
    const queryString = Object.entries(filters)
      .map(([key, value]) => {
        // Ensure the value is a valid type
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
        ) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        // Skip or handle invalid values if necessary
        return null;
      })
      .filter((entry): entry is string => entry !== null)
      .join("&");

    const response = await axios.get<Product[]>(`${BASE_URL}?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by filters from API:", error);
    throw new Error(
      "Failed to fetch products by filters. Please try again later."
    );
  }
}
