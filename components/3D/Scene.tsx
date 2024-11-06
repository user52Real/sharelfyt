"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

export default function Scene() {
  return (
    <div className="h-[400px] w-full">
      <Canvas
        camera={{
          position: new THREE.Vector3(0, 0, 2),
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />

          <mesh>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#2194ce"
              wireframe
              emissive="#0f3d5c"
              emissiveIntensity={0.5}
            />
          </mesh>

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
