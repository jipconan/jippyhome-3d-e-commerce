import React, { useRef } from "react";
import { useGLTF, Sphere, Circle } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { Group, BackSide, Mesh, Material, BufferGeometry } from "three";
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

const ProductModel: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  const groupRef = useRef<Group>(null);
  const texture = useLoader(RGBELoader, "/three/studio_small_09_1k.hdr");

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

  return (
    <group dispose={null} ref={groupRef}>
      <group scale={1}>
        <ambientLight intensity={5} />
        <spotLight
          position={[10, 20, 10]}
          angle={0.3}
          penumbra={1}
          decay={0}
          intensity={12}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      </group>
      <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={BackSide}
          transparent={true}
          opacity={0}
        />
      </Sphere>
      <group scale={1} position={[0, 0, 0]}>
        {Object.keys(nodes).map((key) => {
          const node = nodes[key];
          if (node.type === "Mesh") {
            // Handle the case where node.material might be an array
            const material = Array.isArray(node.material)
              ? node.material[0]
              : node.material;

            // Ensure the material exists in the materials map
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
        <shadowMaterial color="grey" />
      </Circle>
    </group>
  );
};

export default ProductModel;
