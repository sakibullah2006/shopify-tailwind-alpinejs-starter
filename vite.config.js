import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        emptyOutDir: false,
        outDir: 'assets',
        rollupOptions: {
            input: 'src/js/main.js', // Match your path from the log
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
    },
    server: {
        watch: {
            // Prevent infinite loop by ignoring the output directory
            ignored: ['**/assets/**'],
        },
    },
});