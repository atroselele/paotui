<template>
  <div id="index">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar
      active-color="#ee0a24"
      inactive-color="#b5b5b5"
      route
      safe-area-inset-bottom
      placeholder
    >
      <van-tabbar-item
        v-for="(item, index) in tabbar.list"
        :key="index"
        replace
        :to="item.path"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import tabbarIcon from "@/config/icon";
export default {
  name: "Index",
  data() {
    return {
      tabbar: {
        list: [
          {
            title: "首页",
            icon: {
              inactive: tabbarIcon.home,
              active: tabbarIcon.home_selected,
            },
            path: "/pages/home/index",
          },
          {
            title: "跑腿池",
            icon: {
              inactive: tabbarIcon.errands,
              active: tabbarIcon.errands_selected,
            },
            path: "/pages/errands/index",
          },
          {
            title: "订单",
            icon: {
              inactive: tabbarIcon.order,
              active: tabbarIcon.order_selected,
            },
            path: "/pages/order/index",
          },
          {
            title: "我的",
            icon: {
              inactive: tabbarIcon.my,
              active: tabbarIcon.my_selected,
            },
            path: "/pages/my/index",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
#index {
  height: 100%;
}
</style>