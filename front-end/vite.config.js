import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:80",
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
