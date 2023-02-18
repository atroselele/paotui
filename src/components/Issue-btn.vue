<template>
  <div class="issue">
    <div class="symbol"></div>
    <span class="tit">发布</span>
  </div>
</template>

<script>
export default {
  name: "Issue-btn",
};
</script>

<style scoped lang="less">
.issue {
  width: 70px;
  height: 70px;
  background-color: #ff3630;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .symbol {
    position: relative;
    height: 20%;
    width: max-content;
    &::before,
    &::after {
      position: absolute;
      content: "";
      background-color: #fff;
      height: 100%;
      width: 2px;
      display: block;
      left: 0;
    }
    &::before {
      transform: rotateZ(90deg) translateY(5%);
    }
    &::after {
      transform: translateX(-50%);
    }
  }
  .tit {
    font-size: 15px;
    font-weight: 400;
    color: #fff;
  }
}
</style>