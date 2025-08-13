import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
          target: `https://${env.VITE_AUTH0_DOMAIN}`,
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
  }
})