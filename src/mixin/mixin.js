export const mixin = {
  data() {
    return {
    }
  },
  activated() {
    this.$store.commit("SAVE_TITLE", this.$route.meta.title);

  },

}