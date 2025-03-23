import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemapPlugin from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Listening on all interfaces
    port: 3000, // Development port
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(), // Only enable componentTagger in dev mode
    sitemapPlugin({
      hostname: "https://bargaoui-rideauxtahar.netlify.app",
      // Use the correctly supported property for your version of the plugin
      // This might be one of: dynamicRoutes, urls, or outDir depending on the plugin version
      dynamicRoutes: [
        "/",
        "/about",
        "/products",
        "/contact",
        "/login",
        "/signup",
        "/cart",
        "/account",
        "/checkout",
        "/order-success",
        "/admin",
        "/admin/products",
        "/admin/orders",
        "/admin/customers",
        "/admin/categories",
      ],
      // Remove generateRobotsTxt if it's not supported
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'site/dist',
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1200, // Added to avoid chunk size warnings
  },
}));