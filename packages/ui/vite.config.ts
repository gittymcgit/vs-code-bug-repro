import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import pkgJson from "./package.json";

const isWatch = process.env.WATCH === "true";

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  mode: isWatch ? "development" : "production",
  build: {
    emptyOutDir: true,
    ssr: true,
    watch: isWatch ? {} : null,
    lib: {
      entry: {
        index: "./index.tsx",
      },
      name: "ui",
      formats: ["es"],
    },
    ssrEmitAssets: true,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    rollupOptions: {
      external: [...Object.keys(pkgJson.dependencies)],
      output: {
        preserveModules: true,
        inlineDynamicImports: false,
      },
    },
  },
});
