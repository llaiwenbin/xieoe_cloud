import type { RouteRecordRaw } from 'vue-router';
import { setupRouterGuard } from './guard/index'
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';


export const router = createRouter({
    history: createWebHashHistory(),//import.meta.env.VITE_PUBLIC_PATH
    routes: basicRoutes as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});


// config router
export function setupRouter(app: App<Element>) {
    app.use(router);
}
setupRouterGuard(router);
