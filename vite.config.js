import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A relative base lets the same build run on Netlify and on GitHub Pages (served from a subfolder).
export default defineConfig({
  base: './',
  plugins: [react()],
});
