import { defineStore } from 'pinia'
import { useGlobalStore } from './global'
import router from '@/router'

interface UserState {
  token: string
  userInfo: any
}
export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: {},
      token: '',
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
      globalStore.tabList = []
    },
    logout() {
      router.push('/login')
      this.reset()
    },
  },
  persist: true,
})
