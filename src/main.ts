import { createApp, App } from 'vue'
import '@/styles/index.scss' // 全局样式
import '@/assets/iconfont/iconfont.js' // 引入iconfont图标库
import APP from './App.vue'

const app: App = createApp(APP) // 创建vue实例
import i18n from '@/language/i18n'
import router from '@/router' // 注册路由
import pinia from '@/store' // 注册Pinia

import ElementPlus from 'element-plus' // ElementPlus
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // ElementPlus图标
import 'element-plus/dist/index.css' // ElementPlus样式
import 'element-plus/theme-chalk/dark/css-vars.css' // 引入ElementPlus的暗黑模式css
import './router/permission'

// 注册公共组件
import Components from '@/components/index.ts'
import Directives from '@/directives/index.ts'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import VueGridLayout from 'vue-grid-layout'

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(Components)
app.use(Directives)
app.use(i18n)
app.use(VueGridLayout)
app.mount('#app')
