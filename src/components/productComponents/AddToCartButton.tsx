import React from "react";
import { Button } from "@chakra-ui/react";
import { Product } from "../../types/dataTypes";
import { formatArrayToStringWithPipe } from "../../utils/formatUtils";
import { User } from "../../types/propsTypes";

type AddToCartButtonProps = {
  product: Product;
  user: User;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, user }) => {
  const materialOptions = formatArrayToStringWithPipe(product.material);
  const colorOptions = formatArrayToStringWithPipe(product.color);
  const productUrl = `https://jippyhome-be-node-express-mongodb.onrender.com/products/id/${product._id}`;

  return (
    <Button
      // onClick={handleClick}
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
      data-item-custom3-name="userId"
      data-item-custom3-options={user}
      bg="gray.600"
      color="gray.100"
      width="full"
      _hover={{ bg: "gray.800", color: "gray.200" }}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
