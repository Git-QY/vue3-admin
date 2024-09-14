// vite.config.ts
import { defineConfig } from "file:///E:/work/%E6%88%91%E7%9A%84/vue3-admin/node_modules/.pnpm/vite@5.2.8_@types+node@20.12.7_sass@1.74.1/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/work/%E6%88%91%E7%9A%84/vue3-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.8_@types+node@20.12.7_sass@1.74.1__vue@3.5.4_typescript@5.4.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/work/%E6%88%91%E7%9A%84/vue3-admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.1_vite@5.2.8_@types+node@20.12.7_sass@1.74.1__vue@3.5.4_typescript@5.4.4_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import path from "path";
import AutoImport from "file:///E:/work/%E6%88%91%E7%9A%84/vue3-admin/node_modules/.pnpm/unplugin-auto-import@0.18.2_@vueuse+core@10.9.0_vue@3.5.4_typescript@5.4.4___rollup@4.14.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/work/%E6%88%91%E7%9A%84/vue3-admin/node_modules/.pnpm/unplugin-vue-components@0.27.3_@babel+parser@7.25.3_rollup@4.14.1_vue@3.5.4_typescript@5.4.4_/node_modules/unplugin-vue-components/dist/vite.js";
import { visualizer } from "file:///E:/work/%E6%88%91%E7%9A%84/vue3-admin/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@4.14.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import ViteCompressionPlugin from "file:///E:/work/%E6%88%91%E7%9A%84/vue3-admin/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.2.8_@types+node@20.12.7_sass@1.74.1_/node_modules/vite-plugin-compression/dist/index.mjs";
import importToCDN from "file:///E:/work/%E6%88%91%E7%9A%84/vue3-admin/node_modules/.pnpm/vite-plugin-cdn-import@1.0.1_rollup@4.14.1_vite@5.2.8_@types+node@20.12.7_sass@1.74.1_/node_modules/vite-plugin-cdn-import/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    // 提供 Vue 3 单文件组件支持
    vueJsx(),
    // 提供 Vue 3 JSX 支持（通过 专用的 Babel 转换插件）
    visualizer(),
    // 打包分析
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "auto-imports.d.ts"
    }),
    // 自动按需导入vue3的api
    Components({
      dts: "./components.d.ts",
      // 插件给自动生成的声明文件，需要我们手动导入
      dirs: [],
      // 如果我们自己的业务组件，如`src/components`下面写的组件也想实现那自动按序导入的话，可以在这里面配置上路径
      resolvers: []
    }),
    // 自动按需导入组件
    ViteCompressionPlugin({
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: true
    }),
    // gzip压缩
    importToCDN({
      modules: [
        { name: "vue", var: "Vue", path: "https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.21/vue.global.prod.min.js" },
        { name: "vue-router", var: "VueRouter", path: "https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.0.12/vue-router.global.prod.min.js" },
        { name: "pinia", var: "Pinia", path: "https://cdnjs.cloudflare.com/ajax/libs/pinia/2.1.6/pinia.iife.min.js" },
        { name: "vue-i18n", var: "VueI18n", path: "https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/9.3.0-beta.1/vue-i18n.global.prod.js" },
        { name: "element-plus", var: "ElementPlus", path: "https://cdn.jsdelivr.net/npm/element-plus@2.6.3/dist/index.full.js" },
        { name: "@element-plus/icons-vue", var: "ElementPlusIconsVue", path: "https://cdn.jsdelivr.net/npm/@element-plus/icons-vue" }
        // { name: '@wangeditor/editor', var: 'wangEditor', path: 'https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest' },
        // { name: '@wangeditor/editor-for-vue', var: 'WangEditorForVue', path: 'https://cdn.jsdelivr.net/npm/@wangeditor/editor-for-vue@latest' },
        // { name: 'markdown-it', var: 'markdownIt', path: 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js'},
        // { name: '@traptitech/markdown-it-katex', var: 'markdownItKatex', path: 'https://cdn.jsdelivr.net/npm/@traptitech/markdown-it-katex@3.6.0/dist/markdown-it-katex.min.js' },
        // { name: 'three', var: 'three', path: 'https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.min.js' },
        // { name: 'highlight.js', var: 'hljs', path: 'https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/lib/index.min.js' },
        // { name: 'echarts', var: 'echarts', path: 'https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js' },
      ]
    })
    // 引入cdn
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7, // 动图的优化级别，范围从 1 到 7，值越大优化越强，文件体积越小
    //     interlaced: false, // 是否使用交错扫描，交错扫描会使图片逐渐清晰，但文件体积更大
    //   },
    //   optipng: {
    //     optimizationLevel: 7, // PNG 图片的优化级别，范围从 1 到 7，值越大优化越强
    //   },
    //   mozjpeg: {
    //     quality: 20, // JPEG 图片的压缩质量，范围从 0 到 100，值越低压缩越强，图片质量越差
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9], // PNG 图片的压缩质量范围，0.8 到 0.9 之间的值，值越小图片质量越低，体积更小
    //     speed: 4, // 压缩速度，范围从 1 到 10，值越大速度越快，但压缩效果可能较差
    //   },
    //   svgo: {
    //     plugins: [
    //       { name: 'removeViewBox' }, // 移除 SVG 的 viewBox 属性，可能会影响缩放效果
    //       { name: 'removeEmptyAttrs', active: false }, // 不移除 SVG 中的空属性
    //     ],
    //   },
    // }), // 图片压缩
  ],
  //这里进行配置别名
  resolve: {
    alias: {
      "@": path.resolve("./src")
      // @代替src
    }
  },
  server: {
    host: "0.0.0.0",
    port: 9e3,
    proxy: {
      "/likepoems": {
        target: "https://api.likepoems.com/",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/likepoems/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx3b3JrXFxcXFx1NjIxMVx1NzY4NFxcXFx2dWUzLWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFx3b3JrXFxcXFx1NjIxMVx1NzY4NFxcXFx2dWUzLWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi93b3JrLyVFNiU4OCU5MSVFNyU5QSU4NC92dWUzLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcblxyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xyXG5pbXBvcnQgVml0ZUNvbXByZXNzaW9uUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xyXG5pbXBvcnQgaW1wb3J0VG9DRE4sIHsgYXV0b0NvbXBsZXRlIH0gZnJvbSAndml0ZS1wbHVnaW4tY2RuLWltcG9ydCdcclxuLy8gXHU1NkZFXHU3MjQ3XHU1MzhCXHU3RjI5XHJcbi8vIGltcG9ydCB2aXRlSW1hZ2VtaW4gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2VtaW4nXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksIC8vIFx1NjNEMFx1NEY5QiBWdWUgMyBcdTUzNTVcdTY1ODdcdTRFRjZcdTdFQzRcdTRFRjZcdTY1MkZcdTYzMDFcclxuICAgIHZ1ZUpzeCgpLCAvLyBcdTYzRDBcdTRGOUIgVnVlIDMgSlNYIFx1NjUyRlx1NjMwMVx1RkYwOFx1OTAxQVx1OEZDNyBcdTRFMTNcdTc1MjhcdTc2ODQgQmFiZWwgXHU4RjZDXHU2MzYyXHU2M0QyXHU0RUY2XHVGRjA5XHJcbiAgICB2aXN1YWxpemVyKCksIC8vIFx1NjI1M1x1NTMwNVx1NTIwNlx1Njc5MFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSxcclxuICAgICAgZHRzOiAnYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgfSksIC8vIFx1ODFFQVx1NTJBOFx1NjMwOVx1OTcwMFx1NUJGQ1x1NTE2NXZ1ZTNcdTc2ODRhcGlcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICBkdHM6ICcuL2NvbXBvbmVudHMuZC50cycsIC8vIFx1NjNEMlx1NEVGNlx1N0VEOVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NzY4NFx1NThGMFx1NjYwRVx1NjU4N1x1NEVGNlx1RkYwQ1x1OTcwMFx1ODk4MVx1NjIxMVx1NEVFQ1x1NjI0Qlx1NTJBOFx1NUJGQ1x1NTE2NVxyXG4gICAgICBkaXJzOiBbXSwgLy8gXHU1OTgyXHU2NzlDXHU2MjExXHU0RUVDXHU4MUVBXHU1REYxXHU3Njg0XHU0RTFBXHU1MkExXHU3RUM0XHU0RUY2XHVGRjBDXHU1OTgyYHNyYy9jb21wb25lbnRzYFx1NEUwQlx1OTc2Mlx1NTE5OVx1NzY4NFx1N0VDNFx1NEVGNlx1NEU1Rlx1NjBGM1x1NUI5RVx1NzNCMFx1OTBBM1x1ODFFQVx1NTJBOFx1NjMwOVx1NUU4Rlx1NUJGQ1x1NTE2NVx1NzY4NFx1OEJERFx1RkYwQ1x1NTNFRlx1NEVFNVx1NTcyOFx1OEZEOVx1OTFDQ1x1OTc2Mlx1OTE0RFx1N0Y2RVx1NEUwQVx1OERFRlx1NUY4NFxyXG4gICAgICByZXNvbHZlcnM6IFtdLFxyXG4gICAgfSksIC8vIFx1ODFFQVx1NTJBOFx1NjMwOVx1OTcwMFx1NUJGQ1x1NTE2NVx1N0VDNFx1NEVGNlxyXG4gICAgVml0ZUNvbXByZXNzaW9uUGx1Z2luKHtcclxuICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsXHJcbiAgICAgIGV4dDogJy5neicsXHJcbiAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IHRydWUsXHJcbiAgICB9KSwgLy8gZ3ppcFx1NTM4Qlx1N0YyOVxyXG4gICAgaW1wb3J0VG9DRE4oe1xyXG4gICAgICBtb2R1bGVzOiBbXHJcbiAgICAgICAgeyBuYW1lOiAndnVlJywgdmFyOiAnVnVlJywgcGF0aDogJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3Z1ZS8zLjQuMjEvdnVlLmdsb2JhbC5wcm9kLm1pbi5qcycgfSxcclxuICAgICAgICB7IG5hbWU6ICd2dWUtcm91dGVyJywgdmFyOiAnVnVlUm91dGVyJywgcGF0aDogJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3Z1ZS1yb3V0ZXIvNC4wLjEyL3Z1ZS1yb3V0ZXIuZ2xvYmFsLnByb2QubWluLmpzJyB9LFxyXG4gICAgICAgIHsgbmFtZTogJ3BpbmlhJywgdmFyOiAnUGluaWEnLCBwYXRoOiAnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvcGluaWEvMi4xLjYvcGluaWEuaWlmZS5taW4uanMnIH0sXHJcbiAgICAgICAgeyBuYW1lOiAndnVlLWkxOG4nLCB2YXI6ICdWdWVJMThuJywgcGF0aDogJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3Z1ZS1pMThuLzkuMy4wLWJldGEuMS92dWUtaTE4bi5nbG9iYWwucHJvZC5qcycgfSxcclxuICAgICAgICB7IG5hbWU6ICdlbGVtZW50LXBsdXMnLCB2YXI6ICdFbGVtZW50UGx1cycsIHBhdGg6ICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2VsZW1lbnQtcGx1c0AyLjYuMy9kaXN0L2luZGV4LmZ1bGwuanMnIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnQGVsZW1lbnQtcGx1cy9pY29ucy12dWUnLCB2YXI6ICdFbGVtZW50UGx1c0ljb25zVnVlJywgcGF0aDogJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vQGVsZW1lbnQtcGx1cy9pY29ucy12dWUnIH0sXHJcbiAgICAgICAgLy8geyBuYW1lOiAnQHdhbmdlZGl0b3IvZWRpdG9yJywgdmFyOiAnd2FuZ0VkaXRvcicsIHBhdGg6ICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0B3YW5nZWRpdG9yL2VkaXRvckBsYXRlc3QnIH0sXHJcbiAgICAgICAgLy8geyBuYW1lOiAnQHdhbmdlZGl0b3IvZWRpdG9yLWZvci12dWUnLCB2YXI6ICdXYW5nRWRpdG9yRm9yVnVlJywgcGF0aDogJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vQHdhbmdlZGl0b3IvZWRpdG9yLWZvci12dWVAbGF0ZXN0JyB9LFxyXG4gICAgICAgIC8vIHsgbmFtZTogJ21hcmtkb3duLWl0JywgdmFyOiAnbWFya2Rvd25JdCcsIHBhdGg6ICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21hcmtkb3duLWl0QDE0LjEuMC9kaXN0L21hcmtkb3duLWl0Lm1pbi5qcyd9LFxyXG4gICAgICAgIC8vIHsgbmFtZTogJ0B0cmFwdGl0ZWNoL21hcmtkb3duLWl0LWthdGV4JywgdmFyOiAnbWFya2Rvd25JdEthdGV4JywgcGF0aDogJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vQHRyYXB0aXRlY2gvbWFya2Rvd24taXQta2F0ZXhAMy42LjAvZGlzdC9tYXJrZG93bi1pdC1rYXRleC5taW4uanMnIH0sXHJcbiAgICAgICAgLy8geyBuYW1lOiAndGhyZWUnLCB2YXI6ICd0aHJlZScsIHBhdGg6ICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3RocmVlQDAuMTQ2LjAvYnVpbGQvdGhyZWUubWluLmpzJyB9LFxyXG4gICAgICAgIC8vIHsgbmFtZTogJ2hpZ2hsaWdodC5qcycsIHZhcjogJ2hsanMnLCBwYXRoOiAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9oaWdobGlnaHQuanNAMTEuMTAuMC9saWIvaW5kZXgubWluLmpzJyB9LFxyXG4gICAgICAgIC8vIHsgbmFtZTogJ2VjaGFydHMnLCB2YXI6ICdlY2hhcnRzJywgcGF0aDogJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vZWNoYXJ0c0A1LjUuMS9kaXN0L2VjaGFydHMubWluLmpzJyB9LFxyXG4gICAgICBdLFxyXG4gICAgfSksIC8vIFx1NUYxNVx1NTE2NWNkblxyXG4gICAgLy8gdml0ZUltYWdlbWluKHtcclxuICAgIC8vICAgZ2lmc2ljbGU6IHtcclxuICAgIC8vICAgICBvcHRpbWl6YXRpb25MZXZlbDogNywgLy8gXHU1MkE4XHU1NkZFXHU3Njg0XHU0RjE4XHU1MzE2XHU3RUE3XHU1MjJCXHVGRjBDXHU4MzAzXHU1NkY0XHU0RUNFIDEgXHU1MjMwIDdcdUZGMENcdTUwM0NcdThEOEFcdTU5MjdcdTRGMThcdTUzMTZcdThEOEFcdTVGM0FcdUZGMENcdTY1ODdcdTRFRjZcdTRGNTNcdTc5RUZcdThEOEFcdTVDMEZcclxuICAgIC8vICAgICBpbnRlcmxhY2VkOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU0RjdGXHU3NTI4XHU0RUE0XHU5NTE5XHU2MjZCXHU2M0NGXHVGRjBDXHU0RUE0XHU5NTE5XHU2MjZCXHU2M0NGXHU0RjFBXHU0RjdGXHU1NkZFXHU3MjQ3XHU5MDEwXHU2RTEwXHU2RTA1XHU2NjcwXHVGRjBDXHU0RjQ2XHU2NTg3XHU0RUY2XHU0RjUzXHU3OUVGXHU2NkY0XHU1OTI3XHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIG9wdGlwbmc6IHtcclxuICAgIC8vICAgICBvcHRpbWl6YXRpb25MZXZlbDogNywgLy8gUE5HIFx1NTZGRVx1NzI0N1x1NzY4NFx1NEYxOFx1NTMxNlx1N0VBN1x1NTIyQlx1RkYwQ1x1ODMwM1x1NTZGNFx1NEVDRSAxIFx1NTIzMCA3XHVGRjBDXHU1MDNDXHU4RDhBXHU1OTI3XHU0RjE4XHU1MzE2XHU4RDhBXHU1RjNBXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIG1vempwZWc6IHtcclxuICAgIC8vICAgICBxdWFsaXR5OiAyMCwgLy8gSlBFRyBcdTU2RkVcdTcyNDdcdTc2ODRcdTUzOEJcdTdGMjlcdThEMjhcdTkxQ0ZcdUZGMENcdTgzMDNcdTU2RjRcdTRFQ0UgMCBcdTUyMzAgMTAwXHVGRjBDXHU1MDNDXHU4RDhBXHU0RjRFXHU1MzhCXHU3RjI5XHU4RDhBXHU1RjNBXHVGRjBDXHU1NkZFXHU3MjQ3XHU4RDI4XHU5MUNGXHU4RDhBXHU1REVFXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIHBuZ3F1YW50OiB7XHJcbiAgICAvLyAgICAgcXVhbGl0eTogWzAuOCwgMC45XSwgLy8gUE5HIFx1NTZGRVx1NzI0N1x1NzY4NFx1NTM4Qlx1N0YyOVx1OEQyOFx1OTFDRlx1ODMwM1x1NTZGNFx1RkYwQzAuOCBcdTUyMzAgMC45IFx1NEU0Qlx1OTVGNFx1NzY4NFx1NTAzQ1x1RkYwQ1x1NTAzQ1x1OEQ4QVx1NUMwRlx1NTZGRVx1NzI0N1x1OEQyOFx1OTFDRlx1OEQ4QVx1NEY0RVx1RkYwQ1x1NEY1M1x1NzlFRlx1NjZGNFx1NUMwRlxyXG4gICAgLy8gICAgIHNwZWVkOiA0LCAvLyBcdTUzOEJcdTdGMjlcdTkwMUZcdTVFQTZcdUZGMENcdTgzMDNcdTU2RjRcdTRFQ0UgMSBcdTUyMzAgMTBcdUZGMENcdTUwM0NcdThEOEFcdTU5MjdcdTkwMUZcdTVFQTZcdThEOEFcdTVGRUJcdUZGMENcdTRGNDZcdTUzOEJcdTdGMjlcdTY1NDhcdTY3OUNcdTUzRUZcdTgwRkRcdThGODNcdTVERUVcclxuICAgIC8vICAgfSxcclxuICAgIC8vICAgc3Znbzoge1xyXG4gICAgLy8gICAgIHBsdWdpbnM6IFtcclxuICAgIC8vICAgICAgIHsgbmFtZTogJ3JlbW92ZVZpZXdCb3gnIH0sIC8vIFx1NzlGQlx1OTY2NCBTVkcgXHU3Njg0IHZpZXdCb3ggXHU1QzVFXHU2MDI3XHVGRjBDXHU1M0VGXHU4MEZEXHU0RjFBXHU1RjcxXHU1NENEXHU3RjI5XHU2NTNFXHU2NTQ4XHU2NzlDXHJcbiAgICAvLyAgICAgICB7IG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJywgYWN0aXZlOiBmYWxzZSB9LCAvLyBcdTRFMERcdTc5RkJcdTk2NjQgU1ZHIFx1NEUyRFx1NzY4NFx1N0E3QVx1NUM1RVx1NjAyN1xyXG4gICAgLy8gICAgIF0sXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyB9KSwgLy8gXHU1NkZFXHU3MjQ3XHU1MzhCXHU3RjI5XHJcbiAgXSwgLy9cdThGRDlcdTkxQ0NcdThGREJcdTg4NENcdTkxNERcdTdGNkVcdTUyMkJcdTU0MERcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZSgnLi9zcmMnKSwgLy8gQFx1NEVFM1x1NjZGRnNyY1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgcG9ydDogOTAwMCxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvbGlrZXBvZW1zJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYXBpLmxpa2Vwb2Vtcy5jb20vJyxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9saWtlcG9lbXMvLCAnJyksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVEsU0FBUyxvQkFBb0I7QUFDdFMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFFakIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFFdkIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTywyQkFBMkI7QUFDbEMsT0FBTyxpQkFBbUM7QUFJMUMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBO0FBQUEsSUFDSixPQUFPO0FBQUE7QUFBQSxJQUNQLFdBQVc7QUFBQTtBQUFBLElBQ1gsV0FBVztBQUFBLE1BQ1QsU0FBUyxDQUFDLE9BQU8sWUFBWTtBQUFBLE1BQzdCLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQTtBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBO0FBQUEsTUFDTCxNQUFNLENBQUM7QUFBQTtBQUFBLE1BQ1AsV0FBVyxDQUFDO0FBQUEsSUFDZCxDQUFDO0FBQUE7QUFBQSxJQUNELHNCQUFzQjtBQUFBLE1BQ3BCLFdBQVc7QUFBQSxNQUNYLEtBQUs7QUFBQSxNQUNMLGtCQUFrQjtBQUFBLElBQ3BCLENBQUM7QUFBQTtBQUFBLElBQ0QsWUFBWTtBQUFBLE1BQ1YsU0FBUztBQUFBLFFBQ1AsRUFBRSxNQUFNLE9BQU8sS0FBSyxPQUFPLE1BQU0sMkVBQTJFO0FBQUEsUUFDNUcsRUFBRSxNQUFNLGNBQWMsS0FBSyxhQUFhLE1BQU0seUZBQXlGO0FBQUEsUUFDdkksRUFBRSxNQUFNLFNBQVMsS0FBSyxTQUFTLE1BQU0sdUVBQXVFO0FBQUEsUUFDNUcsRUFBRSxNQUFNLFlBQVksS0FBSyxXQUFXLE1BQU0sdUZBQXVGO0FBQUEsUUFDakksRUFBRSxNQUFNLGdCQUFnQixLQUFLLGVBQWUsTUFBTSxxRUFBcUU7QUFBQSxRQUN2SCxFQUFFLE1BQU0sMkJBQTJCLEtBQUssdUJBQXVCLE1BQU0sdURBQXVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVE5SDtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXVCSDtBQUFBO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxPQUFPO0FBQUE7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLGNBQWM7QUFBQSxRQUNaLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQUEsVUFBUUEsTUFBSyxRQUFRLGdCQUFnQixFQUFFO0FBQUEsTUFDbEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
