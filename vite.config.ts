import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'auto-imports.d.ts',
    }),
    Components({
      dts: './components.d.ts', // 插件给自动生成的声明文件，需要我们手动导入
      dirs: [], // 如果我们自己的业务组件，如`src/components`下面写的组件也想实习那自动按序导入的话，可以在这里面配置上路径
      resolvers: [],
    }),
  ], //这里进行配置别名
  resolve: {
    alias: {
      '@': path.resolve('./src'), // @代替src
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      '/likepoems': {
        target: 'https://api.likepoems.com/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/likepoems/, ''),
      },
    },
  },
})
