<template>
  <van-search shape="round" :placeholder="placeholder" />
</template>

<script>
export default {
  name: "v-search",
  props: { placeholder: { type: String } },
  created() {
    console.log(this.placeholder);
  },
};
</script>

<style scoped lang="scss">
</style>