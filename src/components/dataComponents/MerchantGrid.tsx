// src/components/MerchantGrid.tsx

import React, { useState } from "react";
import { Grid, GridItem, Box, Divider } from "@chakra-ui/react";
import { Product } from "../../types/dataTypes";
import { getColumnTemplate } from "../../utils/mathUtil";
import * as Comps from "../../components";
import * as Files from "../modalComponents/MerchantModalFiles";

const headerItems = [
  "public_id",
  "Image",
  "Name",
  "Price",
  "Stock",
  "Dimensions",
  "Material",
  "Color",
  "Model",
  "Update",
  "Delete",
];

const MerchantGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleModelClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModelModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsModelModalOpen(false);
    setSelectedProduct(null);
  };

  const numColumns = 11;
  const gridTemplate = getColumnTemplate(numColumns);

  return (
    <>
      <Grid templateColumns={gridTemplate} gap={4}>
        {headerItems.map((header) => (
          <GridItem key={header}>
            <strong>{header}</strong>
          </GridItem>
        ))}

        {products.map((product) => (
          <React.Fragment key={product._id}>
            <GridItem colSpan={numColumns}>
              <Box borderWidth="2px" borderRadius="md" boxShadow="sm">
                <Grid
                  templateColumns={gridTemplate}
                  gap={4}
                  alignItems="center"
                >
                  {Files.RenderProductGridItems({
                    product,
                    onEdit: () => handleEditClick(product),
                    onDelete: () => handleDeleteClick(product),
                    onModel: () => handleModelClick(product),
                  })}
                </Grid>
                <Divider orientation="horizontal" />
              </Box>
            </GridItem>
          </React.Fragment>
        ))}
      </Grid>

      {selectedProduct && (
        <Comps.MerchantUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseModals}
          product={selectedProduct}
        />
      )}

      {selectedProduct && (
        <Comps.MerchantDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseModals}
          id={selectedProduct._id}
        />
      )}

      {selectedProduct && (
        <Comps.ProductThreeModal
          isOpen={isModelModalOpen}
          onClose={handleCloseModals}
          modelUrl={selectedProduct.modelUrl}
        />
      )}
    </>
  );
};

export default MerchantGrid;
