<template>
  <div class="page">
    <van-nav-bar
      :title="$store.state.title"
      fixed
      placeholder
      safe-area-inset-top
      left-arrow
      @click-left="$router.back()"
    />
    <div class="selectSchool">
      <div class="isSearch">
        <v-search placeholder="输入学校名称或首字母查询"></v-search>
      </div>
      <div class="schoolList">
        <div class="current-school">
          <div class="description"><span class="tit">当前所选学校</span></div>
          <div class="school">
            <div class="icon">
              <img :src="address" alt="" />
            </div>
            <span class="school-name">{{ currentSchool }}</span>
          </div>
        </div>
        <div class="list-school">
          <ul>
            <li
              class="item-school"
              v-for="item in selectCampusList"
              :key="item.campusId"
              @click="selectSchool(item.campusName)"
            >
              {{ item.campusName }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectCampusList } from "@/config/api/api";
import address from "@/assets/static/img/address.png";
import vSearch from "@/components/v-search.vue";
export default {
  name: "school",
  components: { "v-search": vSearch },
  data() {
    return {
      address,
      currentSchool: "",
      selectCampusList: new Array(),
    };
  },
  methods: {
    getCampusList(localCampus) {
      selectCampusList(localCampus).then(({ data }) => {
        console.log(data);
        this.selectCampusList = data;
      });
    },
    selectSchool(campusName) {
      this.$router.push({
        name: "home",
        query: { campusName },
      });
    },
  },

  created() {
    let currentSchool = this.$route.query.localCampus;
    this.currentSchool || (this.currentSchool = currentSchool);
    this.$store.commit("SAVE_TITLE", this.$route.meta.title);
    this.getCampusList(currentSchool);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => (vm.currentSchool = to.query.localCampus));
  },
};
</script>

<style scoped lang="scss">
.schoolList {
  padding: 0 10px;
  background-color: #fff;
  .current-school {
    height: 50px;
    .description {
      .tit {
        color: #9fa2a4;
      }
    }
    .school {
      display: flex;
      margin-top: 5px;
      align-items: center;
      .icon {
        height: 20px;
      }
      .school-name {
        font-weight: 700;
        margin-left: 5px;
        font-size: 14px;
      }
    }
  }
  .list-school {
    .item-school {
      border-bottom: 1px solid #f1f1f1;
      font-size: 14px;
      padding: 15px 0;
    }
  }
}
</style>