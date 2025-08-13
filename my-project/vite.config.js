import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), tailwindcss()],
    publicDir: 'public',
    build: {
      chunkSizeWarningLimit: 1000, // Increase from 500 to 1000 kB
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
    },
  }
  
  // Only set base path for build (GitHub Pages)
  if (command !== 'serve') {
    config.base = '/web-app-clothes-printing-MERN-Stack/'
  }
  
  return config
})
