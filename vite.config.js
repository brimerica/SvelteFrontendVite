import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    // ... other server options you might have (like port)
    host: '0.0.0.0', // This makes Vite listen on all network interfaces
    allowedHosts: [
      '.brimerica.dev', // Allow all subdomains of brimerica.dev
      // 'app.brimerica.dev', // You could also specify just the exact subdomain
    ],
  }
})
