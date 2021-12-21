import { RouteMeta } from 'vue-router';
import { AppRouteModule, Menu } from '../types';
const LAST_OREDER_NO = 1000;

// 路由生成菜单
const generateMenu = (routersList: AppRouteModule[] = []): Menu[] => {
    const menuList: Menu[] = [];
    routersList.forEach(item => {
        const { orderNo, title, icon, hideMenu, alwaysShow } = item.meta as RouteMeta;

        if (hideMenu) return;

        // 子路由为1时升级为父路由
        const children = generateMenu(item.children)
        let currMeun: Menu;
        if (alwaysShow && children.length == 1) {
            children[0].orderNo = item.orderNo;
            currMeun = children[0]
        } else {
            currMeun = {
                path: item.path,
                orderNo,
                name: title,
                icon,
                children,
                hideMenu
            }
        }

        menuList.push(currMeun)
    })
    sortMenuList(menuList);
    return menuList
}

// 菜单排序
const sortMenuList = (menuList: Menu[]) => {
    return menuList.sort((a, b) => {
        return (a.orderNo || LAST_OREDER_NO) - (b.orderNo || LAST_OREDER_NO)
    })
}