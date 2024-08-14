import { useState, useEffect, useRef } from "react";
import {
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  FormLabel,
} from "@chakra-ui/react";
import { updateProduct } from "../../service/products";
import { uploadImage } from "../../service/cloudinary";
import { Product, UpdateFormData } from "../../types/dataTypes";
import * as Files from "./MerchantModalFiles";
import * as Comps from "../";

type MerchantUpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
};

const MerchantUpdateModal: React.FC<MerchantUpdateModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [formState, setFormState] = useState<UpdateFormData>({
    public_id: product.public_id || "",
    name: product.name || "",
    price: product.price || 0,
    description: product.description || "",
    roomCategory: product.roomCategory || "",
    furnitureCategory: product.furnitureCategory || "",
    subCategory: product.subCategory || "",
    dimensions: {
      width: product.dimensions?.width ?? 0,
      height: product.dimensions?.height ?? 0,
      depth: product.dimensions?.depth ?? 0,
    },
    imageUrl: product.imageUrl || [],
    stock: product.stock || 0,
    material: product.material.join(", ") || "",
    color: product.color.join(", ") || "",
    tags: product.tags.join(", ") || "",
    modelUrl: product.modelUrl || "",
    file: null,
    imageFile: null,
    modelFile: null,
  });

  const [load, setLoad] = useState(false);
  const modelFileInputRef = useRef<HTMLInputElement | null>(null);
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFormState({
      public_id: product.public_id,
      name: product.name,
      price: product.price,
      description: product.description,
      roomCategory: product.roomCategory,
      furnitureCategory: product.furnitureCategory,
      subCategory: product.subCategory,
      dimensions: product.dimensions || { width: 0, height: 0, depth: 0 },
      imageUrl: product.imageUrl,
      stock: product.stock,
      material: product.material.join(", "),
      color: product.color.join(", "),
      tags: product.tags.join(", "),
      modelUrl: product.modelUrl,
      file: null,
      imageFile: null,
      modelFile: null,
    });
  }, [product]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, files } = event.target as HTMLInputElement;

    if (type === "file" && files) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else if (type === "number") {
      if (name.startsWith("dimensions.")) {
        const dimensionKey = name.split(".")[1];
        setFormState((prevState) => ({
          ...prevState,
          dimensions: {
            ...prevState.dimensions,
            [dimensionKey]: parseFloat(value),
          },
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          [name]: parseFloat(value),
        }));
      }
    } else if (["material", "color", "tags"].includes(name)) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value ? value.split(",").map((item) => item.trim()) : [],
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    }
  };

  const handleLoad = () => setLoad(true);
  const handleStopLoad = () => setLoad(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      handleLoad();

      let imageUrl = formState.imageUrl || [];
      let modelUrl = formState.modelUrl || "";

      const folderPath = `${formState.furnitureCategory || ""}/${formState.subCategory || ""}`;

      if (formState.imageFile) {
        const uploadResult = await uploadImage(formState.imageFile, folderPath);
        imageUrl = [uploadResult];
      }

      if (formState.modelFile) {
        const uploadResult = await uploadImage(formState.modelFile, folderPath);
        modelUrl = uploadResult;
      }

      const dimensions = formState.dimensions
        ? {
            width: formState.dimensions.width || 0,
            height: formState.dimensions.height || 0,
            depth: formState.dimensions.depth || 0,
          }
        : {
            width: 0,
            height: 0,
            depth: 0,
          };

      const material = formState.material
        ? formState.material.split(",").map((item) => item.trim())
        : [];
      const color = formState.color
        ? formState.color.split(",").map((item) => item.trim())
        : [];
      const tags = formState.tags
        ? formState.tags.split(",").map((item) => item.trim())
        : [];

      const updatedData: Partial<Product> = {
        ...formState,
        imageUrl,
        modelUrl,
        dimensions,
        public_id: formState.public_id,
        material,
        color,
        tags,
      };

      await updateProduct(product._id, updatedData);

      handleStopLoad();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      handleStopLoad();
    }
  };

  const [isProductThreeModalOpen, setIsProductThreeModalOpen] = useState(false);
  const [isUploadProductThreeModalOpen, setUploadIsProductThreeModalOpen] =
    useState(false);

  const handleOpenProductThreeModal = () => {
    setIsProductThreeModalOpen(true);
  };

  const handleCloseProductThreeModal = () => {
    setIsProductThreeModalOpen(false);
  };

  const handleOpenUploadProductThreeModal = () => {
    setUploadIsProductThreeModalOpen(true);
  };

  const handleCloseUploadProductThreeModal = () => {
    setUploadIsProductThreeModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="90vw" maxH="100vh" p={4}>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
                {/* Row 1 */}
                <Files.ProductInfo
                  formState={formState}
                  handleChange={handleChange}
                />

                <Files.Dimensions
                  formState={formState}
                  handleChange={handleChange}
                />

                <Files.PriceStock
                  formState={formState}
                  handleChange={handleChange}
                />

                {/* Row 2 */}
                <Files.MaterialColorTags
                  formState={formState}
                  handleChange={handleChange}
                />

                <Files.DescriptionInfo
                  formState={formState}
                  handleChange={handleChange}
                />

                <Comps.BoxShadow>
                  <GridItem>
                    <Stack spacing={4}>
                      <FormLabel>Images Preview</FormLabel>
                      <Files.ImageExistingPreview
                        imageUrls={formState.imageUrl}
                      />
                      <FormLabel>3D Model Preview</FormLabel>
                      <Button
                        bg="gray.500"
                        color="gray.100"
                        size="md"
                        w="5vw"
                        _hover={{ bg: "gray.700", color: "gray.300" }}
                        onClick={handleOpenProductThreeModal}
                      >
                        VIEW 3D
                      </Button>
                    </Stack>
                  </GridItem>
                </Comps.BoxShadow>

                <Comps.BoxShadow>
                  <GridItem>
                    <Stack spacing={4}>
                      <Files.ModelUpload
                        handleChange={handleChange}
                        fileInputRef={modelFileInputRef}
                      />

                      <Files.ImageUpload
                        handleChange={handleChange}
                        fileInputRef={imageFileInputRef}
                      />
                    </Stack>
                  </GridItem>
                </Comps.BoxShadow>

                <Comps.BoxShadow>
                  <GridItem>
                    <Stack spacing={4}>
                      <FormLabel>Images Upload</FormLabel>
                      <Files.ImageUploadPreview fileRef={imageFileInputRef} />
                      <FormLabel>3D Model Upload</FormLabel>
                      <Button
                        bg="gray.500"
                        color="gray.100"
                        size="md"
                        w="5vw"
                        _hover={{ bg: "gray.700", color: "gray.300" }}
                        onClick={handleOpenUploadProductThreeModal}
                      >
                        VIEW 3D
                      </Button>
                    </Stack>
                  </GridItem>
                </Comps.BoxShadow>
              </Grid>

              <Stack mt={4}>
                <Button
                  type="submit"
                  isLoading={load}
                  loadingText="Updating"
                  bg="gray.500"
                  color="gray.100"
                  width="full"
                  _hover={{ bg: "gray.700", color: "gray.300" }}
                >
                  Update
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Comps.ProductThreeModal
        isOpen={isProductThreeModalOpen}
        onClose={handleCloseProductThreeModal}
        modelUrl={product.modelUrl}
      />
      <Comps.ProductThreeModal
        isOpen={isUploadProductThreeModalOpen}
        onClose={handleCloseUploadProductThreeModal}
        modelUrl={
          formState.modelFile ? URL.createObjectURL(formState.modelFile) : ""
        }
      />
    </>
  );
};

export default MerchantUpdateModal;
