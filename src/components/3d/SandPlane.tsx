import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface SandPlaneProps {
  position: [number, number, number];
}

export const SandPlane: React.FC<SandPlaneProps> = ({ position }) => {
  // Sand texture would be loaded here in a real application
  // For now we'll use a simple material
  
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[40, 20, 64, 64]} />
      <meshStandardMaterial
        color="#f3e8c8"
        roughness={0.8}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};