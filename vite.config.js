//vite.config.js - Vite config: server, build, options.

import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist'
  },
  resolve: {
    alias: {
      'three': 'three'
    }
  }
});
