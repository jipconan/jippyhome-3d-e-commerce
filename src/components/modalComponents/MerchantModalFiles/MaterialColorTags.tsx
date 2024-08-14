import { FormControl, FormLabel, Input, GridItem } from "@chakra-ui/react";
import * as Comps from "../..";
import { FormDataInfoProp } from "../../../types/dataTypes";

const MaterialColorTags: React.FC<FormDataInfoProp> = ({
  formState,
  handleChange,
}) => (
  <>
    <Comps.BoxShadow>
      <GridItem colSpan={1}>
        <FormControl id="material" isRequired>
          <FormLabel>Materials (use commas for more than one)</FormLabel>
          <Input
            type="text"
            name="material"
            placeholder="Enter materials separated by commas"
            value={formState.material}
            onChange={handleChange}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl id="color" isRequired>
          <FormLabel>Colors (use commas for more than one)</FormLabel>
          <Input
            type="text"
            name="color"
            placeholder="Enter colors separated by commas"
            value={formState.color}
            onChange={handleChange}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl id="tags" isRequired>
          <FormLabel>Tags (use commas for more than one)</FormLabel>
          <Input
            type="text"
            name="tags"
            placeholder="Enter tags separated by commas"
            value={formState.tags}
            onChange={handleChange}
          />
        </FormControl>
      </GridItem>
    </Comps.BoxShadow>
  </>
);

export default MaterialColorTags;
