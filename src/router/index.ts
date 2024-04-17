import { RouteRecordRaw, Router, createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'
import layout from '@/views/layout/index.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
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
    meta: {
      title: '系统管理',
    },
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/system/users/index.vue'),
        meta: {
          title: '用户管理',
        },
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('@/views/system/roles/index.vue'),
        meta: {
          title: '角色管理',
        },
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

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!useUserStore().token) {
    if (to.path === '/login') {
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
