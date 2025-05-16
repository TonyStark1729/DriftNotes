import { create } from 'zustand';
import { Message } from '../types/Message';

interface MessageState {
  selectedMessage: Message | null;
  setSelectedMessage: (message: Message) => void;
  clearSelectedMessage: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  selectedMessage: null,
  setSelectedMessage: (message: Message) => set({ selectedMessage: message }),
  clearSelectedMessage: () => set({ selectedMessage: null })
}));