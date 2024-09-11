import router from '@/router' // 注册路由
import pinia from '@/store' // 注册Pinia
import '@/styles/index.scss' // 全局样式
import i18n from '@/language/i18n'
import './router/permission' // 权限
import { createMyApp } from './plugins/app.ts'
const app = createMyApp()
import loadPlugins from './plugins/index.ts'
loadPlugins(app)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
