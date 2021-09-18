import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 导入local辅助函数
import localCache from '@/utils/cache'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => {
      return import('../views/main/main.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 导航守卫：判断用户是否登录，如果没登陆，拦截跳转首页，重定向到login页面
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
