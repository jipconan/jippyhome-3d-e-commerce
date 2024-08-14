import React from "react";
import { Button } from "@chakra-ui/react";
import { Product } from "../../types/dataTypes";
import { formatArrayToStringWithLine } from "../../utils/PageUtils";

type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const materialOptions = formatArrayToStringWithLine(product.material);
  const colorOptions = formatArrayToStringWithLine(product.color);
  const productUrl = `http://localhost:5173/store/${product._id}`;

  return (
    <Button
      className="snipcart-add-item"
      data-item-id={product.public_id}
      data-item-name={product.name}
      data-item-price={product.price}
      data-item-url={productUrl}
      data-item-description={product.description}
      data-item-image={product.imageUrl[0]}
      data-item-custom1-name="material"
      data-item-custom1-options={materialOptions}
      data-item-custom2-name="color"
      data-item-custom2-options={colorOptions}
      bg="gray.500"
      color="gray.100"
      width="full"
      _hover={{ bg: "gray.700", color: "gray.300" }}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
