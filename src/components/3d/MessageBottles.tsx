import React, { useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMessages } from '../../hooks/useMessages';
import { useMessageStore } from '../../store/messageStore';
import { Bottle } from './Bottle';

export const MessageBottles: React.FC = () => {
  const { messages, loading } = useMessages();
  const { setSelectedMessage } = useMessageStore();
  
  // Loading state
  if (loading) {
    return (
      <Text
        position={[0, 2, 0]}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontSize={0.5}
      >
        Loading messages...
      </Text>
    );
  }
  
  return (
    <group>
      {messages.map((message, index) => {
        // Generate a deterministic position based on the message ID
        const hashCode = message.id.split('').reduce((acc, char) => {
          return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        
        // Create a circular pattern of bottles in the ocean
        const angle = (hashCode % 360) * (Math.PI / 180);
        const radius = 5 + (hashCode % 10) / 2; // Between 5-10 units from center
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // Random offset for height
        const y = (hashCode % 20) / 100 + 0.1; // Small variations in height
        
        // Random rotation
        const rotation = [0, (hashCode % 360) * (Math.PI / 180), (hashCode % 30) * (Math.PI / 180)];
        
        return (
          <Bottle
            key={message.id}
            position={[x, y, z]}
            rotation={rotation as [number, number, number]}
            message={message}
            onClick={() => setSelectedMessage(message)}
            bottleType={hashCode % 3} // Use 3 different bottle types
          />
        );
      })}
    </group>
  );
};