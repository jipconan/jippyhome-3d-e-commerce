import { FormControl, FormLabel, Input, Grid } from "@chakra-ui/react";
import * as Comps from "../..";
import { FormDataInfoProp } from "../../../types/dataTypes";

const Dimensions: React.FC<FormDataInfoProp> = ({
  formState,
  handleChange,
}) => (
  <Comps.BoxShadow>
    <FormControl id="dimensions" isRequired>
      <FormLabel>Dimensions</FormLabel>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <FormControl id="width">
          <FormLabel>Width</FormLabel>
          <Input
            type="number"
            name="dimensions.width"
            value={formState.dimensions?.width ?? ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="height">
          <FormLabel>Height</FormLabel>
          <Input
            type="number"
            name="dimensions.height"
            value={formState.dimensions?.height ?? ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="depth">
          <FormLabel>Depth</FormLabel>
          <Input
            type="number"
            name="dimensions.depth"
            value={formState.dimensions?.depth ?? ""}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
    </FormControl>
  </Comps.BoxShadow>
);

export default Dimensions;
