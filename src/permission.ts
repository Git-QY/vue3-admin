import router from './router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
// 路由守卫

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  nProgress.start()
  const userStore = useUserStore()
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 没写addRouter 先请求menus
      await userStore.setMenus()
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
