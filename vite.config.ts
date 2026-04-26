import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [tailwindcss(), react()],
  optimizeDeps: {
    include: ['daisyui'],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    open: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
      },
    },
  },
});
