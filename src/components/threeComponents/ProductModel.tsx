import React, { useRef } from "react";
import { useGLTF, Sphere, Circle } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { Group, BackSide, Mesh, Material, BufferGeometry, Color } from "three";
import { RGBELoader } from "three-stdlib";

// Type for GLTF Node
type GLTFNode = Mesh & {
  geometry: BufferGeometry;
  material: Material | Material[];
};

// Type for GLTF Nodes
type GLTFNodes = {
  [key: string]: GLTFNode;
};

const ProductModel: React.FC<{
  modelUrl: string;
  lightingMode: string;
}> = ({ modelUrl, lightingMode }) => {
  const groupRef = useRef<Group>(null);

  // Load HDR textures for default, warm, and cool modes
  const defaultHDR = useLoader(RGBELoader, "/three/studio_small_09_1k.hdr");
  const warmHDR = useLoader(RGBELoader, "/three/thatch_chapel_4k.hdr");
  const coolHDR = useLoader(RGBELoader, "/three/brown_photostudio_02_4k.hdr");

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0025;
    }
  });

  // Load the GLTF model
  const gltf = useGLTF(modelUrl);

  // Cast nodes and materials to the appropriate types
  const nodes = gltf.nodes as GLTFNodes;
  const materials = gltf.materials as { [key: string]: Material };

  // Define lighting colors and intensities for warm, cool, and default
  let lightColor = new Color(0xffffff);
  let ambientIntensity = 5;

  if (lightingMode === "warm") {
    lightColor = new Color(0xffe0b2);
    ambientIntensity = 3;
  } else if (lightingMode === "cool") {
    lightColor = new Color(0xffffff);
    ambientIntensity = 3;
  }

  // Choose HDR texture and individual settings based on lighting mode
  let selectedHDR = defaultHDR;
  let hdriSettings = {
    args: [800, 64, 64] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    scale: [1, 1, -1] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
  };

  if (lightingMode === "warm") {
    selectedHDR = warmHDR;
    hdriSettings = {
      args: [900, 64, 64],
      position: [0, 550, 0],
      scale: [1.1, 0.78, 1.1],
      rotation: [0, Math.PI / 3, 0],
    };
  } else if (lightingMode === "cool") {
    selectedHDR = coolHDR;
    hdriSettings = {
      args: [900, 64, 64],
      position: [0, 500, 0],
      scale: [1.1, 0.8, 1.1],
      rotation: [0, Math.PI / 7, 0],
    };
  }

  return (
    <group dispose={null} ref={groupRef}>
      <group scale={1}>
        <ambientLight intensity={ambientIntensity} color={lightColor} />
        <spotLight
          position={[10, 20, 10]}
          angle={0.3}
          penumbra={1}
          decay={0}
          intensity={13}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color={lightColor}
        />
      </group>

      {/* Conditionally render HDRI background based on lighting mode */}
      {(lightingMode === "warm" || lightingMode === "cool") && (
        <Sphere
          args={hdriSettings.args}
          scale={hdriSettings.scale}
          position={hdriSettings.position}
          rotation={hdriSettings.rotation}
        >
          <meshBasicMaterial
            attach="material"
            map={selectedHDR}
            side={BackSide}
          />
        </Sphere>
      )}

      <group scale={1} position={[0, 0, 0]}>
        {Object.keys(nodes).map((key) => {
          const node = nodes[key];
          if (node.type === "Mesh") {
            const material = Array.isArray(node.material)
              ? node.material[0]
              : node.material;
            const materialInMap =
              material && "name" in material
                ? materials[material.name]
                : material;

            return (
              <mesh
                key={key}
                castShadow
                receiveShadow
                geometry={node.geometry}
                material={materialInMap}
              />
            );
          }
          return null;
        })}
      </group>

      <Circle
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[6, 32]}
        castShadow
        receiveShadow
      >
        <shadowMaterial color="black" transparent={true} opacity={0.75} />
      </Circle>
    </group>
  );
};

export default ProductModel;
