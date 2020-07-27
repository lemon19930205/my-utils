import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '@/views/Layout';

//各模块路由
//import marketRouter from './pages/market';

export const defaultRouter = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        name: 'index',
        path: 'index',
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    name: 'demo',
    path: '/demo',
    component: Layout,
    children: [
      {
        name: 'index',
        path: 'index',
        component: () => import('@/views/Demo')
      }
    ]
  },
  {
    name: 'Tree',
    path: '/Tree',
    component: Layout,
    children: [
      {
        name: 'index',
        path: 'index',
        component: () => import('@/views/Tree')
      }
    ]
  },
  {
    name: 'Code',
    path: '/Code',
    component: Layout,
    children: [
      {
        name: 'index',
        path: 'index',
        component: () => import('@/views/Code')
      }
    ]
  }
];

export default new Router({
  routes: defaultRouter
});
