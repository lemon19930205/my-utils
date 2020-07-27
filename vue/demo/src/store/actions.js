import { SET_SIDE_BAR } from './mutation-types';

export default {
  getTabs({ commit }) {
    let sidebar = [
      {
        title: '首页',
        path: '/home/index'
      },
      {
        title: 'demo',
        path: '/demo/index'
      },
      {
        title: 'Tree',
        path: '/Tree/index'
      },
      {
        title: '代码片段展示',
        path: '/Code/index'
      }
    ];

    setTimeout(() => {
      commit(SET_SIDE_BAR, sidebar);
    }, 10);
  }
};
