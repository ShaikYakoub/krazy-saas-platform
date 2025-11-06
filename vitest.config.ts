import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url'; // <-- 1. IMPORT THE NEW TOOLS

// --- 2. DEFINE THE CORRECT ROOT PATH ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['components/__tests__/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      // --- 3. USE THE CORRECT __dirname ---
      '@': path.resolve(__dirname, './'),
    },
  },
});