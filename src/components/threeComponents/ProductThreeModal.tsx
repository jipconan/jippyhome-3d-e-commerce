import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
} from "@chakra-ui/react";
import * as Comps from "..";

const ProductThreeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  modelUrl: string;
}> = ({ isOpen, onClose, modelUrl }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="1xl">
      <ModalOverlay />
      <ModalContent sx={{ width: "75vw", height: "85vh" }}>
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
