// 全局通用状态管理
import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { LanguageType, LayoutType } from '../interface'
interface globalState {
  isFullscreen: Boolean
  language: LanguageType
  theme: string
  themeColor: string
  layout: LayoutType
  isCollapse: Boolean
  reloadFlag: Boolean
  isDarkSidebar: Boolean
}
export const useGlobalStore = defineStore('global', {
  state: (): globalState => {
    return {
      isFullscreen: false, // 是否全屏
      language: 'Chinese', // 语言
      theme: 'dark', // 主题
      themeColor: '#3582FB', // 主题色
      layout: 'vertical', // 布局方式
      isCollapse: false, // 是否折叠
      reloadFlag: true, // 是否刷新页面
      isDarkSidebar: true, // 是否暗黑侧边栏
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
    // 刷新当前页
    refresh() {
      this.reloadFlag = false
      nextTick(() => {
        this.reloadFlag = true
      })
    },
  },
  persist: true,
})
