import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [svelte()],
//   server: {
//     // ... other server options you might have (like port)
//     host: '0.0.0.0', // This makes Vite listen on all network interfaces
//     allowedHosts: [
//       '.brimerica.dev', // Allow all subdomains of brimerica.dev
//       // 'app.brimerica.dev', // You could also specify just the exact subdomain
//     ],
//   }
// })

export default defineConfig(({ mode }) => { // Add 'mode' to the defineConfig callback
  // Load environment variables for the current mode
  const env = loadEnv(mode, process.cwd(), ''); // The '' ensures all VITE_ vars are loaded

  return {
    plugins: [svelte()],
    server: {
      host: '0.0.0.0', // This makes Vite listen on all network interfaces
      allowedHosts: [
        '.brimerica.dev',
      ],
      // Configure the proxy for API requests
      proxy: {
        '/api': { // Any request starting with /api
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:3000', // Forward to Express
          changeOrigin: true, // Needed for virtual hosted sites
          rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite /api/message to /api/message (optional, but good practice)
          // Optionally, add a configure function for debugging
          // configure: (proxy, options) => {
          //   proxy.on('error', (err, req, res) => {
          //     console.error('Proxy error:', err, req.url);
          //   });
          //   proxy.on('proxyRes', (proxyRes, req, res) => {
          //     console.log('Proxy response from:', req.url, proxyRes.statusCode);
          //   });
          // },
        },
      },
    },
    build: {
      outDir: 'dist', // Ensure this matches where your Express server expects the Svelte build
    },
  };
});