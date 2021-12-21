// declare module 补充现有的类型 
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 当前层级的排序
    orderNo?: number;
    // 显示的标题
    title: string;
    // 菜单图标
    icon?: string;
    // 外链地址
    frameSrc?: string;
    // 切换路由的动画名
    transitionName?: string;
    // 当前路由不在菜单显示
    hideMenu?: boolean;
    // 当前子路由只有一个的时候是否显示当前路由
    alwaysShow?: boolean
    // 权限
    permission?: string[]
    // 路由设置了该属性，则会高亮相对应的侧边栏
    activeMenu?: string
    // 页面是否不缓存
    noCache?: boolean
  }
}
