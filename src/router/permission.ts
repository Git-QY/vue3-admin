import router from './index'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { useUserStore, useAuthStore } from '@/store'
/** 是否已经生成过路由表 */
let hasRouteFlag: boolean = false
export const resetHasRouteFlag = () => {
  hasRouteFlag = false
}
// 路由守卫
const whiteList = ['/login']
router.beforeEach(async (to, _from, next) => {
  nProgress.start()
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const isToken = !!userStore.token // 是否有token
  if (isToken) {
    if (to.path === '/login') return next({ path: '/' }) // 没写addRouter 先请求menus
    if (hasRouteFlag) return next()
    await userStore.getMenus() // 获取全部菜单
    await authStore.getPermissionsMenus(userStore.userInfo.id, router) // 获取当前用户有权限的菜单按钮集合并且生成路由表
    hasRouteFlag = true
    next({ ...to, replace: true })
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
