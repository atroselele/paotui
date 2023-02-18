<template>
  <div>
    <my-tab ref="myTab" :business="business"></my-tab>
    <div class="active-business">
      <div
        class="orders-business"
        v-for="(item, index) in business"
        :key="index"
      >
        <template v-if="down === index">
          <tabs :classList="item.project" :takeList="takeList"></tabs>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import tab from "@/components/tab";
import tabs from "@/components/vant/tabs";
import { selectCreateHelpOrder, selectRunHelpOrder } from "@/config/api/api";
export default {
  name: "OrderActive",
  components: { "my-tab": tab, tabs },
  data() {
    return {
      down: 0,
      i: 2,
      takeList: [],
      helpOrderAPI: [selectCreateHelpOrder, selectRunHelpOrder],
      business: [
        {
          title: "发布订单",
          project: ["待接单", "派送中", "已完成", "已下架"],
        },
        {
          title: "跑腿订单",
          project: ["派送中", "已完成"],
        },
      ],
    };
  },
  methods: {
    currentProject() {
      return this.helpOrderAPI.find((item, index) => index === this.down);
    },
  },
  watch: {
    i: {
      immediate: true,
      handler(val) {
        const userId = this.$store.state.login.userId;
        this.currentProject()(userId, val);
      },
    },
  },
  created() {
    this.$bus.$on("active", (i) => {
      this.i = i;
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.myTab.$on("activeEvent", (down) => {
        this.down = down;
      });
    });
  },

  beforeDestroy() {
    this.$refs.myTab.$off("activeEvent");
    this.$bus.$off("active");
  },
};
</script>

<style lang="scss" scoped>
.active-business {
  height: $page-content-size;
}
</style>