import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for assets
  build: {
    outDir: 'dist'
  },
  server: {
    // Use the PORT environment variable, or fallback to 5173 for local development
    port: process.env.PORT || 5173, 
    host: true, // Allows the server to be accessed externally (on all network interfaces)
  }
})
