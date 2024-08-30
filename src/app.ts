import APP from './App.vue'
// import gif from '@/assets/images/loader-light.gif'

export function createMyApp() {
  const app = createApp({
    setup() {
      const isLoaded = ref(false)
      onMounted(async () => {
        await init()
        console.log('项目初始化完成,进行页面渲染')
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
            // h('img', { src: gif, style: { width: '100px' } }),
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
  console.log("🚀 ~ init ~ globalStore.iconfontUrl:", globalStore.iconfontUrl)

  // 等待 5s
  // await new Promise(resolve => setTimeout(resolve, 5000))
}
