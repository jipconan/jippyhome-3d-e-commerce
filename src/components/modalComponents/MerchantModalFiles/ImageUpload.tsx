import { FormControl, FormLabel, Input, GridItem } from "@chakra-ui/react";
import { FormDataFileProp } from "../../../types/dataTypes";
import * as Comps from "../..";

const ImageUpload: React.FC<FormDataFileProp> = ({
  handleChange,
  fileInputRef,
}) => (
  <Comps.BoxShadow>
    <GridItem colSpan={1}>
      <FormControl id="imageUrl" textAlign="center">
        <FormLabel color="orange.600">Upload Images (PNG or JPEG)</FormLabel>
        <Input
          type="file"
          name="imageFile"
          accept=".png, .jpg, .jpeg"
          onChange={handleChange}
          ref={fileInputRef}
          multiple
        />
      </FormControl>
    </GridItem>
  </Comps.BoxShadow>
);

export default ImageUpload;
