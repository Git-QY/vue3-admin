import { RouteRecordRaw, Router, createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'
import layout from '@/views/layout/index.vue'
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'Login', component: () => import('@/views/login/index.vue') },
  { path: '/test', name: 'Test', component: () => import('@/views/test/index.vue') },

  {
    path: '/',
    name: 'Layout',
    component: layout,
    children: [{ path: 'home', name: 'Home', component: () => import('@/views/home/index.vue'), children: [] }],
  },
]
// 路由实例
// history
// const router: Router = createRouter({ history: createWebHistory(), routes });
// hash #
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!useUserStore().token) {
    if (to.path === '/login' || to.path === '/loginWithGitee') {
      next()
    } else {
      ElMessage.error('还未登录，请先登录')
      next('/login')
    }
  } else {
    next()
  }
})

export default router
