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
});
