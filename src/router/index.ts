import { RouteRecordRaw, Router, createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
let routes: RouteRecordRaw[] = [{ path: '/login', name: 'Login', component: () => import('@/views/login/index.vue') }]
// 路由实例
// history
// const router: Router = createRouter({ history: createWebHistory(), routes });
// hash #
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
