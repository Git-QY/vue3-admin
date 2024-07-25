import PageTable from './Table/index.vue'
import Page from './Page/index.vue'
import Outlet from './Page/outlet.vue'
import SvgIcon from './Icon/svgIcon.vue'
import Icon from './Icon/index.vue'
import Upload from './FormItem/upload.vue'
import Region from './FormItem/region.vue'
import RichText from './FormItem/richText.vue'
import Form from './Form/index.vue'
import Dialog from './Dialog/index.vue'
import Echarts from './Echarts/index.vue'

import type { App, Component } from 'vue'
// 对外暴露插件对象，注册全局组件
const components: { [name: string]: Component } = {
  PageTable,
  Page,
  Outlet,
  SvgIcon,
  Upload,
  Region,
  RichText,
  Form,
  Dialog,
  Icon,
  Echarts,
}
export default {
  // install方法， Object.keys()得到对象所有的key
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
