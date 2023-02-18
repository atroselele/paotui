<template>
  <div class="tab">
    <div
      class="tab-item"
      :class="{ active: active === index }"
      v-for="(item, index) in business"
      :key="index"
      @click="activeTab(index)"
      @rendered="activeTab(index)"
    >
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: {
    business: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    activeTab(index) {
      this.active = index;
      this.$emit("activeEvent", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  height: 40px;
  display: flex;
  .tab-item {
    width: 50%;
    background: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
  }
}
.active {
  background: #fff !important;
}
</style>