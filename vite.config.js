import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    host:'0.0.0.0', // l'hote pour accéder à notre ressource
    port: 5173, // notre port exposé
    strictPort : true, // assurer qu'un seul port est fine
    watch: {
      usePolling: true, // pour le reload avec Docker
    }
  }
})
