import { defineStore } from 'pinia'

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
      this.token = ''
      this.userInfo = {}
    },
  },
  persist: true,
})
