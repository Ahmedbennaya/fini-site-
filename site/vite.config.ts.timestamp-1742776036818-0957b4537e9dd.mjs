// vite.config.ts
import { defineConfig } from "file:///C:/Users/maison/OneDrive/Bureau/bargaoui%20site%20fini/site/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/maison/OneDrive/Bureau/bargaoui%20site%20fini/site/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\maison\\OneDrive\\Bureau\\bargaoui site fini\\site";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    // Listening on all interfaces
    port: 3e3
    // Development port
  },
  plugins: [react()],
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
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into a separate chunk
          vendor: ["react", "react-dom"]
        }
      }
    },
    chunkSizeWarningLimit: 1e3
    // Increase the chunk size warning limit to 1000 kB
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYWlzb25cXFxcT25lRHJpdmVcXFxcQnVyZWF1XFxcXGJhcmdhb3VpIHNpdGUgZmluaVxcXFxzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYWlzb25cXFxcT25lRHJpdmVcXFxcQnVyZWF1XFxcXGJhcmdhb3VpIHNpdGUgZmluaVxcXFxzaXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9tYWlzb24vT25lRHJpdmUvQnVyZWF1L2Jhcmdhb3VpJTIwc2l0ZSUyMGZpbmkvc2l0ZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIiwgLy8gTGlzdGVuaW5nIG9uIGFsbCBpbnRlcmZhY2VzXG4gICAgcG9ydDogMzAwMCwgLy8gRGV2ZWxvcG1lbnQgcG9ydFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwic2l0ZS9kaXN0XCIsIC8vIFNwZWNpZnkgdGhlIG91dHB1dCBkaXJlY3RvcnkgYXMgJ3NpdGUvZGlzdCdcbiAgICBzb3VyY2VtYXA6IG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiwgLy8gT3B0aW9uYWxseSBpbmNsdWRlIHNvdXJjZW1hcHMgaW4gZGV2ZWxvcG1lbnRcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gU3BsaXQgdmVuZG9yIGxpYnJhcmllcyBpbnRvIGEgc2VwYXJhdGUgY2h1bmtcbiAgICAgICAgICB2ZW5kb3I6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCwgLy8gSW5jcmVhc2UgdGhlIGNodW5rIHNpemUgd2FybmluZyBsaW1pdCB0byAxMDAwIGtCXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlXLFNBQVMsb0JBQW9CO0FBQ3RZLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVcsU0FBUztBQUFBO0FBQUEsSUFDcEIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsUUFDL0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUE7QUFBQSxFQUN6QjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
