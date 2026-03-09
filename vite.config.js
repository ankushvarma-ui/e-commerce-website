import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:5000",
      "/uploads/": "http://localhost:5000",
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          router: ['react-router', 'react-router-dom'],
          paypal: ['@paypal/react-paypal-js'],
          ui: ['react-icons', 'react-slick', 'slick-carousel', 'flowbite'],
          charts: ['apexcharts', 'react-apexcharts'],
          utils: ['moment', 'react-toastify']
        }
      }
    }
  }
});
