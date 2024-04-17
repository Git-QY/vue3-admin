import { createApp, App } from 'vue'
import '@/styles/index.scss' // 全局样式
import '@/assets/iconfont/iconfont.js' // 引入iconfont图标库
import APP from './App.vue'

const app: App = createApp(APP) // 创建vue实例
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router' // 注册路由
import pinia from '@/store' // 注册Pinia

import ElementPlus from 'element-plus' // ElementPlus
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // ElementPlus图标
import 'element-plus/dist/index.css' // ElementPlus样式

// 注册公共组件
import SvgIcon from '@/components/Icon/svgIcon.vue' // svg图标组件

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('SvgIcon', SvgIcon)

app.use(router)
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.mount('#app')
