export default {
  namespaced:true,
  state: {
    isCollapse: false,
    currentMenu: null,
    tabsList: [{
        path: '/',
        name: 'home',
        label: '首页',
        icon: "s-home",
        url: 'home/home'
      },],

  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      if (val.name === 'home') {
        state.currentMenu = null;
        let result = state.tabsList.findIndex(item => item.name == val.name)
        result === -1 ? state.tabsList.push(val) : ''
      } else {
        state.currentMenu = val;
        let result = state.tabsList.findIndex(item => item.name == val.name)
        result === -1 ? state.tabsList.push(val) : ''
      }
    }
  }
}
