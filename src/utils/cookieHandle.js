import Cookie from 'js-cookie'
const SyeToken = "syeToken";

/* 设置Token */
export const setToken = token => Cookie.set(SyeToken, token, { expires: 7 })
/* 获取Token */
export const getToken = () => Cookie.get(SyeToken);
/* 移除Token */
export const removeToken = () => Cookie.remove(SyeToken);

/* 设置Cookie */
export const setCookie = (key, value, expires = 7) => Cookie.set(key, value, { expires })
/* 获取Cookie */
export const getCookie = key => Cookie.get(key);
/* 移除Cookie */
export const removeCookie = key => Cookie.remove(key);

