import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "0.0.0.0",
        cors: true,
        strictPort: true,
        watch: {
            usePolling: true,
        },
        hmr: {
            host: "192.168.8.68",
        },
    },
});
