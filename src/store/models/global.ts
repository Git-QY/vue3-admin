// 全局通用状态管理
import { defineStore } from 'pinia'
type LayoutType = 'vertical' | 'columns' | 'classic' | 'horizontal' | string
interface globalState {
  layout: LayoutType
}

export const useGlobalStore = defineStore('global', {
  state: (): globalState => {
    return {
      layout: 'vertical', // 布局方式
    }
  },
  getters: {},
  actions: {
    // 设置当前global.ts所有参数值
    setGlobalState(...args: any) {
      this.$patch({ [args[0]]: args[1] })
    },
  },
  persist: true,
})
