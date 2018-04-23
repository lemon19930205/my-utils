<template>
  <div ref="wrapper" class="wrapper">
    <!--滚动区域-->
    <div>

      <slot></slot>

      <!--上拉加载-->
      <div class="bottom-tip">
        <span v-show="!loading" class="tip">{{bottomTip}}</span>
        <div class="bottom-loading" v-show="loading">
          <img src="../assets/image/loading.gif">
          <span class="loading">正在加载...</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      //是否开启纵向滚动
      scrollY: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      },
      //是否全部加载完
      noList: {
        type: Boolean,
        default: false
      },
      //如有动态加载的数据，在动态加载后，重新初始化scroll和重新计算
      againScroll: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        loading: false,
        bottomTip:'上拉加载更多'
      }
    },
    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX
        })


        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        //监听touchEnd比监听scrollEnd的效果好
        // 是否派发滚动到底部上拉加载
        if (this.pullup) {
          this.scroll.on('touchEnd', (pos) => {
            if (pos.y < this.scroll.maxScrollY - 30) {
              //底部上拉判断

              if(this.noList){
                //是否所有数据加载完毕
                this.bottomTip = '已经到底了'
              }else {
                this.loading = true;
                this.$emit('onPullingUp')
              }
            }
          })
        }

        // 是否派发顶部下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            //pos<=>this.scroll
            //console.log(pos, this.scroll.y, this.scroll.maxScrollY);
            if (pos.y > 50) {
              //顶部下拉判断
              this.$emit('pulldown')
            }
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      finishPullUp() {
        // 代理better-scroll的finishPullUp方法
        this.scroll && this.scroll.finishPullUp()
      },
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.loading = false;
          this.finishPullUp();
          this.refresh()
        }, this.refreshDelay)
      },
      againScroll(){
        setTimeout(() => {
          this._initScroll();
          this.finishPullUp();
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }

</script>

<style scoped lang="less">
  .wrapper {
    //position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .bottom-tip {
      width: 100%;
      height: 60px;
      //line-height: 100px;
      text-align: center;
      .tip{
        height: 60px;
        line-height: 60px;
      }
      .bottom-loading{
        height: 60px;
        img {
          display: block;
          width: 30px;
          height: 30px;
          margin: 0 auto;
        }
        .loading{
          display: block;
          height: 30px;
        }
      }

    }
  }
</style>
