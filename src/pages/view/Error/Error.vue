<template>
  <div class="not">
    <div class="pic"></div>
    <span class="tit">{{ result }}</span>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
    return {
      result: "暂无任务数据",
    };
  },
};
</script>

<style lang="scss" scoped>
.not {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  .pic {
    width: 100px;
    height: 100px;
    background: url("../../../assets/static/img/notBg.png") no-repeat 0 0/100%
      100%;
  }
  .tit {
    color: gray;
  }
}
</style>