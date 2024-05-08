// 全局通用状态管理
import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { LanguageType, LayoutType } from '../interface'
interface globalState {
  isFullscreen: Boolean
  language: LanguageType
  theme: string
  layout: LayoutType
  isCollapse: Boolean
  reloadFlag: Boolean
}
export const useGlobalStore = defineStore('global', {
  state: (): globalState => {
    return {
      isFullscreen: false, // 是否全屏
      language: 'Chinese', // 语言
      theme: '', // 主题
      layout: 'vertical', // 布局方式
      isCollapse: false, // 是否折叠
      reloadFlag: true, // 是否刷新页面
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
