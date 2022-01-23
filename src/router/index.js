import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [{
    path: '/',
    component: Main,
    meta: { title: '中药治疗失眠用药规律与管理系统' },
    children: [{
      path: '/',
      name: 'home',
      component: () => import('@/pages/components/home/home'),
      meta: { title: '中药治疗失眠用药规律与管理系统' },
    },
    {
      path: '/prescription',
      name: 'prescription',
      component: () => import('@/pages/components/home/prescription/prescription'),
      meta: { title: '方剂系统' },
    },
    {
      name: 'herb',
      path: '/herb',
      component: () => import('@/pages/components/home/herb/herb'),
      meta: { title: '药材系统' },
    },
    {
      name: 'herbAnalysis',
      path: '/herbAnalysis',
      component: () => import('@/pages/components/home/analysis/herbAnalysis'),
      meta: { title: '全局药材分析' },
    },
    {
      name: 'prescriptionAnalysis',
      path: '/prescriptionAnalysis',
      component: () => import('@/pages/components/home/analysis/prercriptionAnalysis'),
      meta: { title: '方剂组成分析' },
    },
  
  

    ]
  }],

})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title || '首页'
  }
  next()
})
export default router
