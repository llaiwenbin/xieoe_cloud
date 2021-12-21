import type { Router } from 'vue-router';
import nProgress from 'nprogress';


// Don't change the order of creation
export function setupRouterGuard(router: Router) {
    createPageLoadingGuard(router);
    createProgressGuard(router);
    createPermissionGuard(router);
    createParamMenuGuard(router);
}

// 创建菜单的 路由守卫
export function createParamMenuGuard(router: Router) {
    router.beforeEach(async (to, _, next) => {

        next();
    });
}

// 权限路由守卫
function createPermissionGuard(router: Router) {
    router.beforeEach(async () => {
        return true;
    });
    router.afterEach(async () => {
        return true;
    });
}

// 全局页面 loading 路由守卫
function createPageLoadingGuard(router: Router) {
    router.beforeEach(async () => {
        return true;
    });
    router.afterEach(async () => {
        return true;
    });
}

// 请求进度条 路由守卫 
export function createProgressGuard(router: Router) {
    router.beforeEach(() => {
        nProgress.start();
        return true;
    });

    router.afterEach(() => {
        nProgress.done();
        return true;
    });
}
