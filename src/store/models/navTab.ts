import { defineStore } from 'pinia'
import router from '@/router'

interface INavTabState {
  /** 多页签数据 */
  tabsList: App.TabItem[]
  tabMenuOptions: any[]
}

export const useNavTabStore = defineStore({
  id: 'navTab',
  state: (): INavTabState => ({
    tabsList: [{ fullPath: '/home', title: '首页', icon: 'dashboard' }],
    tabMenuOptions: [
      { icon: 'refresh', label: '刷新页面', key: 'refresh', show: true, disabled: false },
      { icon: 'close', label: '关闭当前', key: 'closeCurrent', show: true, disabled: false },
      { icon: 'dArrowLeft', label: '关闭左侧', key: 'closeLeft', show: true, disabled: false },
      { icon: 'dArrowRight', label: '关闭右侧', key: 'closeRight', show: true, disabled: false },
      { icon: 'switch', label: '关闭其他', key: 'closeOther', show: true, disabled: false },
      { icon: 'minus', label: '关闭所有', key: 'closeAll', show: true, disabled: false },
    ],
  }),
  getters: {},
  actions: {
    /** 添加多页签 */
    addTab(tab: App.TabItem) {
      if (this.tabsList.some((v: App.TabItem) => v.fullPath === tab.fullPath)) return
      if (tab.title) this.tabsList.push(tab)
    },
    /** 删除多页签 */
    removeTab(fullPath: string) {
      const isActive = router.currentRoute.value.fullPath === fullPath
      const newTabsList = this.tabsList.filter((v: App.TabItem) => v.fullPath !== fullPath)
      // 如果删除的是当前激活的tab  则激活最后一个tab
      if (newTabsList.length && isActive) {
        router.push(newTabsList[newTabsList.length - 1].fullPath)
      }
      this.tabsList = newTabsList
      // 如果删除的是最后一个tab
      if (this.tabsList.length === 0) {
        router.push('/')
      }
    },
    /** 关闭左侧多页签 */
    closeLeftTabs(fullPath: string) {
      const index = this.tabsList.findIndex(v => v.fullPath === fullPath)
      if (index >= 0) {
        this.tabsList = [...this.tabsList.slice(index)]
        if (this.tabsList.length) router.push(this.tabsList[this.tabsList.length - 1].fullPath)
      }
    },
    /** 关闭右侧多页签 */
    closeRightTabs(fullPath: string) {
      const index = this.tabsList.findIndex(v => v.fullPath === fullPath)
      if (index >= 0) {
        this.tabsList = [...this.tabsList.slice(0, index + 1)]
        if (this.tabsList.length) router.push(this.tabsList[this.tabsList.length - 1].fullPath)
      }
    },
    /** 关闭其他多页签 */
    closeOtherTabs(fullPath: string) {
      const newTabsList = this.tabsList.filter(v => v.fullPath === fullPath)
      if (newTabsList.length) router.push(newTabsList[newTabsList.length - 1].fullPath)
      this.tabsList = newTabsList
    },
    /** 清空多页签 */
    clearTabs() {
      this.tabsList = []
    },
  },
  // persist: true,
})
