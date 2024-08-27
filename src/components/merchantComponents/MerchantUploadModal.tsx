import { useState, useRef } from "react";
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
import { createProduct } from "../../service/products";
import { uploadImage, uploadModel } from "../../service/cloudinary";
import { Product, UpdateFormData } from "../../types/dataTypes";
import * as Files from "./MerchantModalFiles";
import * as Comps from "..";

type MerchantUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MerchantUploadModal: React.FC<MerchantUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formState, setFormState] = useState<UpdateFormData>({
    public_id: "",
    name: "",
    price: 0,
    description: "",
    roomCategory: "",
    furnitureCategory: "",
    subCategory: "",
    dimensions: { width: 0, height: 0, depth: 0 },
    imageUrl: [],
    stock: 0,
    material: "",
    color: "",
    tags: "",
    modelUrl: "",
    imageFile: [],
    modelFile: null,
  });

  const [load, setLoad] = useState(false);
  const modelFileInputRef = useRef<HTMLInputElement | null>(null);
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, files } = event.target as HTMLInputElement;

    if (type === "file" && files) {
      if (name === "imageFile") {
        setFormState((prevState) => ({
          ...prevState,
          imageFile: Array.from(files),
        }));
      } else if (name === "modelFile") {
        setFormState((prevState) => ({
          ...prevState,
          modelFile: files[0] || null,
        }));
      }
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
        [name]: value,
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

      // Initialize variables
      let imageUrl: string[] = [];
      let modelUrl = "";

      // Construct the folder path
      const folderPath = `${formState.furnitureCategory || ""}/${formState.subCategory || ""}`;

      // Upload the image files if present
      if (formState.imageFile && formState.imageFile.length > 0) {
        const uploadResults = await uploadImage(
          formState.imageFile,
          folderPath
        );
        imageUrl = uploadResults;
      }

      // Upload the model file if present
      if (formState.modelFile) {
        const uploadResult = await uploadModel(formState.modelFile, folderPath);
        modelUrl = uploadResult;
      }

      // Ensure dimensions are fully defined
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

      // Convert comma-separated strings to arrays
      const material = formState.material
        ? formState.material.split(",").map((item) => item.trim())
        : [];
      const color = formState.color
        ? formState.color.split(",").map((item) => item.trim())
        : [];
      const tags = formState.tags
        ? formState.tags.split(",").map((item) => item.trim())
        : [];

      // Prepare data for creation
      const newProductData: Omit<Product, "_id"> = {
        public_id: formState.public_id || "",
        name: formState.name || "",
        price: formState.price || 0,
        description: formState.description || "",
        roomCategory: formState.roomCategory || "",
        furnitureCategory: formState.furnitureCategory || "",
        subCategory: formState.subCategory || "",
        dimensions,
        imageUrl,
        stock: formState.stock || 0,
        material,
        color,
        tags,
        modelUrl,
      };

      // Log the final state before creating
      console.log("New Product Data:", newProductData);

      // Create the new product
      await createProduct(newProductData);

      handleStopLoad();
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
      handleStopLoad();
    }
  };

  const [isUploadProductThreeModalOpen, setUploadIsProductThreeModalOpen] =
    useState(false);

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
          <ModalHeader>Create New Product</ModalHeader>
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

                {/* Insert the CategoryInfo component here */}
                <Comps.BoxShadow>
                  <Files.CategoryInfo
                    roomCategory={formState.roomCategory}
                    furnitureCategory={formState.furnitureCategory}
                    subCategory={formState.subCategory}
                    handleChange={handleChange}
                  />
                </Comps.BoxShadow>

                <Comps.BoxShadow>
                  <GridItem>
                    <Stack spacing={4}>
                      <Files.ImageUpload
                        handleChange={handleChange}
                        fileInputRef={imageFileInputRef}
                      />

                      <Files.ModelUpload
                        handleChange={handleChange}
                        fileInputRef={modelFileInputRef}
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
                  loadingText="Creating"
                  bg="gray.500"
                  color="gray.100"
                  width="full"
                  _hover={{ bg: "gray.700", color: "gray.300" }}
                >
                  Create
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

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

export default MerchantUploadModal;
