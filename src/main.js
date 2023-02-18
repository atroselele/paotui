import Vue from 'vue';
import App from './App.vue';
import router from "@/router/index";
import store from '@/store/store';
import plugins from "@/plugins/plugins";
import 'lib-flexible/flexible.js';

Vue.use(plugins);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  beforeCreate() { Vue.prototype.$bus = this; },
  router,
  store
}).$mount('#app')



