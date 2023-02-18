<template>
  <div class="Errands">
    <van-nav-bar
      :title="$store.state.title"
      fixed
      placeholder
      safe-area-inset-top
    />
    <tabs ref="vanTabs" :classList="classList" :takeList="takeList"></tabs>
    <div class="issue">
      <IssueBtn />
    </div>
  </div>
</template>

<script>
import { mixin } from "@/mixin/mixin";
import IssueBtn from "@/components/Issue-btn.vue";
import { selectHelpOrderByClassifyList } from "@/config/api/api";
import tabs from "@/components/vant/tabs.vue";
export default {
  name: "Errands",
  components: { tabs, IssueBtn },
  mixins: [mixin],
  data() {
    return {
      isActiveTitle: "",
      takeList: [],
      classList: [],
    };
  },
  methods: {
    isActive(index, title) {
      this.isActiveTitle = title;
      this.getHelpOrderByClassifyList(this.classList[index].id);
    },
    getHelpOrderByClassifyList(id) {
      selectHelpOrderByClassifyList(id).then(({ data }) => {
        this.takeList = data.list;
      });
    },
    async getClassList() {
      const res = await this.$store.dispatch("components/saveClassList");
      this.classList = res;
    },
  },
  created() {
    this.getClassList();
  },
  activated() {
    Boolean(this.classList.length) || this.getClassList();
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.vanTabs.$on("active", this.isActive);
    });
  },
  beforeDestroy() {
    this.$refs.vanTabs.$off("active");
  },
};
</script>

<style scoped lang="scss">
.issue {
  position: fixed;
  right: 10%;
  bottom: 10%;
}
</style>