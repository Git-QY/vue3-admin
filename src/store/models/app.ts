import { defineStore } from 'pinia'

interface AppState {
  isCollapse: Boolean
}

export const useStoreApp = defineStore('app', {
  state: (): AppState => {
    return {
      isCollapse: false,
    }
  },
  getters: {},
  actions: {},
  persist: true,
})
