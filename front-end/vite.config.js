import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    strictPort: true,
    host: true,
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 80,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
