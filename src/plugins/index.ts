import { App } from 'vue'
import ElementPlus from 'element-plus' // ElementPlus
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // ElementPlus图标
import 'element-plus/dist/index.css' // ElementPlus样式
import 'element-plus/theme-chalk/dark/css-vars.css' // 引入ElementPlus的暗黑模式css
import VueGridLayout from 'vue-grid-layout' // 栅格布局

import Components from '@/components/index.ts' // 注册公共组件
import Directives from '@/directives/index.ts' // 注册自定义指令
// 加载插件
export default async function loadPlugins(app: App) {
  // elementPlus

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(Components)
  app.use(Directives)
  app.use(ElementPlus)
  app.use(VueGridLayout)
}
