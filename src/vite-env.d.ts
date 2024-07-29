/// <reference types="vite/client" />
// 环境变量
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

// App 全局变量声明
declare namespace App {
  // tabsList
  interface TabItem {
    title: string
    fullPath: string
    icon?: string
  }
}

declare module 'vue-grid-layout' {
  import VueGridLayout from 'vue-grid-layout'

  export default VueGridLayout
}

declare module 'three'
declare module 'spark-md5'
declare module '@wangeditor/editor-for-vue' {
  import { Editor, Toolbar } from '@wangeditor/editor'
  export { Editor, Toolbar }
}
declare global {
  interface Window {
    _iconfont_svg_string_4388344?: string
  }
}
