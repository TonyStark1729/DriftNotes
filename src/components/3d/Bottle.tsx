import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Message } from '../../types/Message';

interface BottleProps {
  position: [number, number, number];
  rotation: [number, number, number];
  message: Message;
  onClick: () => void;
  bottleType: number;
}

export const Bottle: React.FC<BottleProps> = ({ position, rotation, message, onClick, bottleType }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Simple bottle mesh using primitive shapes
  const getBottleColor = (type: number) => {
    switch (type) {
      case 0: return '#2dd4bf'; // Teal
      case 1: return '#22d3ee'; // Cyan
      case 2: return '#a78bfa'; // Purple
      default: return '#22d3ee';
    }
  };
  
  const bottleColor = getBottleColor(bottleType);
  const corkColor = '#e6d5a5'; // Sandy beige for cork
  
  // Floating animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Unique but deterministic movement for each bottle
      const seed = position[0] * 100 + position[2];
      
      // Apply gentle floating motion
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + seed) * 0.1;
      
      // Add slight rotation
      groupRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3 + seed) * 0.03;
      groupRef.current.rotation.z = rotation[2] + Math.cos(time * 0.4 + seed) * 0.03;
      
      // Scale up slightly when hovered
      groupRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Bottle body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.25, 0.6, 16]} />
        <meshPhysicalMaterial 
          color={bottleColor} 
          roughness={0.1} 
          metalness={0.1} 
          transmission={0.6} 
          thickness={0.2}
          emissive={hovered ? bottleColor : 'black'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      
      {/* Bottle neck */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.12, 0.2, 16]} />
        <meshPhysicalMaterial 
          color={bottleColor} 
          roughness={0.1} 
          metalness={0.1} 
          transmission={0.6} 
          thickness={0.2}
          emissive={hovered ? bottleColor : 'black'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      
      {/* Cork */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 16]} />
        <meshStandardMaterial color={corkColor} roughness={0.8} />
      </mesh>
      
      {/* Add highlight effect when hovered */}
      {hovered && (
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial 
            color={bottleColor} 
            transparent={true} 
            opacity={0.15} 
          />
        </mesh>
      )}
    </group>
  );
};