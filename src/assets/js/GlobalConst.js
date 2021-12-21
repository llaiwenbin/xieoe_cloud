const obj = {
    messageDuration: 1000,
    url: {
    // 登录相关
        login: 'xiaoe_cloud/api/login',
        loginOut: 'xiaoe_cloud/api/login_out',
        getVerifyCode: 'xiaoe_cloud/api/get_verify_code',
        checkVerifyCode: 'xiaoe_cloud/api/check_verify_code',
        getJsUrl: 'xiaoe_cloud/api/get_js_url',
        checkCaptcha: 'xiaoe_cloud/api/check_captcha',
        getImgVerifyCode: 'xiaoe_cloud/api/get_img_verify_code',
        checkImgVerifyCode: 'xiaoe_cloud/api/check_img_verify_code',
    },
    version: 1.0
};
window.GlobalConst = obj;
export default obj;
