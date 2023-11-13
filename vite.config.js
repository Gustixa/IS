import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@trabajador',
        replacement: resolve(__dirname, './src/pages/trabajador'),
      },
      {
        find: '@routers',
        replacement: resolve(__dirname, './src/routers'),
      },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
      {
        find: '@images',
        replacement: resolve(__dirname, './public'),
      },
      {
        find: '@pages',
        replacement: resolve(__dirname, './src/pages'),
      },
      {
        find: '@estudiante',
        replacement: resolve(__dirname, './src/pages/estudiante'),
      },
      {
        find: '@contexts',
        replacement: resolve(__dirname, './src/Contexts'),
      },
      {
        find: '@db-supabase',
        replacement: resolve(__dirname, './src/db/supabase'),
      },
      {
        find: '@test',
        replacement: resolve(__dirname, './src/test'),
      },
    ],
  },
  test: {
    setupFiles: './src/test/setUpTests',
    globals: true,
    environment: 'jsdom',
  },
})
