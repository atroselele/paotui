<template>
  <van-tabs
    sticky
    swipeable
    swipe-threshold="4"
    title-active-color="#000"
    title-inactive-color="#939393"
    @click="isActive"
    @rendered="isActive"
  >
    <van-tab :title="item.classifyName" v-for="item in refactor" :key="item.id">
      <template v-if="takeList.length">
        <div class="content">
          <div class="tasks" v-for="item in takeList" :key="item.id">
            <HelpOrder :task="item" />
          </div>
        </div>
      </template>
      <template v-else>
        <Error />
      </template>
    </van-tab>
  </van-tabs>
</template>

<script>
import HelpOrder from "@/components/Help-Order.vue";
import Error from "@/pages/view/Error/Error.vue";
export default {
  name: "tabs",
  components: { HelpOrder, Error },
  props: {
    classList: {
      type: Array,
      required: true,
    },
    takeList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      refactor: [],
    };
  },
  methods: {
    isActive(index, title) {
      this.$emit("active", index, title);
      this.$bus.$emit("active", index);
    },
    refactorData() {
      const ver = this.classList.every((item) => Boolean(item.classifyName));
      if (ver) {
        this.refactor = this.classList;
      } else {
        this.refactor = this.classList.map((item, index) => {
          return { id: index, classifyName: item };
        });
      }
    },
  },
  watch: {
    classList: {
      immediate: true,
      handler() {
        this.refactorData();
      },
    },
  },
  beforeDestroy() {
    console.log("tabs beforeDestroy");
  },
};
</script>

<style scoped>
.content {
  padding: 10px;
}
.tasks {
  padding: 5px;
}
</style>