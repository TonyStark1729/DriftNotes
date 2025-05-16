import { useState, useEffect } from 'react';
import { Message } from '../types/Message';
import { getMessages } from '../services/firebaseService';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const fetchedMessages = await getMessages();
        setMessages(fetchedMessages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch messages'));
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up real-time listener if needed
    const unsubscribe = getMessages(
      (updatedMessages) => {
        setMessages(updatedMessages);
        setLoading(false);
      },
      (err) => {
        setError(err instanceof Error ? err : new Error('Failed to listen to messages'));
        console.error('Error in message listener:', err);
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { messages, loading, error };
};