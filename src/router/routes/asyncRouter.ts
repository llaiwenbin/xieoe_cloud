
import { viewsComponentsMap } from '../hlper/routes'
import { PathComponentsMap, AppRouteModule } from '../types';

// 根据components动态导入对应文件
function dynamicImport(dynamicViewsModules: PathComponentsMap, components: string) {
    components = components.toUpperCase();

    if (!dynamicViewsModules.has(components)) {
        console.warn('在src/views/下找不到`' + components + '.vue` 或 `' + components + '.tsx`, 请自行创建!');
    }

    return dynamicViewsModules.get(components) || null
}

// 生成 权限过滤后的路由
const generatorDynamicRouter = (routersList: AppRouteModule[] = []): AppRouteModule[] => {
    if (!routersList.length) return [];

    const asyncRouters: AppRouteModule[] = [];
    routersList.forEach(item => {
        // 这里加权限和转换,暂时为超级管理员
        if (!judgePerssion(item.permission, { super: true })) return;

        if (typeof item.component == 'string') {
            item.component = dynamicImport(viewsComponentsMap, item.component);
        }

        item.children = generatorDynamicRouter(item.children)
        asyncRouters.push(item)
    })

    return asyncRouters;
}


const judgePerssion = (preList: string[] = [], rolePression: IObject<any>): boolean => {
    // 超级管理员有所有权限
    if (rolePression.super) return true;

    return !!preList.find(pre => rolePression[pre])
}
export {
    generatorDynamicRouter
}