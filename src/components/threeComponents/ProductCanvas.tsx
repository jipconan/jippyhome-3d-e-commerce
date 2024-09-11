import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button, Stack, Flex, useBreakpointValue } from "@chakra-ui/react";
import ProductModel from "./ProductModel";
import React from "react";

// Memoize CameraSetup to prevent re-rendering
const CameraSetup: React.FC = React.memo(() => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.5, 5);
  }, [camera]);

  return null;
});

const ProductCanvas: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  const [lightingMode, setLightingMode] = useState("default");

  // Responsive sizes based on breakpoints
  const canvasWidth = useBreakpointValue({
    base: "100vw",
    md: "100vw",
    lg: "70vw",
  });
  const canvasHeight = useBreakpointValue({
    base: "68vh",
    md: "70vh",
    lg: "70vh",
  });

  return (
    <Stack align="center">
      <div style={{ width: canvasWidth, height: canvasHeight }}>
        <Canvas shadows>
          {/* Memoized Camera Setup */}
          <CameraSetup />

          {/* 3D ProductModel with lighting mode */}
          <ProductModel modelUrl={modelUrl} lightingMode={lightingMode} />

          {/* Orbit Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            target={[0, 1.5, 0]}
          />
        </Canvas>
      </div>

      {/* List of Buttons */}
      <Flex direction="row" gap={4} my={{ base: 0, md: 1 }}>
        <Button
          colorScheme="teal"
          size={{ base: "sm", md: "sm", lg: "lg" }}
          w={{ base: "80%", md: "10vw" }}
          onClick={() => setLightingMode("default")}
        >
          Default
        </Button>
        <Button
          colorScheme="orange"
          size={{ base: "sm", md: "sm", lg: "lg" }}
          w={{ base: "80%", md: "10vw" }}
          onClick={() => setLightingMode("warm")}
        >
          Warm
        </Button>
        <Button
          colorScheme="blue"
          size={{ base: "sm", md: "sm", lg: "lg" }}
          w={{ base: "80%", md: "10vw" }}
          onClick={() => setLightingMode("cool")}
        >
          Cool
        </Button>
      </Flex>
    </Stack>
  );
};

export default ProductCanvas;
