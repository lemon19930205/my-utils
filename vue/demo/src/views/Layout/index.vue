<template>
  <div
    id="layout"
    v-loading="loading"
  >
    <Sidebar></Sidebar>
    <div class="container">
      <Nav></Nav>
      <Tags></Tags>
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Tags from "./components/Tags";
import Nav from "./components/Nav";

export default {
  name: "app",
  components: { Sidebar, Nav, Tags },
  data() {
    return {
      msg: "111"
    };
  },
  created: function() {
    this.$store.dispatch("getTabs");
  },
  mounted: function() {},
  methods: {},
  computed: {
    loading: function() {
      return this.$store.getters.loading;
    }
  },
  watch: {}
};
</script>
<style scoped lang="less">
#layout {
  width: 100%;
  height: 100%;
  display: flex;
  .container {
    flex: 1;
  }
}
</style>
