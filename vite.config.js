import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    build: {
        outDir: 'dist', // Output directory for build files
        emptyOutDir: true, // Clean the output directory before building
        rollupOptions: {
            external: ['three'],
            output: {
                globals: {
                    three: 'THREE'
                }
            }
        }


    },
    plugins: [react()],
})
