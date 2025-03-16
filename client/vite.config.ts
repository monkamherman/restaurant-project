import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import { envs } from './src/core/config/env';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      process: path.resolve(__dirname, 'node_modules/process'),
    },
  },

  server: {
    host: '0.0.0.0', // Valeur par défaut
    port: 10000, // Valeur par défaut
  },

  preview: {
    host: '0.0.0.0', // Valeur par défaut
    port: 10000, // Valeur par défaut
  },


  css: {
    postcss: './postcss.config.js',
  },
});
