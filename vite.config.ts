import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    minify: "terser",
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
