import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

    build: {
        outDir: 'dist', // Output directory for build files
        emptyOutDir: true // Clean the output directory before building
    },
    plugins: [react()],
})
