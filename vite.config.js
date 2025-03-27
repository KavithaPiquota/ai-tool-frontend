import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: 'all'
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: 'all'
  },
  build: {
    outDir: 'dist'
  },
  base: '/', // Ensure proper base path for deployment
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})