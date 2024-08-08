// v-vue3Loading
import { DirectiveBinding } from 'vue'
// http://samherbert.net/svg-loaders/svg-loaders/bars.svg 加载svg
const barsSvg = 'http://samherbert.net/svg-loaders/svg-loaders/bars.svg'
const vue3Loading = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {},
  unmounted(el: HTMLElement) {},
  // 监听值变化
  updated(el: HTMLElement, binding: DirectiveBinding) {
    console.log('🚀 ~ updated ~ binding:', binding)
  },
}
export default vue3Loading
