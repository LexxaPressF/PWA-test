import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/MainView.vue'),
        },
        {
            path: '/page',
            name: 'page',
            component: () => import('@/views/PageView.vue'),
            children: [
                {
                    path: '/nested',
                    name: 'nested',
                    component: () => import('@/views/NestedView.vue'),
                },
                {
                    path: '/list',
                    name: 'list',
                    component: () => import('@/views/ListView.vue'),
                },
                {
                    path: '/graphic',
                    name: 'graphic',
                    component: () => import('@/views/GraphicView.vue'),
                },
                {
                    path: '/phone',
                    name: 'phone',
                    component: () => import('@/views/PhoneCapabilities.vue'),
                },
            ],
        },
    ],
});

export default router;
