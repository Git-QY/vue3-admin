import { defineStore } from 'pinia'
import { useGlobalStore } from './global'
import router from '@/router'
import { Menu, listMenu } from '@/api'
import { listToTree } from '@/utils'
interface UserState {
  token: string
  userInfo: any
  menus: Menu[]
  menusTree: Menu[]
}
export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: {},
      token: '',
      menus: [],
      menusTree: [],
    }
  },
  getters: {},
  actions: {
    // 设置当前所有参数值
    setUserState(...args: any) {
      this.$patch({ [args[0]]: args[1] })
    },
    reset() {
      const globalStore = useGlobalStore()
      this.token = ''
      this.userInfo = {}
      // globalStore.tabList = []
    },
    logout() {
      router.push('/login')
      this.reset()
    },
    async getMenus() {
      try {
        const res = await listMenu()
        this.menus = res.data
        this.menusTree = listToTree(this.menus.map((item: Menu) => ({ ...item, label: item.menuName, value: item.id })))
        return this.menus
      } catch (error) {}
    },
  },
  persist: {
    paths: ['token', 'userInfo', 'menusTree'],
    storage: localStorage,
  },
})
