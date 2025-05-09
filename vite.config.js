import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react' // Removed React plugin

export default defineConfig({
    base: '/boat-game/', // Set base path for GitHub Pages
    build: {
        outDir: 'dist', // Output directory for build files
        emptyOutDir: true, // Clean the output directory before building
        // Removed rollupOptions for externalizing three
    },
    // plugins: [react()], // Removed React plugin
})
