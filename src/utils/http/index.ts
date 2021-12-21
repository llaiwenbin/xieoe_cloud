import request from './request';
import { errorCaptured } from '@/utils/index'
import { greyNoLogin, grey, greyParams } from './gary';

export const get = (url, params, noToken) =>
    errorCaptured(
        request.get,
        noToken ? greyNoLogin(url) : grey(url),
        greyParams(params)
    );

export const post = (url, params, noToken) =>
    errorCaptured(
        request.post,
        noToken ? greyNoLogin(url) : grey(url),
        greyParams(params)
    );

export const getNl = (url, params, noToken) =>
    errorCaptured(
        request.get,
        noToken ? greyNoLogin(url) : grey(url),
        greyParams(params)
    );

export const postNl = (url, params, noToken) =>
    errorCaptured(
        request.post,
        noToken ? greyNoLogin(url) : grey(url),
        greyParams(params)
    );