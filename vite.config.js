import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/l17-texture-mapping-lk911/', // Set base path for GitHub Pages
    build: {
        outDir: 'dist', // Output directory for build files
        emptyOutDir: true, // Clean the output directory before building
        // Removed rollupOptions for externalizing three
    },
    plugins: [react()],
})
