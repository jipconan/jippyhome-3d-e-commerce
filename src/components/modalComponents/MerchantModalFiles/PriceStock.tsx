import { FormControl, FormLabel, Input, Grid } from "@chakra-ui/react";
import * as Comps from "../..";
import { FormDataInfoProp } from "../../../types/dataTypes";

const PriceStock: React.FC<FormDataInfoProp> = ({
  formState,
  handleChange,
}) => (
  <Comps.BoxShadow>
    <FormControl id="price-stock" isRequired>
      <FormLabel>Price & Stock</FormLabel>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl id="price">
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            name="price"
            value={formState.price}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="stock">
          <FormLabel>Stock</FormLabel>
          <Input
            type="number"
            name="stock"
            value={formState.stock}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
    </FormControl>
  </Comps.BoxShadow>
);

export default PriceStock;
