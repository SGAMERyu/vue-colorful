import Vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Dts from "vite-plugin-dts";

let cssCodeStr = "";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "index.ts"),
      fileName: "vur-colorful",
      name: "VueColorful",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
    sourcemap: true,
  },
  plugins: [
    Vue(),
    Components({ dts: true }),
    Dts({ rollupTypes: true }),
    {
      name: "inline-css",
      renderChunk(code, { isEntry }) {
        if (!isEntry) return;

        return {
          code: `\
          function __insertCSSVueColorful(code) {
            if (!code || typeof document == 'undefined') return
            let head = document.head || document.getElementsByTagName('head')[0]
            let style = document.createElement('style')
            style.type = 'text/css'
            head.appendChild(style)
            ;style.styleSheet ? (style.styleSheet.cssText = code) : style.appendChild(document.createTextNode(code))
          }\n
          __insertCSSVueColorful(${JSON.stringify(cssCodeStr)})
          \n ${code}`,
          map: { mappings: "" },
        };
      },
      transform(code, id) {
        const isCSS = (path: string) => /\.css$/.test(path);
        if (!isCSS(id)) return;

        cssCodeStr += code;
        return {
          code: "",
          map: { mappings: "" },
        };
      },
    },
  ],
});
