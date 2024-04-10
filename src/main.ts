import { createApp, App } from 'vue'
import '@/styles/index.scss' // 全局样式
import APP from './App.vue'

const app: App = createApp(APP) // 创建vue实例
import router from '@/router' // 注册路由
import pinia from '@/store' // 注册Pinia

import ElementPlus from 'element-plus' // ElementPlus
import 'element-plus/dist/index.css' // ElementPlus样式

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
