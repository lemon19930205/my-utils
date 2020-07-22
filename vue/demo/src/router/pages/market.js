//销售管理模块

import Layout from '@/views/Layout'

const market = {
  name: 'market',
  path: '/market',
  redirect: '/market/order',
  component: Layout,
  children: [{
    name: 'marketOrder',
    path: 'order',
    component: () => import('@/views/Market/Order')
  },{
    name: 'marketOutBound',
    path: 'outBound',
    component: () => import('@/views/Market/OutBound')
  }]
}

export default market