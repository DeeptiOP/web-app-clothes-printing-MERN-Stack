import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), tailwindcss()],
  }
  
  // Only set base path for build (GitHub Pages)
  if (command !== 'serve') {
    config.base = '/web-app-clothes-printing-MERN-Stack/'
  }
  
  return config
})
