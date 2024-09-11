import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FilterDrawerProps } from "../../types/propsTypes";
import { ProductFilters } from "../../components";

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  products,
  onFilterChange,
  isOpen,
  onClose,
}) => {
  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent w="100%">
          {/* <DrawerHeader borderBottomWidth="1px" bgColor="gray.700">
            <Flex align="center" justify="space-between"></Flex>
          </DrawerHeader> */}
          <DrawerBody>
            <Flex flexDirection="column" gap={2} w="100%">
              <>
                <VStack align="stretch" w={{ md: "17vw" }}>
                  <Link to="/store">
                    <Button
                      colorScheme="red"
                      variant="outline"
                      mt={4}
                      onClick={onClose}
                    >
                      Clear Filters
                    </Button>
                  </Link>
                  <ProductFilters
                    products={products}
                    onFilterChange={onFilterChange}
                  />
                </VStack>
              </>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
