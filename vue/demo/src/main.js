import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VTree from 'vue-tree-halower'
import 'vue-tree-halower/dist/halower-tree.min.css' // 你可以自定义树的样式

import './style/reset.css'



import App from './App.vue';
import router from './router';
import store from './store/index'


Vue.use(ElementUI);
Vue.use(VTree);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})