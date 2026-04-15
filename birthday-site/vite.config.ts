import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // This setting allows Vite to handle very long URL strings
    // without throwing the 431 error.
    proxy: {},
  },
  preview: {
    port: 5173,
  }
});