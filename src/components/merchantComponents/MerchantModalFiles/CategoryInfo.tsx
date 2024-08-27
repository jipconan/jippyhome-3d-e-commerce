import React, { useState, useEffect } from "react";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import { getCategoriesByLevel } from "../../../service/categories";
import { Category } from "../../../types/dataTypes";

type CategoryInfoProps = {
  roomCategory?: string;
  furnitureCategory?: string;
  subCategory?: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CategoryInfo: React.FC<CategoryInfoProps> = ({
  roomCategory,
  furnitureCategory,
  subCategory,
  handleChange,
}) => {
  const [level0Categories, setLevel0Categories] = useState<Category[]>([]);
  const [level1Categories, setLevel1Categories] = useState<Category[]>([]);
  const [level2Categories, setLevel2Categories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories on mount
    const fetchCategories = async () => {
      try {
        const level0 = await getCategoriesByLevel(0);
        const level1 = await getCategoriesByLevel(1);
        const level2 = await getCategoriesByLevel(2);
        setLevel0Categories(level0);
        setLevel1Categories(level1);
        setLevel2Categories(level2);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {/* Room Category Select */}
      <FormControl>
        <FormLabel htmlFor="roomCategory">Room Category</FormLabel>
        <Select
          id="roomCategory"
          name="roomCategory"
          value={roomCategory || ""}
          onChange={handleChange}
          placeholder="Select a Room Category"
        >
          {level0Categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Furniture Category Select */}
      <FormControl mt={4}>
        <FormLabel htmlFor="furnitureCategory">Furniture Category</FormLabel>
        <Select
          id="furnitureCategory"
          name="furnitureCategory"
          value={furnitureCategory || ""}
          onChange={handleChange}
          placeholder="Select a Furniture Category"
        >
          {level1Categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Sub Category Select */}
      <FormControl mt={4}>
        <FormLabel htmlFor="subCategory">Sub Category</FormLabel>
        <Select
          id="subCategory"
          name="subCategory"
          value={subCategory || ""}
          onChange={handleChange}
          placeholder="Select a Sub Category"
        >
          {level2Categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategoryInfo;
