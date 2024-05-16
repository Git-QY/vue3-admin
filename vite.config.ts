import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], //这里进行配置别名
  resolve: {
    alias: {
      '@': path.resolve('./src'), // @代替src
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/likepoems': {
        target: 'https://api.likepoems.com/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/likepoems/, ''),
      },
    },
  },
})
