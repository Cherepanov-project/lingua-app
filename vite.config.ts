import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/auth0': {
          target: `https://${env.VITE_AUTH0_DOMAIN}`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/auth0/, ''),
          secure: false,
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      }
    }
  }
})