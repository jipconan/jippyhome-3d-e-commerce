import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

type ImageExistingPreviewProps = {
  imageUrls: string[];
};

const ImageExistingPreview: React.FC<ImageExistingPreviewProps> = ({
  imageUrls,
}) => {
  if (imageUrls.length === 0) {
    return (
      <Box
        display="flex"
        overflowX="auto"
        overflowY="auto"
        whiteSpace="nowrap"
        p={2}
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        maxH="200px"
        width="100%"
        gap={4}
      >
        <Text>No existing images</Text>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      overflowX="auto"
      overflowY="auto"
      whiteSpace="nowrap"
      p={2}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      maxH="200px"
      width="100%"
      gap={4}
    >
      {imageUrls.map((url, index) => (
        <Image
          src={url}
          alt={`Existing image ${index}`}
          objectFit="cover"
          boxSize="100px"
          key={index}
        />
      ))}
    </Box>
  );
};

export default ImageExistingPreview;
