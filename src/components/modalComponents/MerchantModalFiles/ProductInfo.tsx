import { FormControl, FormLabel, Input, Grid } from "@chakra-ui/react";
import * as Comps from "../..";
import { FormDataInfoProp } from "../../../types/dataTypes";

const ProductInfo: React.FC<FormDataInfoProp> = ({
  formState,
  handleChange,
}) => (
  <Comps.BoxShadow>
    <FormControl id="dimensions" isRequired>
      <FormLabel>Product Info</FormLabel>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl id="width">
          <FormLabel>public_id</FormLabel>
          <Input
            type="string"
            name="public_id"
            value={formState.public_id}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="height">
          <FormLabel>Product name</FormLabel>
          <Input
            type="string"
            name="name"
            data-dimension="height"
            value={formState.name}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
    </FormControl>
  </Comps.BoxShadow>
);

export default ProductInfo;
