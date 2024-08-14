import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button, Stack } from "@chakra-ui/react";
import ProductModel from "./ProductModel";

const ProductCanvas: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  const CameraSetup: React.FC = () => {
    const { camera } = useThree();

    useEffect(() => {
      // Set the camera position here
      camera.position.set(0, 0.5, 5);
    }, [camera]);

    return null;
  };

  return (
    <div id="canvas-container" style={{ width: "100%", height: "100%" }}>
      <Stack spacing={4} align="center">
        <div style={{ width: "75vw", height: "70vh" }}>
          <Canvas shadows>
            {/* Camera Setup */}
            <CameraSetup />

            {/* 3D ProductModel */}
            <ProductModel modelUrl={modelUrl} />

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
        <Stack flexDirection="row">
          <Button colorScheme="teal" size="md">
            Button
          </Button>
          <Button colorScheme="teal" size="md">
            Button
          </Button>
          <Button colorScheme="teal" size="md">
            Button
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProductCanvas;
