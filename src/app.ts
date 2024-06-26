import { createApp, ref, onMounted, h } from 'vue'
import APP from './App.vue'
export function createMyApp() {
  const app = createApp({
    setup() {
      const isLoaded = ref(false)
      onMounted(async () => {
        await init()
        isLoaded.value = true
      })
      return { isLoaded }
    },
    render() {
      return this.isLoaded
        ? h(APP)
        : h(
            'div',
            {
              style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              },
            },
            'Loading...',
          )
    },
  })

  return app
}
import useTheme from '@/hooks/themeColor'
import { useGlobalStore } from '@/store'
import { loadScript } from '@/utils'
const init = async () => {
  // 设置主题色
  const globalStore = useGlobalStore()
  const { setThemeColor, setTheme } = useTheme()
  setThemeColor(globalStore.themeColor)
  setTheme(globalStore.theme)
  // 动态设置iconfont
  // 加载js
  await loadScript(globalStore.iconfontUrl)
}
