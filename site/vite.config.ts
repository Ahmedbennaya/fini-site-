import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Listening on all interfaces
    port: 3000, // Development port
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(), // Only enable componentTagger in dev mode
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'site/dist', // Specify the output directory as 'site/dist'
    sourcemap: mode === 'development', // Optionally include sourcemaps in development
    // Additional build settings can go here (e.g., minification, chunk splitting)
  },
}));
