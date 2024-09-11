import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as Comps from "..";

const ProductThreeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  modelUrl: string;
}> = ({ isOpen, onClose, modelUrl }) => {
  // Responsive size for the modal content
  const modalSize = useBreakpointValue({
    base: "full",
    md: "full",
    lg: "3xl",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent
        maxW={{ base: "100%", md: "100%", lg: "75vw" }}
        maxH={{ base: "100%", md: "100%", lg: "90vh" }}
        overflow="hidden"
      >
        <ModalHeader>3D Model Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modelUrl ? (
            <Comps.ProductCanvas modelUrl={modelUrl} />
          ) : (
            <Flex align="center" justify="center" h="full">
              <Text fontSize="lg" color="gray.500">
                3D Model Unavailable
              </Text>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductThreeModal;
