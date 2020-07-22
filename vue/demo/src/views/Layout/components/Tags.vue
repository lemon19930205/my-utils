<template>
  <div class="tags">
    <el-tag
      v-for="item in tabs"
      :key="item.path"
      :type="activeRouter===item.path?'danger':''"
      closable
      :disable-transitions="false"
      @click="handleClick(item)"
      @close="handleClose(item)"
    >{{item.title}}</el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ADD_TABS, REMOVE_TABS } from "@/store/mutation-types";

export default {
  name: "tags",
  data() {
    return {
      activeRouter: ""
    };
  },
  components: {},
  created() {
    this.activeRouter = this.$router.currentRoute.path;
  },
  methods: {
    handleClick(tag) {
      this.$router.push(tag.path);
    },
    handleClose(tag) {
      let activeIndex = 0;
      this.tabs.forEach((item, index) => {
        if (item.path === tag.path) {
          activeIndex = index;
        }
      });
      if (activeIndex !== 0) {
        activeIndex--;
      }
      this.$store.commit("REMOVE_TABS", tag.path);
      console.log(this.tabs.length);
      if (tag.path === this.activeRouter && this.tabs.length > 0) {
        this.$router.push(this.tabs[activeIndex].path);
      }
    }
  },
  computed: {
    ...mapState(["tabs"])
  },
  watch: {
    $route(to, from) {
      this.activeRouter = to.path;
      this.$store.commit("ADD_TABS", to.path);
    },
    "$store.getters.loading"() {
      this.$store.commit("ADD_TABS", this.$router.currentRoute.path);
    }
  }
};
</script>

<style scoped lang="less">
.active_tag {
  color: #777;
  background: #777;
}
</style>