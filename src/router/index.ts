import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index.vue'
import 'nprogress/nprogress.css'
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  { path: '/test', name: 'Test', component: () => import('@/views/test/index.vue') },
  {
    path: '/',
    redirect: '/home',
    component: layout,
    children: [{ path: '/home', name: 'home', component: () => import('@/views/home/index.vue'), meta: { name: '首页' } }],
  },
  { path: '/layout/edit', component: () => import('@/views/home/edit.vue') },
  // iframe
  { path: '/scene/:category', component: () => import('@/views/iframe/index.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/error/404.vue') },
]
// 路由实例
// history
// const router: Router = createRouter({ history: createWebHistory(), routes });
// hash #
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
