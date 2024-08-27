import * as productsAPI from "../api/products";
import { Product, ProductWithUrl } from "../types/dataTypes";
import { Filters } from "../types/propsTypes";

// Fetches all products from the API and handles potential errors
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await productsAPI.getAllProducts();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Creates a new product and handles potential errors
export async function createProduct(
  product: Partial<Product>
): Promise<Product> {
  try {
    // console.log("service/product/createProduct product: ", product);
    const createdProduct = await productsAPI.createProduct(product);
    return createdProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// Updates an existing product and handles potential errors
export async function updateProduct(
  id: string,
  product: Partial<Product>
): Promise<Product> {
  try {
    // console.log("service/product/updateProduct product: ", product);
    const updatedProduct = await productsAPI.updateProduct(id, product);
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Deletes a product and handles potential errors
export async function deleteProduct(id: string): Promise<void> {
  try {
    // console.log("service/product/deleteProduct product: ", id);
    await productsAPI.deleteProduct(id);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Fetches a product by its ID and handles potential errors
export async function getProductById(id: string): Promise<Product> {
  try {
    0;
    const product = await productsAPI.getProductById(id);
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

// Fetches a product by its ID and handles potential errors
export async function getSnipcartProductById(
  id: string
): Promise<ProductWithUrl> {
  try {
    0;
    const product = await productsAPI.getSnipcartProductById(id);
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

// Fetches products by category ID and handles potential errors
export async function getProductsByCategory(param: string): Promise<Product[]> {
  try {
    const products = await productsAPI.getProductsByCategory(param);
    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}

export async function getProductsByFilters(
  filters: Filters
): Promise<Product[]> {
  try {
    // Call the API function with the filters
    const products = await getProductsByFilters(filters);
    return products;
  } catch (error) {
    console.error("Error fetching products by filters:", error);
    return [];
  }
}
