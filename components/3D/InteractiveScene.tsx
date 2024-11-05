"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Vector3 } from "three";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import type { MeshProps } from "@react-three/fiber";

type MotionMeshProps = MeshProps & {
  ref?: React.RefObject<THREE.Mesh>;
};

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    mousePosition.current = {
      x: event.point.x,
      y: event.point.y,
    };
  };

  return (
    <group onPointerMove={handlePointerMove}>
      <motion.mesh
        animate={{
          x: mousePosition.current.x * 0.5,
          y: mousePosition.current.y * 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshPhongMaterial
          color="#2194ce"
          wireframe
          emissive="#0f3d5c"
          specular="#555555"
          shininess={30}
        />
      </motion.mesh>
      <pointLight position={[2, 3, 4]} intensity={2} color="#4fb8ff" />
      <ambientLight intensity={0.5} />
    </group>
  );
}

export default function InteractiveScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: new Vector3(0, 0, 5) }}
        className="bg-transparent"
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          autoRotate
        />
      </Canvas>
    </div>
  );
}
