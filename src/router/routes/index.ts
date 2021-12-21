import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';
const LOYOUT = () => import('@/views/pcLogin/page/login.vue')//'@/loyout/index.vue'

const componentsMap: IObject<() => Promise<typeof import('*.vue')>> = {
    'Login': () => import('@/views/pcLogin/page/login.vue'),
    'Account': () => import('@/views/pcLogin/page/account.vue'),
    'QuickLogin': () => import('@/views/pcLogin/page/quickLogin.vue'),
    'Register': () => import('@/views/pcLogin/page/register.vue'),
    'ForgetPwd': () => import('@/views/pcLogin/page/forgetPwd.vue'),
}

export const LoginRoute: AppRouteRecordRaw = {
    name: 'login',
    path: '/login',
    component: componentsMap['Login'],
    meta: {
        title: '小鹅云',
    },
    children: [
        {
            path: '/account',
            name: 'account',
            component: componentsMap['Account'],
            meta: {
                title: '账号登录',
                type: 0,
            },
        },
        {
            path: '/quickLogin',
            name: 'quickLogin',
            component: componentsMap['QuickLogin'],
            meta: {
                title: '快捷登录'
            }
        },
        {
            path: '/register',
            name: "register",
            component: componentsMap['Register'],
            meta: {
                title: '注册',
                type: 1,
            },
        },
        {
            path: '/forget',
            name: '忘记密码',
            component: componentsMap['ForgetPwd'],
            meta: {
                title: '忘记密码',
                type: 2,
            },
        },
    ],
};

const CustomRoute: AppRouteModule[] = [
    {
        name: 'LOYOUT',
        path: '/',
        component: LOYOUT,
        meta: {
            title: '小鹅云',
        },
    },
]

// 通用路由且无权限
export const basicRoutes = [
    LoginRoute,
    ...CustomRoute
];
