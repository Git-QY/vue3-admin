import { RouteRecordRaw, Router, createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import layout from '@/views/layout/index.vue'
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
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    component: layout,
    meta: { title: '系统管理' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理' },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理' },
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: { title: '菜单管理' },
      },
    ],
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

export default router
