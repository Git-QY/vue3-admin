// 全局通用状态管理
import { defineStore } from 'pinia'
import { Menu, listMenuByUserId } from '@/api'
import { listToTree, deepClone } from '@/utils'
import { Router } from 'vue-router'

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
        // 目前首页(不需要注册成菜单 默认展示)
        const home = { id: '1', sort: 0, parentId: '0', menuName: '首页', menuType: '1', path: '/home', component: '/home/index' }
        this.permissionsMenus = (res.data || []).concat(home)
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
  const layoutComponent = () => import('@/layout/index.vue') // layout组件
  const appComponent = modules['/src/views/app.vue'] // 生成空的路由组件阶梯2级以下为目录的情况
  const Component = (component?: string) => modules[`/src/views${component}.vue`]
  const newMenus = menus
    .filter((item: Menu) => item.menuType !== '2')
    .map((item: Menu) => {
      const { id, parentId, menuType, menuName, path, component, isHidden, isKeepAlive, isLink } = item
      const meta = { name: menuName, isHidden, isKeepAlive, isLink, parentId, id }
      const argument = { id, parentId, path, meta }
      if (menuType == '0') {
        // 目录是外链(一般不存在)
        if (isLink) {
          return { ...argument, component: iframeComponent }
        }
        // 第一级为目录
        if (parentId == '0') {
          return { ...argument, component: layoutComponent }
        }
        // 第一级以外为目录的情况
        else {
          return { ...argument, component: appComponent }
        }
      } else if (menuType == '1') {
        // 菜单是外链
        if (isLink) {
          return { ...argument, component: iframeComponent }
        }
        // 第一级为菜单
        if (parentId == '0') {
          return { id, parentId: '0', path: '/', component: layoutComponent, children: [{ ...argument, component: Component(component) }] }
        }
        // 第一级以外为菜单的情况
        else {
          return { ...argument, component: Component(component) }
        }
      } else {
        console.warn('按钮不生成路由')
      }
    })
  listToTree(deepClone(newMenus)).forEach(route => router.addRoute(route))
}
