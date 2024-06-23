import react from '@vitejs/plugin-react';
import { join } from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: 'src', replacement: join(__dirname, 'src') }],
  },
  plugins: [
    react(),
  ],
  define: {
    'globalThis.process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  build: {
    rollupOptions: {
      external: []
    },
    outDir: './build',
  },
});
