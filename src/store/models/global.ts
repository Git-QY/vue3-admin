// 全局通用状态管理
import { defineStore } from 'pinia'
import { LanguageType, LayoutType } from '../interface'
interface globalState {
  language: LanguageType
  theme: string
  layout: LayoutType
  isCollapse: Boolean
  tabList: Array<any>
  activePath: string
}
export const useGlobalStore = defineStore('global', {
  state: (): globalState => {
    return {
      language: 'Chinese', // 语言
      theme: '', // 主题
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
