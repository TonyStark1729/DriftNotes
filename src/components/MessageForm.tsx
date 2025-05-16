import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { addMessage } from '../services/firebaseService';

interface MessageFormProps {
  onClose: () => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await addMessage(message.trim());
      setMessage('');
      onClose();
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error submitting message:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="message-input rounded-lg p-4 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-display text-water-dark">Write a Message</h2>
        <button onClick={onClose} className="text-secondary hover:text-water-dark">
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError(null);
          }}
          placeholder="What would you like to share with the world?"
          className="w-full h-32 p-3 border border-water-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          maxLength={500}
        />
        
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-secondary">
            {message.length}/500 characters
          </p>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded-md flex items-center space-x-1 submit-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Send</span>
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};