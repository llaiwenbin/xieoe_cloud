import { postNl } from "@/utils/http/index";

export const getRoleList = (params) =>
  postNl("/xiaoe_cloud/api/role_list", params);

// 权限集申请
export const roleApply = (params) =>
  postNl("/xiaoe_cloud/api/app_role_apply", params);

// api列表
export const fetchApiList = (params) =>
  postNl("/xiaoe_cloud/api/role_api_list", params);

// 获取消息列表
export const fetchMessageList = (params) =>
  postNl("/xiaoe_cloud/api/message_list", params);

// 消息订阅
export const subscribeMessage = (params) =>
  postNl("/xiaoe_cloud/api/message_subscribe", params);

// 获取通知列表
export const getNoticeList = (params) =>
  postNl("/xiaoe_cloud/api/notice_list", params);

export const checkCbUrl = (params) =>
  postNl("/xiaoe_cloud/api/go/xe.mp.call_back_url.check/1.0.0", params);

export * from "./client";

export * from "./manage";

export * from "./user";
