import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     cors: {
    //         origin: 'http://192.168.45.128:8000' ,  // Allow Laravel's IP
    //         methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //         allowedHeaders: ['Content-Type', 'Authorization'],
    //       },

    // }
});
