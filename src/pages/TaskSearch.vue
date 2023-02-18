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
    <div class="search-task">
      <v-search placeholder="输入关键字搜索任务"></v-search>
      <div class="search-btn">搜索</div>
    </div>
    <div class="taskList">
      <ul>
        <li
          v-for="item in classListData"
          :key="item.id"
          @click="toTaskPage(item.id, item.classifyName)"
        >
          {{ item.classifyName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import vSearch from "@/components/v-search.vue";
export default {
  name: "task-search",
  components: { "v-search": vSearch },
  data() {
    return {};
  },
  methods: {
    setTitle() {
      let currentSchool = this.$route.query.localCampus;
      this.currentSchool || (this.currentSchool = currentSchool);
      this.$store.commit("SAVE_TITLE", this.$route.meta.title);
    },
    getClassList() {
      this.$store.dispatch("components/SAVE_CLASS_LIST");
    },
    toTaskPage(classifyId, searchValue) {
      this.$router.push({
        name: "taskList",
        query: {
          searchValue,
          classifyId,
          title: searchValue,
          type: "directSearch",
        },
      });
    },
  },
  computed: {
    classListData: {
      get() {
        return this.$store.getters["components/classListData"];
      },
    },
  },
  created() {
    this.setTitle();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => (vm.currentSchool = to.query.localCampus));
  },
};
</script>

<style lang="scss" scoped>
.search-task {
  background: #fff;
  display: flex;
  align-items: center;

  .search-btn {
    font-size: 15px;
    flex-grow: 2;
  }

  .van-search {
    flex-grow: 8;
  }
}

.taskList {
  height: 100vh;
  background: #fff;

  ul {
    padding: 10px;

    li {
      border: 1px solid #f2f2f2;
      color: #555555;
      border-radius: 50px;
      width: max-content;
      padding: 5px 10px;
      font-size: 14px;
      margin-top: 20px;
    }
  }
}
</style>