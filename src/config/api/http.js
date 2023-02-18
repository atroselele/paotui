import axios from 'axios';
import Vue from 'vue';
import { Toast } from 'vant';
import { getToken } from '@/utils/cookieHandle';
Vue.use(Toast);

const instance = axios.create({
  baseURL: "https://paotui.xianmxkj.com/sqx_fast",
  timeout: 6000,
  headers: { "Content-Type": "application/json;charset=UTF-8" }
})

instance.interceptors.request.use(request => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  const token = getToken();
  if (token) {
    request.headers["authorization"] = token;
    request.headers["token"] = token;
  }
  return request;
}, error => {
  return Promise.reject(error);
})

instance.interceptors.response.use(response => {
  Toast.clear();
  return response.data;
}, error => {
  Toast.clear();
  return Promise.reject(error);
})

/**
 * @description: get方法，对应 get 请求
 * @return {Object} Promise
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url, params = {}) => instance.get(url, { params });

/**
 * @description: post方法，对应 post请求
 * @return {Object} Promise
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export const post = (url, data = {}) => instance.post(url, data);

/**
 * @description: put方法，对应 put请求
 * @return {Object} Promise
 * @param {*} url [请求的url地址]
 * @param {*} data [请求时携带的参数]
 */
export const put = (url, data = {}) => instance.put(url, data);

/**
 * @description: del方法，对应 delete请求
 * @return {Object} Promise
 * @param {*} url [请求的url地址]
 * @param {*} data [请求时携带的参数]
 */
export const del = (url, data = {}) => instance.delete(url, data);