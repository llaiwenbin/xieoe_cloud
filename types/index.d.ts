declare interface Fn<T = any, R = T> {
    (...arg: T[]): R
}

declare type LabelValueOptions = {
    label: string,
    value: any,
    [key: string]: string | number | boolean
}

interface IObject<T> {
    [key: string]: T
}

interface IResponse<T = any> {
    code: number;
    msg: string;
    data: T;
}
declare type EmitFn<T = any> = (event: Event, ...arg: T[]) => void