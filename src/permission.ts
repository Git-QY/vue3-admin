import router from './router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
// 路由守卫

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  nProgress.start()
  if (useUserStore().token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      ElMessage.error('还未登录，请先登录')
    }
  }
})
router.afterEach(() => {
  nProgress.done()
})
