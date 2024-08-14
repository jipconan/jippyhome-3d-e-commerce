import React, { useState, useEffect } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

type ImageUploadPreviewProps = {
  fileRef: React.RefObject<HTMLInputElement>; // Reference to the file input
};

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({ fileRef }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const fileInput = fileRef.current;

    if (fileInput) {
      const handleFiles = () => {
        const files = Array.from(fileInput.files || []);
        const newImagePreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(newImagePreviews);
      };

      fileInput.addEventListener("change", handleFiles);

      return () => {
        fileInput.removeEventListener("change", handleFiles);
        imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [fileRef, imagePreviews]);

  if (imagePreviews.length === 0) {
    return (
      <>
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
          <Text>No images uploaded</Text>
        </Box>
      </>
    );
  }

  return (
    <>
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
        {imagePreviews.map((url, index) => (
          <Image
            src={url}
            alt={`Upload preview ${index}`}
            boxSize="100px"
            key={index}
          />
        ))}
      </Box>
    </>
  );
};

export default ImageUploadPreview;
