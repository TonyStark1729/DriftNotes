import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/DriftNotes/',
  build: {
    outDir: 'dist' // Optional, as 'dist' is default
  }
});