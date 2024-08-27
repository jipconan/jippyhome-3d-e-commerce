import React, { RefObject } from "react";

// Defines the structure of a category with its details
export type Category = {
  _id: string;
  name: string;
  description: string;
  categoryType: string | null;
  level: number;
  parentId: string | null;
  landingPageImage: string;
  thumbnailImage: string;
  gridImages: string[];
  iconImage?: string;
  backgroundImage?: string;
};

// Represents a product with detailed information
export type Product = {
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  _id: string;
  public_id: string;
  name: string;
  description: string;
  price: number;
  roomCategory: string;
  furnitureCategory: string;
  subCategory: string;
  imageUrl: string[];
  stock: number;
  material: string[];
  color: string[];
  tags: string[];
  modelUrl: string;
};

export type ProductWithUrl = {
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  _id: string;
  public_id: string;
  name: string;
  description: string;
  price: number;
  roomCategory: string;
  furnitureCategory: string;
  subCategory: string;
  imageUrl: string[];
  stock: number;
  material: string[];
  color: string[];
  tags: string[];
  modelUrl: string;
  url?: string;
};

// Defines the structure of products organized by category and subcategory
export type ProductsByCategory = {
  [category: string]: {
    [subCategory: string]: Product[];
  };
};

// Defines the structure for TicketFormData
export type TicketFormData = {
  firstName: string;
  lastName: string;
  email: string;
  orderid?: string;
  message: string;
  date: Date;
};

export type UpdateFormData = {
  public_id?: string;
  name?: string;
  price?: number;
  description?: string;
  roomCategory?: string;
  furnitureCategory?: string;
  subCategory?: string;
  dimensions?: { width?: number; height?: number; depth?: number };
  imageUrl?: string[];
  stock?: number;
  material?: string;
  color?: string;
  tags?: string;
  modelUrl?: string;
  modelFile?: File | null;
  imageFile?: File[] | null;
};

export type FormDataInfoProp = {
  formState: UpdateFormData;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

export type FormDataFileProp = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
};
