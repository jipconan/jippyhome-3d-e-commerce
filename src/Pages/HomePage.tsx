import React from "react";
import { Button, Stack, Image, Box, Center, Link } from "@chakra-ui/react";
import * as Comps from "../components";
import { homePageCategoryContent } from "../constants/categoriesContents";

const HomePage: React.FC = () => {
  // Styles for the elements
  const elementStyle = {
    width: "1920",
    height: "800",
    bottomGap: 20,
    fontColor: "white",
    buttonColor: "gray.600",
    buttonW: "250px",
    buttonH: "70px",
    buttonFont: "20px",
    hover: { opacity: 0.75 },
  };

  return (
    <Stack>
      {/* Container for category content */}
      <Stack direction="column">
        {homePageCategoryContent.map((product, index) => (
          <Comps.FadingBox key={index}>
            <Box position="relative" display="inline-block" mb={20}>
              {/* Image for the category */}
              <Image
                src={product.src}
                alt={product.alt}
                width={`${elementStyle.width}px`}
                height={`${elementStyle.height}px`}
              />
              {/* Button overlay on the image */}
              <Center position="absolute" top="0" left="0" right="0" bottom="0">
                <Link href={product.link}>
                  <Button
                    bgColor={elementStyle.buttonColor}
                    color={elementStyle.fontColor}
                    w={elementStyle.buttonW}
                    h={elementStyle.buttonH}
                    fontSize={elementStyle.buttonFont}
                    _hover={elementStyle.hover}
                  >
                    {product.buttonText}
                  </Button>
                </Link>
              </Center>
            </Box>
          </Comps.FadingBox>
        ))}
      </Stack>
    </Stack>
  );
};

export default HomePage;
