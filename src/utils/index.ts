import type { Component } from './../router/types';
// export const withInstall = <T>(component: T, alias?: string) => {
//     const comp = component as any;
//     comp.install = (app: App) => {
//         app.component(comp.name || comp.displayName, component);
//         if (alias) {
//             app.config.globalProperties[alias] = component;
//         }
//     };
//     return component as TR & Plugin;
// };

export const withInstall = <T>(component: T, alias?: string) => {
    const comp = component as any;
    // comp.ins
}

// export const importGlob = (path: string, handleFun) => {
//     const modules = import.meta.globEager(path)
//     handleFun && Object.keys(modules).forEach(handleFun)
// }

/**
 * 树的深度优先遍历
 * @param {Object} root 根节点
 * @param {String} childrenKey 子健名
 * @param {Function} action 对每个结点执行的函数
 */
export function deepFirstTraversal<T>(root: IObject<any> = {}, childrenKey: string, action?: Function) {
    action && action(root, childrenKey);

    const children = root[childrenKey];
    if (!children) return;
    for (let i = 0; i < children.length; i++) {
        deepFirstTraversal(children[i], childrenKey, action);
    }
}

interface IDeepCloneCache {
    original: any,
    copy: any
}

/**
 * 深拷贝
 * @param {Object} 需要被拷贝的对象
 */
export function deepCopy(obj: IObject<any> = {}, cache: IDeepCloneCache[] = []) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    const hit = cache.filter(c => c.original === obj)[0]
    if (hit) return hit.copy

    const copy: any = Array.isArray(obj) ? [] : {}
    cache.push({
        original: obj,
        copy
    })
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}



/**
 * 判断是否是同一天
 * @param {string} start
 * @param {string} end
 * @returns  {boolean}
 */
export const isSameDay = function (start, end) {
    return start.split(" ")[0] === end.split(" ")[0];
};

/**
 *  比较两个时间是否在一个小时内
 * @param {string} start
 * @param {string} end
 * @returns {boolean}
 */
export const isOneHour = function (start, end) {
    return new Date(end).getTime() - new Date(start).getTime() <= 3600 * 1000;
};

/**
 *  将时间戳转换为时间
 * @param {string} str
 */
export const str2time = function (str) {
    let date = new Date(str);
    const year = date.getFullYear(); //四位数年份

    let month = date.getMonth() + 1; //月份(0-11),0为一月份
    month = month < 10 ? "0" + month : month;

    let day = date.getDate(); //月的某一天(1-31)
    day = day < 10 ? "0" + day : day;

    let hours = date.getHours(); //小时(0-23)
    hours = hours < 10 ? "0" + hours : hours;

    let minutes = date.getMinutes(); //分钟(0-59)
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let seconds = date.getSeconds(); //秒(0-59)
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
};

/**
 *  获取最近一小时，如果跨天了，则从0点开始
 * @param {Array} time
 * @returns {Array}
 */
export const getLastHour = function (time = []) {
    if (!Array.isArray(time)) {
        time = [];
    }
    let now = new Date().getTime();
    let oneHour = now - 3600 * 1000;
    let start = str2time(oneHour);
    let end = str2time(now);
    if (isSameDay(start, end)) {
        // 同一天，则默认发送最近一小时
        time.push(start);
        time.push(end);
    } else {
        // 如果隔天，则从当天凌晨开始
        time.push(end.split(" ")[0] + " 00:00:00");
        time.push(end);
    }
    return time;
};

/**
 * 封装 async 函数调用
 * @param {Function} asyncFun async 函数
 */
export const errorCaptured = async (asyncFun, ...args) => {
    try {
        const res = await asyncFun(...args);
        return [null, res];
    } catch (e) {
        return [e, null];
    }
};

export const slicePhone = phone => {
    const idx = phone.indexOf("-");
    if (idx === -1) {
        return { phone, nation_code: "86" };
    }
    return {
        nation_code: phone.slice(1, idx),
        phone: phone.slice(idx + 1),
    };
};

export const checkOverseasPhone = overseasPhone => {
    const { nation_code, phone } = slicePhone(overseasPhone);
    if (nation_code === '86') {
        const reg = /^1[3-9]\d{9}$/;
        return reg.test(phone)
    }
    return phone
};

/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export const urlParse = () => {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}


/**
 * 日期时间格式转换
 * @param date,fmt
 * @returns fmt
 * example fmt='yyyy-MM-dd hh:mm'
 */
export const formatDate = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;

    function padLeftZero(str) {
        return ('00' + str).substr(str.length);
    }
}