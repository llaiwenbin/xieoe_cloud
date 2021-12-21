import { post, postNl } from "@/utils/http/index";

export const userRegister = (params) =>
  post("/api/xe.user.register/1.0.0", params, true);

export const codeLogin = (params) =>
  post("/api/xe.user.code_login/1.0.0", params, true);

export const pwdLogin = (params) =>
  post("/api/xe.user.password_login/1.0.0", params, true);

export const logout = (params) =>
  postNl("/api/xe.user.login_out/1.0.0", params, true);

export const resetPwd = (params) =>
  post("/api/xe.user.password_reset/1.0.0", params, true);

export const sendCodeForUser = (params) =>
  postNl("/api/xe.user.code_send/1.0.0", params, true);

export const fetchCaptchaId = (params) =>
  getNl("/api/xe.captcha.appid/1.0.0", params, true);

export const fetchVerification = (params) =>
  postNl("/api/xe.sms.do_verification/1.0.0", params, true);

export const checkCodeForKey = (params) =>
  postNl("/api/xe.sms.check_code/1.0.0", params, false);
