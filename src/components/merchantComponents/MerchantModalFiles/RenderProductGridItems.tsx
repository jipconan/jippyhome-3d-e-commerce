// src/components/ProductGridItems.tsx
import { GridItem, Image, Button } from "@chakra-ui/react";
import { Product } from "../../../types/dataTypes";
import { formatArrayToStringWithComma } from "../../../utils/formatUtils";

const gridItemStyle = {
  maxWidth: "150px",
  overflow: "auto",
  maxHeight: "full",
};

type RenderProductGridItemsProps = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onModel: () => void;
};

const RenderProductGridItems = ({
  product,
  onEdit,
  onDelete,
  onModel,
}: RenderProductGridItemsProps) => [
  <GridItem key={`${product._id}-public_id`} {...gridItemStyle}>
    {product.public_id}
  </GridItem>,

  <GridItem key={`${product._id}-image`} {...gridItemStyle}>
    <Image
      src={product.imageUrl[0]}
      alt={product.name}
      boxSize="100px"
      objectFit="cover"
    />
  </GridItem>,

  <GridItem key={`${product._id}-name`} {...gridItemStyle}>
    {product.name}
  </GridItem>,

  <GridItem key={`${product._id}-price`} {...gridItemStyle}>
    ${product.price.toFixed(2)}
  </GridItem>,

  <GridItem key={`${product._id}-stock`} {...gridItemStyle}>
    {product.stock}
  </GridItem>,

  <GridItem key={`${product._id}-dimensions`} {...gridItemStyle}>
    {product.dimensions ? (
      <>
        W: {product.dimensions.width} H: {product.dimensions.height} D:{" "}
        {product.dimensions.depth}
      </>
    ) : (
      "N/A"
    )}
  </GridItem>,

  <GridItem key={`${product._id}-material`} {...gridItemStyle}>
    {product.material.length > 0
      ? formatArrayToStringWithComma(product.material)
      : "N/A"}
  </GridItem>,

  <GridItem key={`${product._id}-color`} {...gridItemStyle}>
    {product.color.length > 0
      ? formatArrayToStringWithComma(product.color)
      : "N/A"}
  </GridItem>,

  <GridItem key={`${product._id}-modelUrl`} {...gridItemStyle}>
    {product.modelUrl ? (
      <Button
        bg="gray.500"
        color="gray.100"
        size="md"
        w="5vw"
        _hover={{ bg: "gray.700", color: "gray.300" }}
        onClick={onModel}
      >
        VIEW 3D
      </Button>
    ) : (
      "N/A"
    )}
  </GridItem>,

  <GridItem key={`${product._id}-edit`} {...gridItemStyle}>
    <Button
      bg="gray.500"
      color="gray.100"
      size="md"
      w="5vw"
      _hover={{ bg: "gray.700", color: "gray.300" }}
      onClick={onEdit}
    >
      UPDATE
    </Button>
  </GridItem>,

  <GridItem key={`${product._id}-delete`} {...gridItemStyle}>
    <Button colorScheme="red" size="md" w="5vw" onClick={onDelete}>
      DELETE
    </Button>
  </GridItem>,
];

export default RenderProductGridItems;
