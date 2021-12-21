import { envEnum } from '@/enums/index'
const env: any = import.meta.env.VITE_APP_ENV;

export const GREY: IObject<string> = {
    [envEnum.DEV]: "appdr1hjL916288",
    [envEnum.TEST]: "app2h7ud2yt8560",
};


export const greyParams = (p: IObject<any>) => {
    const isGrey = [envEnum.TEST].includes(env);
    return isGrey
        ? { app_id: GREY[env], ...p }
        : p;
};

export const genQuery = (url: string): string => {
    const isGrey = [envEnum.DEV, envEnum.TEST].includes(env);

    return isGrey
        ? `${url}?app_id=${GREY[env]}`
        : url
};

export const grey = (url: string) =>
    genQuery(url).replace("/api/", "/xiaoe_cloud/api/go/");

export const greyNoLogin = (url: string) =>
    genQuery(url).replace("/api/", "/xiaoe_cloud/api/go_no_login/");