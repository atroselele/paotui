import Vant from 'vant';
import { Lazyload } from "vant"
import 'vant/lib/index.css';
import { mixin } from "@/mixin/mixin";
export default {
  install(Vue) {
    Vue.use(Vant);
    Vue.use(Lazyload, {
      lazyComponent: true
    });
    Vue.mixin(mixin);
  }
}