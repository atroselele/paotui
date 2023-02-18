import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import components from "./model/components"
import login from "./model/login"
const store = new Vuex.Store({
  modules: {
    components, login
  },
  state: {
    title: "",
    token: ""
  },
  getters: {
    getTitle(state) {
      return state.title;
    }
  },
  mutations: {
    SAVE_TITLE(state, param) {
      state.title = param;
    },

  },
})

export default store;