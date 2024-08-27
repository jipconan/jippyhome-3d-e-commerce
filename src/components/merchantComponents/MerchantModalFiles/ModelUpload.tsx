import { FormControl, FormLabel, Input, GridItem } from "@chakra-ui/react";
import { FormDataFileProp } from "../../../types/dataTypes";
import * as Comps from "../..";

const ModelUpload: React.FC<FormDataFileProp> = ({
  handleChange,
  fileInputRef,
}) => (
  <Comps.BoxShadow>
    <GridItem colSpan={1}>
      <FormControl id="modelUrl" textAlign="center">
        <FormLabel color="orange.600">Upload Model (GLB)</FormLabel>
        <Input
          type="file"
          name="modelFile"
          accept=".glb"
          onChange={handleChange}
          ref={fileInputRef}
        />
      </FormControl>
    </GridItem>
  </Comps.BoxShadow>
);

export default ModelUpload;
