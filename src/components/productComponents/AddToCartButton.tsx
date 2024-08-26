import React from "react";
import { Button } from "@chakra-ui/react";
import { Product } from "../../types/dataTypes";
import { formatArrayToStringWithPipe } from "../../utils/PageUtils";
import { User } from "../../types/propsTypes";

type AddToCartButtonProps = {
  product: Product;
  user: User;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, user }) => {
  const materialOptions = formatArrayToStringWithPipe(product.material);
  const colorOptions = formatArrayToStringWithPipe(product.color);
  const productUrl = `https://jippyhome-be-node-express-mongodb.onrender.com/products/id/${product._id}`;

  const handleClick = () => {
    // Create JSON object to log
    const productData = {
      id: product.public_id,
      name: product.name,
      price: product.price,
      url: productUrl,
      description: product.description,
      image: product.imageUrl[0],
      customFields: [
        {
          name: "material",
          options: materialOptions,
        },
        {
          name: "color",
          options: colorOptions,
        },
        { name: "userId", options: user },
      ],
    };

    // Log JSON data to console
    console.log(JSON.stringify(productData, null, 2));
  };

  return (
    <Button
      onClick={handleClick}
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
