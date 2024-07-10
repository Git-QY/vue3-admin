// 全局通用状态管理
import { defineStore } from 'pinia'
import { Menu, listMenuByUserId } from '@/api'
import { listToTree, deepClone } from '@/utils'

interface authState {
  permissionsMenus: Menu[]
  buttonList: string[]
}
export const useAuthStore = defineStore('auth', {
  state: (): authState => {
    return {
      permissionsMenus: [],
      buttonList: [], // 按钮权限(页面+按钮)
    }
  },
  getters: {},
  actions: {
    // 设置当前global.ts所有参数值
    setGlobalState(...args: any) {
      this.$patch({ [args[0]]: args[1] })
    },
    // 获取当前用户有权限的菜单按钮集合 并且注册路由
    async getPermissionsMenus(userId: string, router: Router) {
      try {
        // 如果用户是管理员默认返回全部的权限（不在乎自身拥有的权限）
        const res = await listMenuByUserId(userId)
        this.permissionsMenus = res.data || []
        this.buttonList = this.permissionsMenus.map((item: Menu) => item.perms)
        await generateRouter(router, this.permissionsMenus)
        return this.permissionsMenus
      } catch (error) {
        console.log(error)
      }
    },
    // 获取当前用户左侧菜单树
    getLeftMenuTree() {
      const leftMenus = this.permissionsMenus.filter((item: Menu) => item.menuType !== '2' && !item.isHidden)
      return listToTree(deepClone(leftMenus))
    },
  },
  persist: true,
})

// 生成路由表
function generateRouter(router: Router, menus: Menu[]) {
  let modules = import.meta.glob('@/views/**/*.vue')
  const iframeComponent = modules['/src/views/iframe/index.vue'] // iframe组件
  const layoutComponent = modules['/src/views/layout/index.vue'] // layout组件
  const Component = (component?: string) => modules[`/src/views${component}.vue`]
  const newMenus = menus
    .filter((item: Menu) => item.menuType !== '2')
    .map((item: Menu) => {
      const { id, parentId, menuType, menuName, path, component, isHidden, isKeepAlive, isLink } = item
      const meta = { name: menuName, isHidden, isKeepAlive, isLink }
      if (parentId === '0' && menuType === '1') {
        return {
          id,
          parentId: '0',
          path: '/',
          component: layoutComponent,
          children: [{ path, component: Component(component), meta }],
        }
      }
      return {
        id,
        parentId,
        path,
        component: isLink ? iframeComponent : menuType === '0' ? layoutComponent : Component(component),
        meta,
      }
    })
  console.log('🚀 ~ generateRouter ~ newMenus:', newMenus)
  listToTree(deepClone(newMenus)).forEach(route => router.addRoute(route))
}
