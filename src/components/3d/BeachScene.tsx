import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera,
  OrbitControls,
  Sky,
  Environment,
  useTexture 
} from '@react-three/drei';
import * as THREE from 'three';
import { OceanPlane } from './OceanPlane';
import { SandPlane } from './SandPlane';
import { MessageBottles } from './MessageBottles';

export const BeachScene: React.FC = () => {
  return (
    <Canvas shadows>
      <SceneSetup />
      
      {/* Environment */}
      <Sky 
        distance={450000} 
        sunPosition={[0, 0.5, -1]} 
        inclination={0.5} 
        azimuth={0.25} 
      />
      <Environment preset="sunset" />
      <hemisphereLight intensity={0.5} groundColor={new THREE.Color('#f3e8c8')} />
      <directionalLight
        position={[1, 8, -3]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ambientLight intensity={0.4} />
      
      {/* Scene Elements */}
      <OceanPlane position={[0, 0, 0]} />
      <SandPlane position={[0, -0.2, 0]} />
      <MessageBottles />
    </Canvas>
  );
};

const SceneSetup: React.FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  
  // Initial camera setup
  useEffect(() => {
    camera.position.set(4, 4, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return (
    <>
      <PerspectiveCamera makeDefault fov={60} near={0.1} far={1000} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        enableZoom={true}
        minDistance={5}
        maxDistance={15}
        enablePan={false}
      />
    </>
  );
};