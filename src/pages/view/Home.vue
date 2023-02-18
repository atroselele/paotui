<template>
  <div class="Home">
    <van-nav-bar :title="$store.state.title" fixed placeholder safe-area-inset-top />
    <div class="header">
      <div class="school">
        <div class="school-left" @click="selectSchool(localCampus ?? currentSchool)">
          <div class="school-address">
            <img :src="address" />
          </div>
          <span class="school-name">{{ localCampus ?? currentSchool }}</span>
        </div>
        <div class="school-right">
          <img :src="chat" alt="" />
        </div>
      </div>
      <div class="search">
        <van-search disabled placeholder="请输入搜索关键词搜索任务" @click="toSearchTask" />
      </div>
    </div>
    <div class="main">
      <div class="banner">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="item in bannerList" :key="item.id">
            <img v-lazy="item.imageUrl" :src="item.imageUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="classify">
        <van-swipe class="my-swipe" indicator-color="white">
          <van-swipe-item>
            <div class="classify-list">
              <div class="classify-item" v-for="(item, index) in classListData" :key="index"
                @click="toTaskPage(item.id, item.classifyName)">
                <div class="icon">
                  <img :src="item.classifyIcon" alt="" />
                </div>
                <span class="classList-title">{{ item.classifyName }}</span>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="demand">
        <h2>发布需求</h2>
        <div class="from">
          <van-cell-group>
            <van-field label="我需要" placeholder="请填写需求" />
          </van-cell-group>
          <van-cell-group>
            <van-field label="手机号" placeholder="请填写手机号" />
          </van-cell-group>
        </div>
        <van-button type="danger" block>马上发布需求</van-button>
      </div>
      <div class="newTask">
        <h2>最新任务</h2>
        <div class="newHelpOrderList">
          <div class="newHelpOrderList-item" v-for="item in newHelpOrder.list" :key="item.id">
            <HelpOrder :task="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import address from "@/assets/static/img/address.png";
import chat from "@/assets/static/img/chat.png";
import HelpOrder from "@/components/Help-Order.vue";
import { selectBannerList, selectNewHelpOrderList } from "@/config/api/api";
import { mixin } from "@/mixin/mixin";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: { HelpOrder },
  mixins: [mixin],
  props: ["localCampus"],
  data() {
    return {
      address,
      chat,
      currentSchool: "西安电子科技大学",
      bannerList: [],
      classList: [],
      newHelpOrder: {},
    };
  },
  computed: {
    ...mapGetters("components", ["classListData"]),
  },
  methods: {
    toTaskPage(classifyId, searchValue) {
      this.$router.push({
        name: "taskList",
        query: {
          searchValue,
          classifyId,
          type: "directSearch",
        },
      });
    },
    toSearchTask() {
      this.$router.push({
        name: "taskSearch",
      });
    },
    selectSchool(localCampus) {
      this.$router.push({
        name: "school",
        query: { localCampus },
      });
    },
    getClassList() {
      this.$store.dispatch("components/saveClassList");
    },
    getBannerList() {
      selectBannerList().then((res) => {
        this.bannerList = res.data;
      });
    },
    getNewHelpOrderList() {
      selectNewHelpOrderList().then(({ data }) => {
        this.newHelpOrder = data;
      });
    },
  },
  created() {
    this.getClassList();
    this.getBannerList();
    this.getNewHelpOrderList();
  },
  activated() {
    this.$store.commit("SAVE_TITLE", this.$route.meta.title);
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 0;
}

.van-search {
  padding: 0;
  border-radius: 10px;
}

.van-swipe {
  height: 100%;
}

img {
  height: 100%;
}

.header {
  padding: 3px 15px;
  box-sizing: border-box;
  background-color: #fff;

  .school {
    height: 44px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .school-left {
      height: 50%;
      display: flex;
      justify-content: space-between;

      .school-name {
        position: relative;
        display: flex;
        align-items: center;
        font-weight: 700;
        margin-left: 10px;
        font-size: 14px;
      }

      .school-name::after {
        position: absolute;
        content: "";
        width: 6px;
        height: 6px;
        border: 2px solid black;
        display: inline-block;
        border-left: none;
        border-bottom: none;
        transform: translate(200%, 100%) rotate(45deg);
        right: 0;
        top: 0;
      }
    }

    .school-address {
      height: 100%;
    }

    .school-right {
      height: 50%;
    }
  }
}

.main {
  padding: 10px;

  .banner {
    height: 120px;

    img {
      width: 100%;
    }
  }

  .classify {
    height: 107px;
    padding: 10px 0;

    .classify-list {
      height: 100%;
      display: flex;
      justify-content: space-evenly;

      .classify-item {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .icon {
          height: 50%;
        }
      }
    }
  }

  .demand {
    height: 208px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;

    .from {
      margin: 10px 0;

      .van-field {
        background-color: #f5f5f5;
        margin-bottom: 5px;
      }
    }
  }

  .newTask {
    background-color: #fff;
    padding: 10px;

    .newHelpOrderList {
      margin-top: 10px;

      .newHelpOrderList-item {
        border-bottom: 2px solid #d8d8d8;
      }
    }
  }
}
</style>