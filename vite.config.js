import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  base: '/cosmic-repo/',
  server: {
    open: '/cosmic-repo/',
  },
  build: {
    minify: true,
  },
})
