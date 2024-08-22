import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Product } from "../types/dataTypes"; // Ensure this path is correct

// Define the base URL
const BASE_URL =
  "https://jippyhome-be-node-express-mongodb.onrender.com/products/id";

const ProductJsonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await axios.get<Product>(`${BASE_URL}/${id}`);
          setProduct(response.data);
        } catch (error) {
          setError("Failed to fetch product data.");
          console.error("Error fetching product data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Product Data</h1>
      <pre>
        <code>{JSON.stringify(product, null, 2)}</code>
      </pre>
    </div>
  );
};

export default ProductJsonPage;
