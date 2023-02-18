<template>
  <div class="task">
    <van-nav-bar
      :title="$store.state.title"
      fixed
      placeholder
      safe-area-inset-top
      left-arrow
      @click-left="$router.back()"
    />
    <template v-if="takeList.length === 0">
      <Error />
    </template>
    <template v-else>
      <div class="content">
        <div class="tasks" v-for="item in takeList" :key="item.id">
          <HelpOrder :task="item" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { selectHelpOrderByClassifyList } from "@/config/api/api";
import HelpOrder from "@/components/Help-Order.vue";
import Error from "@/pages/view/Error/Error.vue";
export default {
  name: "Task",
  components: { HelpOrder, Error },
  data() {
    return { takeList: [] };
  },
  methods: {
    getHelpOrderByClassifyList(id) {
      selectHelpOrderByClassifyList(id).then(({ data }) => {
        this.takeList = data.list;
        console.log(data.list);
      });
    },
  },
  created() {
    this.getHelpOrderByClassifyList(this.$route.query.classifyId);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit("SAVE_TITLE", vm.$route.query.searchValue);
    });
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 10px;
  .tasks {
    padding: 5px;
  }
}
</style>