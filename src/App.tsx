import React, { useState, Suspense } from 'react';
import { MessageForm } from './components/MessageForm';
import { MessagePopup } from './components/MessagePopup';
import { LoadingScreen } from './components/LoadingScreen';
import { BeachScene } from './components/3d/BeachScene';
import { InfoPanel } from './components/InfoPanel';
import { useMessageStore } from './store/messageStore';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { selectedMessage, clearSelectedMessage } = useMessageStore();
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 canvas-container">
        <Suspense fallback={<LoadingScreen />}>
          <BeachScene />
        </Suspense>
      </div>
      
      {/* UI Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto h-full flex flex-col p-4 md:p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-4 pointer-events-auto">
            <h1 className="text-2xl md:text-3xl font-display text-white drop-shadow-md">
              Message in a Bottle
            </h1>
            <InfoPanel />
          </header>
          
          {/* Content */}
          <div className="flex-grow flex items-end justify-center">
            {!showForm && !selectedMessage && (
              <button 
                onClick={() => setShowForm(true)}
                className="pointer-events-auto mb-8 px-6 py-3 bg-primary text-white rounded-full font-medium shadow-lg hover:bg-primary-light transition-all duration-300 submit-button"
              >
                Write a Message
              </button>
            )}
            
            {showForm && (
              <div className="pointer-events-auto w-full max-w-md mb-8">
                <MessageForm onClose={() => setShowForm(false)} />
              </div>
            )}
          </div>
        </div>
        
        {/* Message Popup */}
        {selectedMessage && (
          <div className="pointer-events-auto">
            <MessagePopup
              message={selectedMessage}
              onClose={clearSelectedMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;