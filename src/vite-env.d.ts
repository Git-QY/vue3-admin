/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

// App 全局变量声明
declare namespace App {
  interface TabItem {
    title: string
    fullPath: string
    icon?: string
  } // tabsList
}

// npm包 类型定义

declare module '@wangeditor/editor-for-vue' {
  const Editor: any
  const Toolbar: any
  export { Editor, Toolbar }
}
declare module 'vue-grid-layout' {
  import VueGridLayout from 'vue-grid-layout'
  export default VueGridLayout
}
declare module 'three'
declare module 'spark-md5'
