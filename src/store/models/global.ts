// 全局通用状态管理
import { defineStore } from 'pinia'
type LayoutType = 'vertical' | 'columns' | 'classic' | 'horizontal' | string
interface globalState {
  layout: LayoutType
  isCollapse: Boolean
  tabList: Array<any>
  activePath: string
}
export const useGlobalStore = defineStore('global', {
  state: (): globalState => {
    return {
      layout: 'vertical', // 布局方式
      isCollapse: false,
      tabList: [],
      activePath: '/home',
    }
  },
  getters: {},
  actions: {
    // 设置当前global.ts所有参数值
    setGlobalState(...args: any) {
      this.$patch({ [args[0]]: args[1] })
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },
    addTab(state: any, tab: any) {
      const isSome = state.some((item: any) => item.path === tab.path)
      if (!isSome) {
        this.tabList.push(tab)
      }
    },
  },
  persist: true,
})
