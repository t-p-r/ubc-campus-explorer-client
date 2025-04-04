import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
		proxy: {
			// Proxy API requests to the backend server running on port 4321
			// Since that's our fixed port number
			'/dataset': 'http://localhost:4321',
			'/datasets': 'http://localhost:4321',
			'/query': 'http://localhost:4321',
		}
	}
})
