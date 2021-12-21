import { post, postNl } from "@/utils/http/index";

export const fetchClientList = (params) =>
  post("/api/xe.client.list/1.0.0", params);

export const createClient = (params) =>
  postNl("/api/xe.client.create/1.0.0", params);

export const fetchShopList = (params) =>
  post("/api/xe.administer.shop_list.get/1.0.0", params);

export const bindShop = (params) =>
  postNl("/api/xe.client.shop_bind/1.0.0", params);

export const unbindShop = (params) =>
  postNl("/api/xe.client.shop_unbind/1.0.0", params);

export const rebindShop = (params) =>
  postNl("/api/xe.client.shop_rebind/1.0.0", params);

export const fetchClientShopList = (params) =>
  post("/api/xe.client.shop_list/1.0.0", params);
