<template>
  <div class="stay">
    <div class="pic"></div>
    <span class="tit">{{ result }}</span>
    <button class="toLogin" @click="toLogin">去登录</button>
  </div>
</template>
<script>
export default {
  name: "Stay",
  data() {
    return { result: "您还未完成登录" };
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.stay {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .pic {
    width: 100px;
    height: 100px;
    background: url("../../../assets/static/img/login.png") no-repeat 0 0/100%
      100%;
  }
  .tit {
    color: gray;
  }
  .toLogin {
    margin-top: 10px;
    width: 100px;
    height: 30px;
    background-color: #ff3530;
    border: none;
    border-radius: 5px;
    color: #fff;
  }
}
</style>