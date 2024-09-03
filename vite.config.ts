import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { visualizer } from 'rollup-plugin-visualizer'
import ViteCompressionPlugin from 'vite-plugin-compression'
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
// 图片压缩
import viteImagemin from 'vite-plugin-imagemin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // 提供 Vue 3 单文件组件支持
    vueJsx(), // 提供 Vue 3 JSX 支持（通过 专用的 Babel 转换插件）
    visualizer(), // 打包分析
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'auto-imports.d.ts',
    }), // 自动按需导入vue3的api
    Components({
      dts: './components.d.ts', // 插件给自动生成的声明文件，需要我们手动导入
      dirs: [], // 如果我们自己的业务组件，如`src/components`下面写的组件也想实现那自动按序导入的话，可以在这里面配置上路径
      resolvers: [],
    }), // 自动按需导入组件
    ViteCompressionPlugin({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: true,
    }), // gzip压缩
    importToCDN({
      modules: [
        { name: 'vue', var: 'Vue', path: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.21/vue.global.prod.min.js' },
        { name: 'vue-router', var: 'VueRouter', path: 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.0.12/vue-router.global.prod.min.js' },
        { name: 'pinia', var: 'Pinia', path: 'https://cdnjs.cloudflare.com/ajax/libs/pinia/2.1.6/pinia.iife.min.js' },
        { name: 'vue-i18n', var: 'VueI18n', path: 'https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/9.3.0-beta.1/vue-i18n.global.prod.js' },
        { name: 'element-plus', var: 'ElementPlus', path: 'https://cdn.jsdelivr.net/npm/element-plus@2.6.3/dist/index.full.js' },
        { name: '@element-plus/icons-vue', var: 'ElementPlusIconsVue', path: 'https://cdn.jsdelivr.net/npm/@element-plus/icons-vue' },
        // { name: '@wangeditor/editor', var: 'wangEditor', path: 'https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest' },
        // { name: '@wangeditor/editor-for-vue', var: 'WangEditorForVue', path: 'https://cdn.jsdelivr.net/npm/@wangeditor/editor-for-vue@latest' },
        // { name: 'markdown-it', var: 'markdownIt', path: 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js'},
        // { name: '@traptitech/markdown-it-katex', var: 'markdownItKatex', path: 'https://cdn.jsdelivr.net/npm/@traptitech/markdown-it-katex@3.6.0/dist/markdown-it-katex.min.js' },
        // { name: 'three', var: 'three', path: 'https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.min.js' },
        // { name: 'highlight.js', var: 'hljs', path: 'https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/lib/index.min.js' },
        // { name: 'echarts', var: 'echarts', path: 'https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js' },
      ],
    }), // 引入cdn
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7, // 动图的优化级别，范围从 1 到 7，值越大优化越强，文件体积越小
        interlaced: false, // 是否使用交错扫描，交错扫描会使图片逐渐清晰，但文件体积更大
      },
      optipng: {
        optimizationLevel: 7, // PNG 图片的优化级别，范围从 1 到 7，值越大优化越强
      },
      mozjpeg: {
        quality: 20, // JPEG 图片的压缩质量，范围从 0 到 100，值越低压缩越强，图片质量越差
      },
      pngquant: {
        quality: [0.8, 0.9], // PNG 图片的压缩质量范围，0.8 到 0.9 之间的值，值越小图片质量越低，体积更小
        speed: 4, // 压缩速度，范围从 1 到 10，值越大速度越快，但压缩效果可能较差
      },
      svgo: {
        plugins: [
          { name: 'removeViewBox' }, // 移除 SVG 的 viewBox 属性，可能会影响缩放效果
          { name: 'removeEmptyAttrs', active: false }, // 不移除 SVG 中的空属性
        ],
      },
    }), // 图片压缩
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
