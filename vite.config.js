import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for assets
  build: {
    outDir: 'dist'
  },
  server: {
    // Allows the app to be accessed on the correct port for Render
    port: process.env.PORT || 5173, 
    host: true, // Expose the server on all network interfaces (0.0.0.0)
    allowedHosts: ['ai-tool-frontend.onrender.com'], // Add this line to allow the specific domain
  }
})
