<template>
  <div class="page">
    demo页
    <div class="box">
      <div class="a"></div>
      <div class="b"></div>
      <div class="c"></div>
    </div>
    <div class="className1" id="className1">
      <div class="className2">
        <div class="className3">
          <div class="className4">
            <div class="className5">
              <div class="className6">
                <div class="className7">
                  <div class="className8">
                    <div class="className9">
                      <div class="className10">
                        <div class="className11">
                          <div class="className12">
                            <div class="className13">
                              <div class="className14">
                                <div class="className15">
                                  <div
                                    class="className16"
                                    id="idName"
                                  >

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "222"
    };
  },
  created() {
    //this.dataFn();
  },
  methods: {
    init: function() {
      let obj = {
        y: 7777,
        saf: function() {
          console.log(555);
        }
      };
      let a = {
        a: 1,
        b: 2,
        c: obj
      };
      let b = {
        ...a
      };
      b.c.y = 666;
      console.log(a);
      console.log(a.c === b.c);
    },
    init2: function() {
      console.log(a, b, c);
      let a = "let";
      var b = "var";
      //let a = "let";
      var b = "var2";
      const c = "const";
      console.log(a, b, c);
    },
    init3: function() {
      /* async function getUserByAsync() {
        let user = await fetchUser();
        return user;
      }
      const user = await getUserByAsync()
      console.log(user); */
    },
    vueLifeCycle: function(vm) {
      //vue的生命周期

      new Vue({});

      //初始化Vue实例
      function _init() {
        //挂载属性
        initLifeCycle(vm);
        //初始化事件系统，钩子函数等
        initEvent(vm);
        //编译 slot\vnode
        initRender(vm);
        //触发钩子
        callHook(vm, "beforeCreate");
        //添加inject功能
        initInjection(vm);
        //完成数据响应性 props/data/watch/computed/methods
        initState(vm);
        //添加 provide 功能
        initProvide(vm);
        //触发钩子
        callHook(vm, "created");

        //挂载节点
        if (vm.$option.el) {
          vm.$mount(vm.$option.el);
        }
      }

      //挂载节点实现
      function mountComponent(vm) {
        //获取 render function
        if (!this.options.render) {
          //template to render
          //Vue.compile = compileToFunctions
          let { render } = compileToFunctions();
          this.options.render = render;
        }
        //触发钩子
        callHook("beforeMounte");
        //初始化观察者
        //render 渲染 vdom
        vdom = vm.render();
        //update:根据 diff 出的 patchs 挂载成真实 dom
        vm._update(vdom);
        //触发钩子
        callHook(vm, "mounted");
      }

      //更新节点实现
      function queueWatcher(watcher) {
        nextTick(flushScheduleQueue);
      }

      //清空队列
      function flushScheduleQueue() {
        //遍历队列中所有修改
        for (key in obj) {
          //beforeUpdate
          watcher.bofore();

          //依赖局部更新节点
          watcher.update();
          callHook("updated");
        }
      }

      //销毁实例实现
      Vue.prototype.$destory = function() {
        //触发钩子
        callHook(vm, "beforeDestory");
        //自身及子节点
        remove();
        //删除依赖
        watcher.teardown();
        //删除监听
        vm.$off();
        //触发钩子
        callHook(vm, "destoryed");
      };
    },
    vueHijacked: function() {
      //vue 数据响应(数据劫持)

      let data = { a: 1 };
      //数据相应性
      observer(data);

      //初始化观察者
      new Watcher(data, "name", updateComponent);
      data.a = 2;

      //简单标识用于数据更新后的操作
      function updateComponent() {
        vm._update(); //patchs
      }

      //监视对象
      function observer(obj) {
        //遍历对象，使用get/set重新定义每个对象的属性值
        Object.keys(obj).map(key => {
          defineReactive(obj, key, obj[key]);
        });
      }

      function defineReactive(obj, k, v) {
        //递归子属性
        if (type(v) == "object") observer(v);

        //新建依赖收集器
        let dep = new Dep();
        //定义 get/set
        Object.defineProperty(obj, k, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter() {
            //当有获取该属性时，证明依赖于该对象，因此被添加进收集器中
            if (Dep.target) {
              dep.addSub(Dep.target);
            }
            return v;
          },
          //重新设置值时，触发收集器的同志机制
          set: function reactiveSetter(nV) {
            v = nV;
            dep.nofify();
          }
        });
      }

      //依赖收集器
      class Dep {
        constructor() {
          this.subs = [];
        }
        addSub(sub) {
          this.subs.push(sub);
        }
        notify() {
          this.subs.map(sub => {
            sub.update();
          });
        }
      }

      Dep.target = null;

      //观察者
      class Watcher {
        constructor(obj, key, cb) {
          Dep.target = this;
          this.cb = cb;
          this.obj = obj;
          this.key = key;
          this.value = obj[key];
          Dep.target = null;
        }
        addDep(Dep) {
          Dep.addSub(this);
        }
        update() {
          this.value = this.obj[this.key];
          this.cb(this.value);
        }
        before() {
          callHook("beforeUpdate");
        }
      }
    },
    vueVirtualDom: function() {
      //virtual(虚拟) dom 原理实现

      //diff 算法实现
      function diff(oldTree, newTree) {
        //差异收集
        let pathchs = {};
        dfs(oldTree, newTree, 0, pathchs);
        return pathchs;
      }

      function dfs(oldNode, newNode, index, pathchs) {
        let curPathchs = [];
        if (newNode) {
          //当新旧节点的 tagName 和 key 值完全一致时
          if (
            oldNode.tagName === newNode.tagName &&
            oldNode.key === newNode.key
          ) {
            //继续对比属性差异
            let props = diffProps(oldNode.props, newNode.props);
            curPathchs.push({ type: "changeProps", props });
            //递归进入下一层级的比较
            diffChildrens(oldNode.children, newNode.children, index, pathchs);
          } else {
            //当 tagName 或者 key 修改后，表示已经是全新节点，无需再比
            curPathchs.push({ type: "replaceNode", node: newNode });
          }
        }

        //构建出整个差异树
        if (curPathchs.length) {
          if (pathchs[index]) {
            pathchs[index] = pathchs[index].concat(curPathchs);
          } else {
            pathchs[index] = curPathchs;
          }
        }
      }

      //属性对比实现
      function diffProps(oldProps, newProps) {
        let propsPathchs = [];
        //遍历新旧属性列表
        //查找删除项
        //查找修改项
        //查找新增项
        forin(oldProps, (k, v) => {
          if (!newProps.hasOwnProperty(k)) {
            propsPathchs.push({ type: "remove", prop: k });
          } else {
            if (v !== newProps[k]) {
              propsPathchs.push({
                type: "change",
                prop: k,
                value: newProps[k]
              });
            }
          }
        });
        forin(newProps, (k, v) => {
          if (!oldProps.hasOwnProperty(k)) {
            propsPathchs.push({ type: "add", prop: k, value: v });
          }
        });
      }

      //对比子级差异
      function diffChildrens(oldChild, newChild, index, pathchs) {
        //标记子级的删除/新增/移动
        let { change, list } = diffList(oldChild, newChild, index, pathchs);
        if (change.length) {
          if (pathchs[index]) {
            pathchs[index] = pathchs[index].concat(change);
          } else {
            pathchs[index] = change;
          }
        }

        //根据key获取原本匹配的节点，进一步递归从头开始对比
        oldChild.map((item, i) => {
          let keyIndex = list.indexOf(item.key);
          if (keyIndex) {
            let node = newChild[keyIndex];
            //进一步递归对比
            dfs(item, node, index, pathchs);
          }
        });
      }

      //列表对比，主要也是根据 key 值查找匹配项
      //对比出新旧列表的新增/删除/移动
      function diffList(oldList, newList, index, pathchs) {
        let change = [];
        let list = [];
        const newKeys = getKey(newList);
        oldList.map(v => {
          if (newKeys.indexOf(v.key) > -1) {
            list.push(v.key);
          } else {
            list.push(null);
          }
        });

        //标记删除
        for (let i = list.length - 1; i >= 0; i--) {
          if (!list[i]) {
            list.splice(i, 1);
            change.push({ type: "remove", index: i });
          }
        }

        //标记新增和移动
        newList.map((item, i) => {
          const key = item.key;
          const index = list.indexOf(key);
          if (index == -1 || key == null) {
            //新增
            change.push({ type: "add", node: item, index: i });
            list.splice(i, 0, key);
          } else {
            //移动
            if (index !== i) {
              change.push({
                type: "move",
                form: index,
                to: i
              });
              move(list, index, i);
            }
          }
        });

        return { change, list };
      }
    },
    dataFn: function() {
      //data为什么是一个函数

      //如果直接定义data为一个对象
      function a() {}
      a.prototype.data = { name: 555 };
      var a1 = new a();
      var a2 = new a();
      console.log(a1, a1.data);
      a1.data.name = 777;
      console.log(a1, a1.data);
      a2.data.name = 888;
      console.log(a1, a1.data);

      //通过函数返回的方式定义
      function b() {
        this.data = this.data();
      }
      b.prototype.data = function() {
        return { name: 555 };
      };
      var b1 = new b();
      var b2 = new b();
      console.log(b1, b1.data);
      b1.data.name = 777;
      console.log(b1, b1.data);
      b2.data.name = 888;
      console.log(b1, b1.data);
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 300px;
  height: 300px;
  background-color: #eee;
  div {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
  }
  div:first-child{
    border: 10px solid #555
  }
  .a {
    background-color: red;
  }
  .b {
    float: left;
    background-color: green;
  }
  .c {
    position: absolute;
    //left: 0;
    background-color: blue;
  }
}
.className16 {
  width: 100px;
  height: 100px;
}
.className1
  #idName{
  background: #000;
}
#className1 .className16 {
  background: #444;
}
</style>