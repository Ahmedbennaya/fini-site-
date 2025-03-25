// vite.config.ts
import { defineConfig } from "file:///C:/Users/maison/OneDrive/Bureau/bargaoui%20site%20fini/site/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/maison/OneDrive/Bureau/bargaoui%20site%20fini/site/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/maison/OneDrive/Bureau/bargaoui%20site%20fini/site/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\maison\\OneDrive\\Bureau\\bargaoui site fini\\site";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    // Listening on all interfaces
    port: 3e3
    // Development port
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
    // Only enable componentTagger in dev mode
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    outDir: "site/dist",
    // Specify the output directory as 'site/dist'
    sourcemap: mode === "development",
    // Optionally include sourcemaps in development
    // Additional build settings can go here (e.g., minification, chunk splitting)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"]
          // Split vendor libraries into a separate chunk
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYWlzb25cXFxcT25lRHJpdmVcXFxcQnVyZWF1XFxcXGJhcmdhb3VpIHNpdGUgZmluaVxcXFxzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYWlzb25cXFxcT25lRHJpdmVcXFxcQnVyZWF1XFxcXGJhcmdhb3VpIHNpdGUgZmluaVxcXFxzaXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9tYWlzb24vT25lRHJpdmUvQnVyZWF1L2Jhcmdhb3VpJTIwc2l0ZSUyMGZpbmkvc2l0ZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLCAvLyBMaXN0ZW5pbmcgb24gYWxsIGludGVyZmFjZXNcbiAgICBwb3J0OiAzMDAwLCAvLyBEZXZlbG9wbWVudCBwb3J0XG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiYgY29tcG9uZW50VGFnZ2VyKCksIC8vIE9ubHkgZW5hYmxlIGNvbXBvbmVudFRhZ2dlciBpbiBkZXYgbW9kZVxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ3NpdGUvZGlzdCcsIC8vIFNwZWNpZnkgdGhlIG91dHB1dCBkaXJlY3RvcnkgYXMgJ3NpdGUvZGlzdCdcbiAgICBzb3VyY2VtYXA6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsIC8vIE9wdGlvbmFsbHkgaW5jbHVkZSBzb3VyY2VtYXBzIGluIGRldmVsb3BtZW50XG4gICAgLy8gQWRkaXRpb25hbCBidWlsZCBzZXR0aW5ncyBjYW4gZ28gaGVyZSAoZS5nLiwgbWluaWZpY2F0aW9uLCBjaHVuayBzcGxpdHRpbmcpXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSwgLy8gU3BsaXQgdmVuZG9yIGxpYnJhcmllcyBpbnRvIGEgc2VwYXJhdGUgY2h1bmtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVcsU0FBUyxvQkFBb0I7QUFDdFksT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUhoQyxJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxpQkFBaUIsZ0JBQWdCO0FBQUE7QUFBQSxFQUM1QyxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQTtBQUFBLElBQ1IsV0FBVyxTQUFTO0FBQUE7QUFBQTtBQUFBLElBRXBCLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQTtBQUFBLFFBQy9CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
