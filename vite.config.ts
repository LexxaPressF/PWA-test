import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import {VitePWA} from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        VitePWA({
            strategies: 'injectManifest',
            registerType: 'autoUpdate',
            manifest: false,
            srcDir: 'src',
            filename: 'sw.ts',
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        typecheck: true,
        environment: 'happy-dom',
        browser: {
            enabled: true,
            name: 'firefox',
            headless: true,
            provider: 'playwright',
        },
        coverage: {
            enabled: true,
            reporter: ['html'],
            provider: 'istanbul',
        },
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/{vite,vitest,jest,build}.config.*',
        ],
    },
});
