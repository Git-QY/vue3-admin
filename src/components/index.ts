import PageTable from './Table/index.vue'
import Page from './Page/index.vue'
import SvgIcon from './Icon/svgIcon.vue'
import Upload from './FormItem/upload.vue'

import type { App, Component } from 'vue'
// 对外暴露插件对象，注册全局组件
const components: { [name: string]: Component } = {
  PageTable,
  Page,
  SvgIcon,
  Upload,
}
export default {
  // install方法， Object.keys()得到对象所有的key
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
