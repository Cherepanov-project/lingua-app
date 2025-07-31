import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //   server: {
  //   open: true,
  // },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
  // fs: {
  //     allow: ['.'],
  //   },
  server: {
    open: true,
    proxy: {
      '/auth0': {
        target: 'https://dev-algp1r6iwu3eliy2.eu.auth0.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth0/, ''),
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
          'Access-Control-Allow-Credentials': 'true'
        }
      }
    }
  }
})
