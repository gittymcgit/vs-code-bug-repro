import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkgJson from './package.json';

const isWatch = process.env.WATCH === 'true';

export default defineConfig({
  plugins: [
    libAssetsPlugin({}),
    react(),
    dts({
      tsConfigFilePath: './tsconfig.json',
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  mode: isWatch ? 'development' : 'production',
  build: {
    // emptyOutDir: !isWatch,
    ssr: true,
    watch: isWatch ? {} : null,
    lib: {
      entry: {
        index: 'src/index.ts',
      },
      name: '@seo-landing-pages/currency-converter',
      formats: ['es'],
    },
    ssrEmitAssets: true,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    rollupOptions: {
      external: [...Object.keys(pkgJson.peerDependencies), ...Object.keys(pkgJson.dependencies)],
      output: {
        preserveModules: true,
        inlineDynamicImports: false,
      },
    },
  },
  test: {
    include: ['**/*.spec.ts?(x)', '**/*.spec.js?(x)'],
    environment: 'happy-dom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
});
