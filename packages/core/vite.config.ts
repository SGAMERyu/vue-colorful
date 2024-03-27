import { defineConfig } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "packages/index.ts"),
      name: "VueColorful",
      fileName: "vur-colorful",
    },
  },
  plugins: [vue()],
});
