import React from 'react';
import { Anchor } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-water-dark flex flex-col items-center justify-center">
      <div className="floating">
        <Anchor size={48} className="text-white mb-4" />
      </div>
      <h2 className="text-2xl font-display text-white mb-2">Loading Beach</h2>
      <p className="text-water-light">Setting sail to the virtual shore...</p>
      
      <div className="mt-8 w-64 bg-blue-900/30 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-primary-light animate-wave w-full"></div>
      </div>
    </div>
  );
};