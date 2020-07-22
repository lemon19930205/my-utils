import {
  SET_SIDE_BAR,
  ADD_TABS,
  REMOVE_TABS
} from "./mutation-types";

export default {
  [SET_SIDE_BAR](state, sidebar = []) {
    state.sidebar = sidebar;
  },
  /**
   * @description 添加头部导航标签
   * @author laozhou
   * @date 2019-04-18
   * @param {*} state
   * @param {string} [path=''] 要添加标签的路径
   */
  [ADD_TABS](state, path = '') {
    let {
      tabs,
      sidebar
    } = state;
    if (!tabs.some(item => item.path === path)) {
      let first = sidebar.find(item => path.indexOf(item.path) > -1 && !item.disabled);
      if (first) {
        if (first.path === path) {
          state.tabs.push(first);
        } else {
          let second = first.list.find(item => path.indexOf(item.path) > -1 && !item.disabled);
          if (second.path === path) {
            state.tabs.push(second);
          } else {
            let thrdly = second.list.find(item => path.indexOf(item.path) > -1 && !item.disabled);
            if (thrdly.path === path) {
              state.tabs.push(thrdly);
            }
          }
        }
      } else {
        console.log('该模块被禁用');
      }
    }
  },
  /**
   * @description 删除头部导航标签
   * @author laozhou
   * @date 2019-04-18
   * @param {*} state
   * @param {string} [path=''] 选中标签的路径
   * @param {number} [type=0] 0:删除选中标签;1:删除其他标签;2:删除全部标签;
   */
  [REMOVE_TABS](state, path = '', type = 0) {
    let tabs = state.tabs;
    if (type === 0) {
      state.tabs = tabs.filter(item => item.path != path)
    } else if (type === 1) {
      state.tabs = tabs.filter(item => item.path == path)
    } else if (type === 2) {
      state.tabs = []
    }
  },
}