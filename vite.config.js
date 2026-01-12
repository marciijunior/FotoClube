import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  // Deploy em raiz (Vercel): assets servidos de "/"
  base: "/",
  plugins: [react()],
  server: {
    port: 5174,
  },
});
