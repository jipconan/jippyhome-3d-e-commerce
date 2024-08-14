import { getToken, getUserIdFromToken } from "../utils/security";
import { Product, ProductsByCategory } from "../types/dataTypes";

const BASE_URL = "http://localhost:3000/products";

// Fetches all products from the backend.
export async function getAllProducts(): Promise<Product[]> {
  const url = BASE_URL;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
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

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...product, user_id: user }),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to create product. Please try again.");
    }
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// Updates an existing product by its ID.
export async function updateProduct(
  id: string,
  product: Partial<Product>
): Promise<Product> {
  const url = `${BASE_URL}/updateproduct/${id}`;

  try {
    const token = getToken();
    const user = getUserIdFromToken();

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...product, user_id: user }),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to update product. Please try again.");
    }
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Deletes a product by its ID.
export async function deleteProduct(id: string): Promise<void> {
  const url = `${BASE_URL}/deleteproduct/${id}`;

  try {
    const token = getToken();
    const user = getUserIdFromToken();

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, user_id: user }),
    });

    if (response.ok) {
      return;
    } else {
      throw new Error("Failed to delete product. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Retrieves a product by its ID.
export async function getProductById(id: string): Promise<Product> {
  const url = `${BASE_URL}/${id}`;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to fetch product by ID. Please try again later.");
  }
}

// Fetches products belonging to a specific category.
export async function getProductsByCategory(
  id: string
): Promise<ProductsByCategory> {
  const url = `${BASE_URL}/type/${id}`;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(
      "Failed to fetch products by category. Please try again later."
    );
  }
}
