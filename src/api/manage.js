import { post, postNl } from "@/utils/http/index";

export const getMenuAuth = (params) =>
  post("/api/xe.client_manager.menu/1.0.0", params);

export const getManagerList = (params) =>
  post("/api/xe.client_manager.list/1.0.0", params);

export const addManager = (params) =>
  post("/api/xe.client_manager.add/1.0.0", params);

export const updateManager = (params) =>
  post("/api/xe.client_manager.update/1.0.0", params);

export const deleteManager = (params) =>
  post("/api/xe.client_manager.del/1.0.0", params);

export const sendCode = (params) =>
  postNl("/api/xe.client_manager.change_code_send/1.0.0", params);

export const checkManageCode = (params) =>
  postNl("/api/xe.client_manager.check_code/1.0.0", params);

export const changeManager = (params) =>
  post("/api/xe.client_manager.change/1.0.0", params);

export const inviteSend = (params) =>
  postNl("/api/xe.client_manager.invite_code_send/1.0.0", params);
