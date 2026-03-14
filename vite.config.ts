import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { version, name } from './package.json';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(version),
    'import.meta.env.APP_NAME': JSON.stringify(name),
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      mangle: true,
      compress: true,
    },
  },
});
