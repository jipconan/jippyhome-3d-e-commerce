import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { deleteProduct } from "../../service/products";

type MerchantDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const MerchantDeleteModal: React.FC<MerchantDeleteModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  const [load, setLoad] = useState(false);

  const handleLoad = () => setLoad(true);
  const handleStopLoad = () => setLoad(false);

  const onDelete = async () => {
    try {
      handleLoad();
      await deleteProduct(id);
      handleStopLoad();
      onClose();
    } catch (error) {
      console.error("Error deleting product or image:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this product?</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="orange"
            mr={3}
            onClick={onClose}
            w={20}
          >
            Close
          </Button>
          <Button
            variant="solid"
            colorScheme="red"
            onClick={onDelete}
            w={20}
            isLoading={load}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MerchantDeleteModal;
