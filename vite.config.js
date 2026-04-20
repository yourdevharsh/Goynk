import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 1420,
    strictPort: true,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        floater: resolve(__dirname, "src/views/floater.html"),
      },
    },
  },
});
