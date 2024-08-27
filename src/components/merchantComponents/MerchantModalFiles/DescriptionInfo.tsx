import { FormControl, FormLabel, Textarea, GridItem } from "@chakra-ui/react";
import * as Comps from "../..";
import { FormDataInfoProp } from "../../../types/dataTypes";

const DescriptionInfo: React.FC<FormDataInfoProp> = ({
  formState,
  handleChange,
}) => (
  <>
    <Comps.BoxShadow>
      <GridItem colSpan={1}>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            minHeight="20vh"
          />
        </FormControl>
      </GridItem>
    </Comps.BoxShadow>
  </>
);

export default DescriptionInfo;
