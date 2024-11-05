"use client";

import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function ClientOrbitControls() {
  const { camera, gl } = useThree();

  return (
    <OrbitControls
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      autoRotate={true}
      autoRotateSpeed={0.5}
      camera={camera}
      domElement={gl.domElement}
    />
  );
}
