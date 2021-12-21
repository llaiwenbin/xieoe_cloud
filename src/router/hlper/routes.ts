import type { AppRouteModule, PathComponentsMap } from './../types';

// module文件下所有路由表
const moduleRouterList: Array<AppRouteModule> = []
const modules = import.meta.globEager('./modules/**/*.ts');

// 获取所有的moduels下的路由
Object.keys(modules).forEach(key => {
    const mod = modules[key] || {};
    const modList = Array.isArray(mod) ? mod : [mod];
    moduleRouterList.push(...modList)
})



// views文件下所有 vue 和 tsx 文件的路径和文件组成的 map
const viewsComponentsMap: PathComponentsMap = new Map();
const viewsImportGlobMap = import.meta.glob('../../views/**/*.{vue,tsx}')

Object.keys(viewsImportGlobMap).forEach(key => {
    const comp = key.replace('../../views/', '')
    const compKey = comp.toUpperCase();

    if (viewsComponentsMap.has(compKey)) {
        console.warn(`文件${comp}重复，请勿重复创建`)
    } else {
        viewsComponentsMap.set(compKey, viewsImportGlobMap[key])
    }
})

export {
    moduleRouterList,
    viewsComponentsMap
}