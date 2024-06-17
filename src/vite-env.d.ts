/// <reference types="vite/client" />
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
