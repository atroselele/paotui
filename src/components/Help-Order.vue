<template>
  <div class="Help-Order">
    <div class="item-top">
      <span class="description">{{ task.content }}</span>
      <span class="price">赚 &yen;{{ task.commission }}</span>
    </div>
    <div class="tag">
      <van-tag size="medium" type="warning">标签</van-tag>
    </div>
    <div class="item-bottom">
      <div class="user">
        <div class="icon">
          <img :src="logo" />
        </div>
        <span class="phone">{{ task.nickName }}</span>
      </div>
      <span class="time">{{ task.createTime }}</span>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/static/img/logo.png";

export default {
  name: "Help-Order",
  props: {
    task: Object,
  },
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped lang="scss">
$numColor: #66717e;

img {
  height: 100%;
}
.Help-Order {
  padding: 10px;
  background: #fff;
}
.item-top {
  display: flex;
  justify-content: space-between;
  .description {
    font-size: 16px;
    font-weight: 700;
  }
  .price {
    color: #ff3530;
    font-size: 15px;
    font-weight: 700;
    // letter-spacing: 2px;
  }
}
.tag {
  margin: 10px 5px 10px 0;
}
.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user {
    display: flex;
    align-items: center;
    .icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      img {
        border-radius: 50%;
      }
    }
    .phone {
      color: $numColor;
    }
  }
  .time {
    color: $numColor;
  }
}
</style>