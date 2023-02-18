<template>
  <div class="my">
    <div class="user-header">
      <div class="user-info">
        <div class="info-left">
          <div class="headPicture">
            <img :src="HeadPicture" alt="" />
          </div>
          <div class="login">
            <template v-if="isLogin">
              <div class="user-info-box">
                <div class="nickName">
                  <span class="name">{{ userInfo.nickName }}</span>
                  <div class="icon">
                    <img :src="man" alt="">
                  </div>
                  <div class="inActive">
                    <span>审核中</span>
                  </div>
                </div>
                <div class="invitationCode">
                  <span>邀请码：{{ userInfo.invitationCode }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              <div @click="toLogin">
                <span class="tit">登录</span>
              </div>
            </template>
          </div>
        </div>
        <div class="info-right">
          <div class="icon">
            <img :src="info" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="servlet">
      <div class="servlet-list" v-for="(keys, index) in servlet" :key="index">
        <div class="servlet-item" @click="callback(item.event)" v-for="(item, index) in keys" :key="index">
          <div class="content">
            <div class="content-icon">
              <img :src="item.icon" />
            </div>
            <span class="content-title">{{ item.title }}</span>
          </div>
          <div class="arrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import man from "@/assets/static/img/man.png"
import HeadPicture from "@/assets/static/img/logo.png";
import info from "@/assets/static/img/info.3273cdb6.png";
import icon from "@/config/icon";
import { mixin } from "@/mixin/mixin";
import { getCookie, removeCookie } from "@/utils/cookieHandle";
export default {
  name: "User",
  mixins: [mixin],
  data() {
    return {
      man,
      HeadPicture,
      info,
      userInfo: "",
      servlet: {
        handle: [
          { icon: icon.jifen, title: "我的积分" },
          { icon: icon.paihang, title: "收益排行" },
          { icon: icon.qianbao, title: "我的钱包" },
          { icon: icon.xinyu, title: "我的信誉" },
          { icon: icon.fenxiang, title: "分享好友" },
        ],
        voip: [
          { icon: icon.kefu, title: "联系客服" },
          { icon: icon.shezhi, title: "设置中心" },
        ]
      }
    };
  },
  computed: {
    isLogin() {
      let state = Boolean(this.$store.state.login.token)
        && Boolean(this.$store.state.login.userId);
      if (state) {
        this.servlet.voip.push({
          icon: icon.loginout,
          title: "退出登录",
          event: this.loginOut
        })
      }
      if (!state && this.servlet.voip.length === 3) {
        this.servlet.voip.pop()
      }
      return state;
    }
  },
  watch: {
    isLogin: {
      handler(state) {
        console.log(state);
      }
    }
  },
  methods: {
    callback(fn) { return fn() },
    /* 退出登录 */
    loginOut() {
      removeCookie("syeToken");
      removeCookie("userId");
      this.$store.commit("login/LOGIN_OUT");
    },
    toLogin() {
      this.$router.push({
        name: "login",
      });
    },
    requestUserId(vm, userId) {
      vm.$store.dispatch("login/saveUserId", userId).then(res => {
        this.userInfo = res;
      })
    },
    isToken() {
      if (this.$store.state.login.token) {
        this.requestUserId(this, getCookie("userId"));
      }
    }
  },
  created() {
    this.isToken()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "login" && to.query.userId) {//判断是否从登录页面跳转
        vm.requestUserId(vm, to.query.userId);
      } else {
        const userId = vm.$store.getters["login/getUserId"];
        userId ? vm.requestUserId(vm, userId) : null
      }
    });
  }
};
</script>

<style scoped lang="scss">
.user-header {
  background: url("../../assets/static/img/user-bj.4c0a586e.png");
  height: 185px;
  padding: 10px;
  display: flex;
  align-items: flex-end;

  .user-info {
    flex-grow: 1;
    height: 135px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info-left {
      display: flex;
      align-items: center;
      height: 100%;

      .headPicture {
        height: 40%;
        flex-grow: 1;

        img {
          border-radius: 50%;
        }
      }

      .login {
        margin-left: 10px;
        flex-grow: 9;

        .user-info-box {
          .nickName {
            display: flex;
            height: 30px;
            justify-content: space-between;
            width: 230px;

            span.name {
              color: #fff;
              font-size: 24px;
              font-weight: 700;
            }

            .icon {
              height: 80%;
            }

            .inActive {
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #ff4940;
              height: max-content;
              padding: 4px 8px;
              border-radius: 50px;
              background-color: #fff;
            }
          }

          .invitationCode {
            color: #fff;
          }
        }

        .tit {
          font-weight: 700;
          color: #fff;
          font-size: 20px;
        }
      }
    }

    .info-right {
      height: 100%;
      display: flex;
      align-items: center;

      .icon {
        height: 25px;
      }
    }
  }
}

.servlet {
  .servlet-list {
    margin-bottom: 10px;

    .servlet-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      // background-clip: padding-box;
      height: 46px;
      background-color: #fff;

      .content {
        display: flex;
        height: 100%;
        width: max-content;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        .content-icon {
          height: 50%;
          margin-right: 15px;
        }

        .content-title {
          font-size: 14px;
        }
      }

      .arrow {
        border: 1px solid #949494;
        width: 10px;
        height: 10px;
        border-left: none;
        border-bottom: none;
        transform: rotateZ(45deg);
      }
    }
  }
}
</style>