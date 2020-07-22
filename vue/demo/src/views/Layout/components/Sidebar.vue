<template>
  <div id="sidebar">
    <el-menu
      v-if="tabList&&tabList.length"
      :default-active="activeRouter"
      class="el-menu"
      :collapse="isCollapse"
      background-color="#23406A"
      text-color="#fff"
      active-text-color="#2DB7F5"
      router
    >
      <template v-for="(item,index) in tabList">
        <el-menu-item
          :key="index"
          v-if="!item.list"
          :index="item.path"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu
          :key="index"
          v-if="item.list&&item.list.length"
          :index="item.path"
        >
          <template slot='title'>
            <i
              v-if="item.icon"
              :class="item.icon"
            ></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <template v-for="(val,key) in item.list">
            <el-menu-item
              :key="key"
              v-if="!val.list"
              :index="val.path"
            >
              <span slot="title">{{val.title}}</span>
            </el-menu-item>
            <el-submenu
              :key="key"
              v-if="val.list&&val.list.length"
              :index="val.path"
            >
              <span slot="title">{{val.title}}</span>
              <el-menu-item
                v-for="(v,k) in val.list"
                :key="k"
                :index="v.path"
              >
                <span slot="title">{{v.title}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
    <div
      class="sidebar_switch"
      @click="SidebarSwitch"
    >
      <i
        v-show="!isCollapse"
        class="el-icon-d-arrow-left"
      ></i>
      <i
        v-show="isCollapse"
        class="el-icon-d-arrow-right"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeRouter:""
    };
  },
  created() {
    this.activeRouter = this.$router.currentRoute.path;
  },
  methods: {
    SidebarSwitch: function() {
      this.isCollapse = !this.isCollapse;
    }
  },
  computed: {
    tabList() {
      return this.$store.state.sidebar;
    }
  },
  watch: {
    $route(to, from) {
      this.activeRouter = to.path
    }
  }
};
</script>

<style lang="less">
#sidebar {
  position: relative;
  height: 100%;
  .el-menu {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    border: none;
  }
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  .sidebar_switch {
    position: absolute;
    top: 0;
    right: -50px;
    width: 30px;
    height: 50px;
    padding: 0 10px;
    i {
      display: inline-block;
      line-height: 50px;
      vertical-align: middle;
      font-size: 30px;
    }
  }
}
//在展开状态下正常
//在收起状态下，如果子列表过长，会超出屏幕，引发整体样式问题
.el-menu--vertical {
  ul.el-menu {
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: visible;
  }
}
</style>