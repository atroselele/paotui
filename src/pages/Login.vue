<template>
  <div class="login">
    <van-nav-bar :title="$store.state.title" fixed placeholder safe-area-inset-top left-arrow
      @click-left="$router.back()" />
    <div class="login-form">
      <div class="form">
        <div class="username">
          <label>
            <span class="label">手机号</span>
            <input type="text" v-model="userInfo.mobile" placeholder="请输入手机号" max="11" />
          </label>
        </div>
        <div class="password">
          <label>
            <span class="label">密码</span>
            <input type="password" v-model.trim="userInfo.password" placeholder="请输入密码" />
          </label>
          <div class="forget"><span>忘记密码</span></div>
        </div>
      </div>
      <div class="msg">
        <span>{{ msg }}</span>
      </div>
      <div class="submitBtn" @click="login">
        <span>登录</span>
      </div>
    </div>
    <div class="register">
      <span class="not">没有账号？</span><router-link to="" class="reg">立即注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      msg: "",
      userInfo: { mobile: "18229881462", password: "12345678" },
    };
  },
  watch: {
    "userInfo.mobile"(value, oldVal) {
      if (value.length > 11) {
        this.userInfo.mobile = oldVal;
      }
    },
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    saveTitle() {
      this.$store.commit("SAVE_TITLE", this.$route.meta.title);
    },
    login() {
      this.$store.dispatch("login/saveToken", this.userInfo).then(res => {
        this.$router.push({
          path: "/pages/my/index",
          query: {
            userId: res.userId
          }
        })
      }).catch(err => {
        this.msg = err.msg;
      })
    },
  },

  created() {
    this.saveTitle();
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-color: #fff;

  .login-form {
    padding: 10px;
    box-sizing: border-box;

    .username,
    .password {
      display: flex;
      align-content: center;
      justify-content: space-between;
      padding: 10px;
      border-radius: 50px;
      border: 1px solid #d1d0d0;
      margin-top: 20px;

      label {
        flex-grow: 1;
        padding: 5px;
        display: flex;
        align-content: center;

        input {
          margin-left: 10px;
          height: 100%;
          flex-grow: 1;
          border: none;
          font-size: 16px;
        }
      }

      .forget {
        display: flex;
        flex-flow: wrap;
        align-content: center;
      }
    }

    .msg {
      text-align: center;
      color: #e10c09;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
    }

    .submitBtn {
      width: 90%;
      margin: 0px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      background: linear-gradient(90deg,
          rgba(225, 11, 8, 1) 0%,
          rgba(233, 50, 57, 1) 50%,
          rgba(240, 89, 106, 1) 100%);
      height: 40px;
      color: #fff;
      font-size: 16px;
    }
  }

  .register {
    text-align: center;

    .reg {
      color: #e10c09;
    }
  }
}
</style>
