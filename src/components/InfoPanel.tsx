import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InfoPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Information"
      >
        <Info size={20} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display text-water-dark">About DriftNotes</h2>
              <button onClick={() => setIsOpen(false)} className="text-secondary hover:text-water-dark">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <section>
                <h3 className="text-xl font-display text-primary mb-2">Welcome to DriftNotes</h3>
                <p className="text-gray-700 leading-relaxed">
                  This virtual beach allows you to anonymously share your thoughts, dreams, secrets, or messages with the world.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-display text-primary mb-2">How It Works</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Click "Write a Message" to submit your anonymous message</li>
                  <li>Your message will appear as a bottle in the ocean</li>
                  <li>Click on bottles to read messages from other visitors</li>
                  <li>Explore the beach by dragging to rotate the camera</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-display text-primary mb-2">Technology</h3>
                <p className="text-gray-700 leading-relaxed">
                  Built with React, Three.js for 3D rendering, and Firebase for storing messages. The beach environment is created using 3D models and custom shaders.
                </p>
              </section>
              
              <section className="pt-4 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  Created with ❤️ by Rajdeep Singh. All messages are anonymous and no personal data is collected.
                </p>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};