import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button, Stack, Flex } from "@chakra-ui/react";
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

  return (
    <div id="canvas-container" style={{ width: "100%", height: "100%" }}>
      <Stack spacing={4} align="center">
        <div style={{ width: "75vw", height: "70vh" }}>
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
        <Flex direction="row" gap={4}>
          <Button
            colorScheme="teal"
            size="md"
            w="10vw"
            onClick={() => setLightingMode("default")}
          >
            Default
          </Button>
          <Button
            colorScheme="orange"
            size="md"
            w="10vw"
            onClick={() => setLightingMode("warm")}
          >
            Warm
          </Button>
          <Button
            colorScheme="blue"
            size="md"
            w="10vw"
            onClick={() => setLightingMode("cool")}
          >
            Cool
          </Button>
        </Flex>
      </Stack>
    </div>
  );
};

export default ProductCanvas;
