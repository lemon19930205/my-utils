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
        title: '销售管理',
        path: '/market',
        icon: 'el-icon-goods',
        list: [
          {
            title: '销售订单',
            path: '/market/order',
            add: '/market/orderAdd'
          },
          {
            title: '销售出库单',
            path: '/market/outBound'
          },
          {
            title: '销售综合查询',
            path: '/market/integratedQuery',
            list: [
              {
                title: '销售订单报表',
                path: '/market/orderStatement'
              }
            ]
          }
        ]
      }
    ];

    setTimeout(() => {
      commit(SET_SIDE_BAR, sidebar);
    }, 10);
  }
};
