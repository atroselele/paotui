import { selectClassList, } from "@/config/api/api"

export default {
  namespaced: true,
  state: {
    classList: "",
  },
  getters: {
    classListData(state) {
      return state.classList
    }
  },
  mutations: {
    SAVE_CLASS_LIST(state, param) {
      state.classList = param;
    }
  },
  actions: {
    saveClassList(context) {
      return new Promise((resolve, reject) => {
        selectClassList().then(({ data }) => {
          context.commit("SAVE_CLASS_LIST", data);
          resolve(data)
        })
      })
    }
  }
}
