import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:[
      {
        find:'@pages',
        replacement: resolve(__dirname,'./src/pages')
      },
      {
        find:'@routers',
        replacement: resolve(__dirname,'./src/routers')
      },
      {
        find:'@components',
        replacement: resolve(__dirname, './src/components')
      }
    ]
  }
})
