<template>
  <div class="page">
    首页 {{msg}}
  </div>
</template>

<script>
import { login } from "@/api/index";

export default {
  name: "home",
  components: {  },
  data() {
    return {
      msg: "111"
    };
  },
  mounted: function() {
    login('admin','123456a').then(res => {
      console.log(res);
    });
  },
  methods: {}
};
</script>

<style scoped lang="less">
</style>