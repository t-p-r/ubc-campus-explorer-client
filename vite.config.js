import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// OSRM backend. TODO: change when deploying
			"/route": "http://localhost:5000",
		},
		port: 4173,
		strictPort: true,
		host: true,
		origin: "http://0.0.0.0:4173",
	},
});
