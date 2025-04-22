import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 1000 // Set the limit to 1000 kB
    }
});