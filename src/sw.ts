import {
    cleanupOutdatedCaches,
    createHandlerBoundToURL,
    precacheAndRoute,
} from 'workbox-precaching';

import {Route, NavigationRoute, registerRoute} from 'workbox-routing';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheFirst} from 'workbox-strategies';

const CACHE_PREFIX = 'cached';
const CACHE_SCRIPT_NAME = `${CACHE_PREFIX}-scripts`;
const CACHE_STYLES_NAME = `${CACHE_PREFIX}-styles`;
const CACHE_DOCUMENTS_NAME = `${CACHE_PREFIX}-documents`;
const CACHE_FONTS_NAME = `${CACHE_PREFIX}-fonts`;
const CACHE_IMAGES_NAME = `${CACHE_PREFIX}-images`;

const stylesScriptsExpirationPlugin = new ExpirationPlugin({
    maxEntries: 10,
    maxAgeSeconds: 15 * 24 * 60 * 60,
    purgeOnQuotaError: true,
});
const fontsExpirationPlugin = new ExpirationPlugin({
    maxEntries: 5,
    maxAgeSeconds: 180 * 24 * 60 * 60,
});
const imagesExpirationPlugin = new ExpirationPlugin({
    maxEntries: 100,
    maxAgeSeconds: 60 * 24 * 60 * 60,
});
const documentExpirationPlugin = new ExpirationPlugin({
    maxEntries: 50,
    maxAgeSeconds: 60 * 24 * 60 * 60,
    purgeOnQuotaError: true,
});

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

const registerCacheFirstRouteUsing = (
    destination: RequestDestination,
    cacheName: string,
    expirationPlugin: ExpirationPlugin
): Route =>
    registerRoute(
        ({request}) => request.destination.includes(destination),
        new CacheFirst({
            cacheName: cacheName,
            plugins: [expirationPlugin],
        })
    );

registerCacheFirstRouteUsing(
    'style',
    CACHE_STYLES_NAME,
    stylesScriptsExpirationPlugin
);
registerCacheFirstRouteUsing(
    'script',
    CACHE_SCRIPT_NAME,
    stylesScriptsExpirationPlugin
);
registerCacheFirstRouteUsing(
    'document',
    CACHE_DOCUMENTS_NAME,
    documentExpirationPlugin
);
registerCacheFirstRouteUsing('font', CACHE_FONTS_NAME, fontsExpirationPlugin);
registerCacheFirstRouteUsing(
    'image',
    CACHE_IMAGES_NAME,
    imagesExpirationPlugin
);

registerRoute(
    ({request}) => request.url.includes('countries'),
    new CacheFirst({
        cacheName: 'cashed-countries',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1,
                maxAgeSeconds: 60 * 24 * 60 * 60,
            }),
        ],
    })
);

// to allow work offline
registerRoute(
    new NavigationRoute(createHandlerBoundToURL('index.html'), {
        denylist: [/^\/nothing/],
    })
);
