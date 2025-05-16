import React, { useRef, useEffect } from 'react';
import { X, MessageSquareQuote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Message } from '../types/Message';

interface MessagePopupProps {
  message: Message;
  onClose: () => void;
}

export const MessagePopup: React.FC<MessagePopupProps> = ({ message, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Format date
  const formattedDate = new Date(message.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/20">
      <motion.div
        ref={popupRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="message-popup p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <MessageSquareQuote className="text-primary mr-2" size={24} />
            <h3 className="text-xl font-display text-water-dark">Message in a Bottle</h3>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-water-dark">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-800 italic leading-relaxed whitespace-pre-line">
            "{message.content}"
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-secondary text-sm">Found on {formattedDate}</p>
        </div>
      </motion.div>
    </div>
  );
};