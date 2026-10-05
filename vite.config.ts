import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Todas as fotos e vídeos ficam em src/assets e são empacotados pelo Vite em dist/assets.
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: false,
})
