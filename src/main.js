import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'animate.css'
import 'element-ui/lib/theme-chalk/index.css';


// 基于准备好的dom，初始化echarts实例
Vue.config.productionTip = false
Vue.use(ElementUI)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
