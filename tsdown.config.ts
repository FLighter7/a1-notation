import { defineConfig } from 'tsdown';

export default defineConfig([
  // ESM + CommonJS, unminified — consumers bundle/minify themselves
  {
    entry: ['./src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
  },
  // Minified IIFE bundle for direct <script> use in the browser
  {
    entry: { 'index.global': './src/index.ts' },
    format: 'iife',
    globalName: 'A1',
    minify: true,
    dts: false,
    clean: false,
  },
]);
