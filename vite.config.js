import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// BASE_PATH is set by the GitHub Pages workflow (e.g. /My-Portfolio/); other hosts serve from the root.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [tailwindcss()],
  build: { outDir: 'dist', emptyOutDir: true },
});
