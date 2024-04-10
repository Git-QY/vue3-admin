import { createApp, App } from 'vue'
import '@/styles/index.scss' // 全局样式
import APP from './App.vue'

const app: App = createApp(APP) // 创建vue实例
import router from '@/router' // 注册路由
import pinia from '@/store' // 注册Pinia

app.use(router)
app.use(pinia)
app.mount('#app')
