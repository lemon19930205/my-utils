<template>
  <div class="tree">
    <input class="tree-search-input" type="text" v-model.lazy="searchword" placeholder="search..." />
    <button class="tree-search-btn" type="button">GO</button>
    <v-tree ref="tree" :data="data" :tpl="tpl" :multiple="true" :halfcheck="true" />
  </div>
</template>

<script>
export default {
  name: 'DemoTree',
  data() {
    return {
      lang: 'zh',
      searchword: '',
      treeData: [
        {
          title: '一级节点',
          expanded: true,
          children: [
            {
              title: '二级节点1',
              expanded: true,
              children: [
                {
                  title: '三级节点1-1'
                },
                {
                  title: '三级节点1-2'
                },
                {
                  title: '三级节点1-3'
                }
              ]
            },
            {
              title: '二级节点2',
              children: [
                {
                  title: "<span style='color: red'>三级节点2-1</span>"
                },
                {
                  title: "<span style='color: red'>三级节点2-2</span>"
                }
              ]
            }
          ]
        }
      ],
      data: [
        {
          id: 114354,
          parent: 0,
          title: 'XXXXXXX科技有限公司',
          expanded: true,
          children: [
            {
              id: 114355,
              parent: 114354,
              title: '总经办',
              children: [
                {
                  id: 114356,
                  parent: 114355,
                  title: '新项目部',
                  children: [
                    {
                      id: 115949,
                      parent: 114356,
                      title: '价格岗',
                      children: [],
                      code: 'D05301632',
                      path: null,
                      icon: null,
                      url: null,
                      open: false,
                      spread: false,
                      checked: false,
                      seq: 1,
                      lev: 4,
                      remark: '7',
                      resType: null,
                      objList: null,
                      roleName: null,
                      resTypePageGroup: '114356_1'
                    },
                    {
                      id: 116110,
                      parent: 114356,
                      title: '助理岗',
                      children: [],
                      code: 'D05301793',
                      path: null,
                      icon: null,
                      url: null,
                      open: false,
                      spread: false,
                      checked: false,
                      seq: 1,
                      lev: 4,
                      remark: '7',
                      resType: null,
                      objList: null,
                      roleName: null,
                      resTypePageGroup: '114356_1'
                    },
                    {
                      id: 116136,
                      parent: 114356,
                      title: '财务综合岗',
                      children: [],
                      code: 'D05301819',
                      path: null,
                      icon: null,
                      url: null,
                      open: false,
                      spread: false,
                      checked: false,
                      seq: 1,
                      lev: 4,
                      remark: '7',
                      resType: null,
                      objList: null,
                      roleName: null,
                      resTypePageGroup: '114356_1'
                    },
                    {
                      id: 116137,
                      parent: 114356,
                      title: '会计岗',
                      children: [],
                      code: 'D05301820',
                      path: null,
                      icon: null,
                      url: null,
                      open: false,
                      spread: false,
                      checked: false,
                      seq: 1,
                      lev: 4,
                      remark: '7',
                      resType: null,
                      objList: null,
                      roleName: null,
                      resTypePageGroup: '114356_1'
                    },
                    {
                      id: 116146,
                      parent: 114356,
                      title: '资金岗',
                      children: [],
                      code: 'D05301829',
                      path: null,
                      icon: null,
                      url: null,
                      open: false,
                      spread: false,
                      checked: false,
                      seq: 1,
                      lev: 4,
                      remark: '7',
                      resType: null,
                      objList: null,
                      roleName: null,
                      resTypePageGroup: '114356_1'
                    },
                    {
                      id: 116211,
                      parent: 114356,
                      title: '商品运营岗',
                      children: [],
                      code: 'D05301894',
                      path: null,
                      icon: null,
                      url: null,
                      open: false,
                      spread: false,
                      checked: false,
                      seq: 1,
                      lev: 4,
                      remark: '7',
                      resType: null,
                      objList: null,
                      roleName: null,
                      resTypePageGroup: '114356_1'
                    }
                  ],
                  code: 'D04300039',
                  path: null,
                  icon: null,
                  url: null,
                  open: false,
                  spread: false,
                  checked: false,
                  seq: 1,
                  lev: 3,
                  remark: '5',
                  resType: null,
                  objList: null,
                  roleName: null,
                  resTypePageGroup: '114355_1'
                },
                {
                  id: 114357,
                  parent: 114355,
                  title: '营销业务部',
                  children: [],
                  code: 'D04300040',
                  path: null,
                  icon: null,
                  url: null,
                  open: false,
                  spread: false,
                  checked: false,
                  seq: 1,
                  lev: 3,
                  remark: '5',
                  resType: null,
                  objList: null,
                  roleName: null,
                  resTypePageGroup: '114355_1'
                },
                {
                  id: 116108,
                  parent: 114355,
                  title: '业务高级副总裁',
                  children: [],
                  code: 'D04301791',
                  path: null,
                  icon: null,
                  url: null,
                  open: false,
                  spread: false,
                  checked: false,
                  seq: 1,
                  lev: 3,
                  remark: '7',
                  resType: null,
                  objList: null,
                  roleName: null,
                  resTypePageGroup: '114355_1'
                },
                {
                  id: 116264,
                  parent: 114355,
                  title: 'CEO',
                  children: [],
                  code: 'D04301947',
                  path: null,
                  icon: null,
                  url: null,
                  open: false,
                  spread: false,
                  checked: false,
                  seq: 1,
                  lev: 3,
                  remark: '7',
                  resType: null,
                  objList: null,
                  roleName: null,
                  resTypePageGroup: '114355_1'
                },
                {
                  id: 116266,
                  parent: 114355,
                  title: '职能高级副总裁',
                  children: [],
                  code: 'D04301949',
                  path: null,
                  icon: null,
                  url: null,
                  open: false,
                  spread: false,
                  checked: false,
                  seq: 1,
                  lev: 3,
                  remark: '7',
                  resType: null,
                  objList: null,
                  roleName: null,
                  resTypePageGroup: '114355_1'
                },
                {
                  id: 117017,
                  parent: 114355,
                  title: '机构负责人',
                  children: [],
                  code: 'D04302700',
                  path: null,
                  icon: null,
                  url: null,
                  open: false,
                  spread: false,
                  checked: false,
                  seq: 1,
                  lev: 3,
                  remark: '7',
                  resType: null,
                  objList: null,
                  roleName: null,
                  resTypePageGroup: '114355_1'
                }
              ],
              code: 'D03300038',
              path: null,
              icon: null,
              url: null,
              open: false,
              spread: true,
              checked: false,
              seq: 1,
              lev: 2,
              remark: '5',
              resType: null,
              objList: null,
              roleName: null,
              resTypePageGroup: '114354_1'
            },
            {
              id: 114358,
              parent: 114354,
              title: '综合部',
              children: [
                {
                  id: 116269,
                  parent: 114358,
                  title: '职能副总裁',
                  children: [],
                  code: 'D04301952',
                  path: null,
                  icon: null,
                  url: null,
                  open: false,
                  spread: false,
                  checked: false,
                  seq: 1,
                  lev: 3,
                  remark: '7',
                  resType: null,
                  objList: null,
                  roleName: null,
                  resTypePageGroup: '114358_1'
                },
                {
                  id: 116368,
                  parent: 114358,
                  title: '综合岗',
                  children: [],
                  code: 'D04302051',
                  path: null,
                  icon: null,
                  url: null,
                  open: false,
                  spread: false,
                  checked: false,
                  seq: 1,
                  lev: 3,
                  remark: '7',
                  resType: null,
                  objList: null,
                  roleName: null,
                  resTypePageGroup: '114358_1'
                },
                {
                  id: 117289,
                  parent: 114358,
                  title: '顾问',
                  children: [],
                  code: 'D04302972',
                  path: null,
                  icon: null,
                  url: null,
                  open: false,
                  spread: false,
                  checked: false,
                  seq: 1,
                  lev: 3,
                  remark: '7',
                  resType: null,
                  objList: null,
                  roleName: null,
                  resTypePageGroup: '114358_1'
                }
              ],
              code: 'D03300041',
              path: null,
              icon: null,
              url: null,
              open: false,
              spread: true,
              checked: false,
              seq: 1,
              lev: 2,
              remark: '5',
              resType: null,
              objList: null,
              roleName: null,
              resTypePageGroup: '114354_1'
            }
          ]
        }
      ]
    };
  },
  methods: {
    // tpl (node, ctx, parent, index, props) {
    tpl(...args) {
      let { 0: node, 2: parent, 3: index } = args;
      console.log(node, node.title, node.checked, node.halfcheck);
      const iconClass = node.children.length
        ? node.expanded
          ? 'el-icon-folder-opened'
          : 'el-icon-folder'
        : 'el-icon-user';
      return (
        <span>
          <i class={'tag-icon ' + iconClass}></i>
          <label for={'checkbox-' + node.id}>
            <input
              type="checkbox"
              id={'checkbox-' + node.id}
              class={node.checked && node.halfcheck ? 'indeterminate' : ''}
              checked={node.checked}
              onChange={() => {
                this.$refs.tree.nodeSelected(node);
              }}
            ></input>
            <span
              domPropsInnerHTML={node.title}
              class={node.checked && node.halfcheck ? 'indeterminate' : ''}
            ></span>
          </label>
        </span>
      );
    }
    /* async asyncLoad(node) {
      this.$set(node, 'loading', true);
      let pro = new Promise(resolve => {
        setTimeout(resolve, 2000, ['async node1', 'async node2']);
      });
      this.$refs.tree1.addNodes(node, await pro);
      this.$set(node, 'loading', false);
    },
    search() {
      this.$refs.tree.searchNodes(this.searchword);
    } */
  }
};
</script>

<style lang="scss">
.halo-tree {
  overflow: hidden;
  .tree-node-el {
    .tree-expand {
      position: absolute;
      top: 4px;
      left: -30px;
      &:hover {
        background: #fff;
      }
    }
    .tag-icon {
      font-size: 19px;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
  .inputCheck {
    display: none;
  }
  .indeterminate {
    border: 1px solid red;
  }
}
</style>
