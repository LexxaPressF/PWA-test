import {fileURLToPath, URL} from 'node:url';

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import {VitePWA} from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    // Загружаем переменные окружения для текущего режима
    const env = loadEnv(mode, process.cwd(), '');
    // Режим classic при --mode=classic или VITE_CLASSIC=true
    const isClassic = mode === 'classic' || env.VITE_CLASSIC === 'true';

    const removePwaTagsPlugin = {
        name: 'remove-pwa-tags',
        apply: 'build',
        transformIndexHtml: {
            enforce: 'post',
            handler(html: string) {
                if (!isClassic) return html;
                return (
                    html
                        // удаляю упоминание манифеста
                        .replace(/<link\s+rel="manifest"[^>]*>/g, '')
                );
            },
        },
    };
    return {
        base: env.VITE_BASE_URL,
        plugins: [
            vue(),
            vueDevTools(),
            !isClassic &&
                VitePWA({
                    strategies: 'injectManifest',
                    registerType: 'autoUpdate',
                    manifest: false,
                    srcDir: 'src',
                    filename: 'sw.ts',
                    includeAssets: [
                        'favicon.ico',
                        'favicon.svg',
                        'apple-touch-icon.png',
                        'img.png',
                        'pwa-192x192.png',
                        'pwa-512x512.png',
                        'pwa-maskable-192x192.png',
                        'pwa-maskable-512x512.png',
                        'PWA_logo.svg',
                    ],
                }),
            removePwaTagsPlugin,
        ].filter(Boolean),
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});
