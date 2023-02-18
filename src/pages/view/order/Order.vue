<template>
  <div>
    <van-nav-bar
      :title="$store.state.title"
      fixed
      placeholder
      safe-area-inset-top
    />
    <div class="content">
      <template v-if="result"> <OrderActive /> </template>
      <template v-else>
        <Stay></Stay>
      </template>
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import Stay from "./Stay.vue";
import OrderActive from "./OrderActive.vue";
import { getCookie, getToken } from "@/utils/cookieHandle";

export default {
  name: "Order",
  components: { Stay, OrderActive },
  mixins: [mixin],
  data() {
    return {
      result: true,
    };
  },
  methods: {
    /* 判断是否存在 token和 userId */
    checkLogin() {
      const RESULT = Boolean(getCookie("userId") && getToken());
      if (!RESULT) {
        this.$store.commit("login/LOGIN_OUT");
      }
      this.result = RESULT;
      console.log(this.result);
    },
  },
  created() {
    this.checkLogin();
  },
  activated() {
    console.log("🚀 ~ activated ~ activated");
    this.checkLogin();
  },
};
</script>

<style scoped lang="scss">
.content {
  height: $page-content-size;
}
</style>