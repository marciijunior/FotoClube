import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  // Deploy em raiz (Vercel): assets servidos de "/"
  base: "/",
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      "/graphql": {
        target: "http://localhost:3002",
        changeOrigin: true,
        rewrite: (path) => "/",
      },
      "/uploads": {
        target: "http://localhost:3002",
        changeOrigin: true,
      },
    },
  },
});
