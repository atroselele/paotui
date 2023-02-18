import { login, getUserInfo } from "@/config/api/api";
import { setToken, getToken, setCookie, getCookie } from "@/utils/cookieHandle"
export default {
  namespaced: true,
  state: {
    token: getToken() ? getToken() : undefined,
    userId: getToken() ? getCookie("userId") : undefined
  },
  getters: {
    getUserId(state) {
      return state.userId;
    }
  },
  mutations: {
    SAVE_TOKEN(state, param) {
      state.token = param;
      setToken(param);
    },
    SAVE_USER_ID(state, param) {
      state.userId = param;
      setCookie("userId", param)
    },
    LOGIN_OUT(state) {
      state.token = undefined;
      state.userId = undefined;
    }
  },
  actions: {
    saveToken(context, param) {
      return new Promise((resolve, reject) => {
        login(param).then(res => {
          if (res.code === 0) {
            context.commit("SAVE_TOKEN", res.token);
            resolve(res);
          } else if (res.code === 500) {
            reject(res);
          }
        })
      })
    },
    saveUserId(context, param) {
      return new Promise((resolve, reject) => {
        context.commit("SAVE_USER_ID", param);
        getUserInfo(param).then(res => {
          if (res.code === 0) {
            resolve(res.data);
          }
        })
      })
    }
  }
}