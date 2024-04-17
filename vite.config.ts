import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], //这里进行配置别名
  resolve: {
    alias: {
      "@": path.resolve("./src"), // @代替src
    },
  },
  server:{
    proxy:{
      '/test':{
        target:'http://localhost:3000',
        changeOrigin:true,
        ws:false,
        rewrite:(path) => path.replace('/test','')
      }
    }
  }
});