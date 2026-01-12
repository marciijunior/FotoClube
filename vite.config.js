import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Define o base para funcionar em subpath (ex.: GitHub Pages)
export default defineConfig({
  base: "/FotoClube/",
  plugins: [react()],
  server: {
    port: 5174,
  },
});
