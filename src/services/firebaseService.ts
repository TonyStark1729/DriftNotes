import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { Message } from '../types/Message';

// Firebase configuration - replace with your own Firebase config!
// NOTE: In a production environment, these would typically be stored in environment variables
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALjcU3NUwdDUShfrOudK1EjEgrLBNbrqQ",
  authDomain: "driftnotes-aaeed.firebaseapp.com",
  projectId: "driftnotes-aaeed",
  storageBucket: "driftnotes-aaeed.firebasestorage.app",
  messagingSenderId: "186108835674",
  appId: "1:186108835674:web:adac9c0c2d78989104a563"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a new message
export const addMessage = async (content: string): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      content,
      createdAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

// Get messages (one-time fetch)
export const getMessages = async (): Promise<Message[]> => {
  try {
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const querySnapshot = await getDocs(messagesQuery);
    const messages: Message[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        content: data.content,
        createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString()
      });
    });
    
    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};

// Get messages with real-time updates
export const getMessagesRealtime = (
  onUpdate: (messages: Message[]) => void,
  onError: (error: Error) => void
) => {
  try {
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    return onSnapshot(
      messagesQuery,
      (querySnapshot) => {
        const messages: Message[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          messages.push({
            id: doc.id,
            content: data.content,
            createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString()
          });
        });
        
        onUpdate(messages);
      },
      (error) => {
        console.error('Error in messages listener:', error);
        onError(error);
      }
    );
  } catch (error) {
    console.error('Error setting up messages listener:', error);
    onError(error instanceof Error ? error : new Error('Unknown error'));
    return () => {}; // Return empty unsubscribe function
  }
};