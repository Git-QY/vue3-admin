// directives/readonlyDirective.ts
import type { Directive, DirectiveBinding } from 'vue'
/**
 * 针对select组件，设置只读属性
 * 可以使用其他事件 click
 */
const readonly: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    console.dir(el, binding)
    el.addEventListener('click', (event: MouseEvent) => {
      if (el.className.indexOf('el-select') > -1) {
        // 隐藏下拉框  获取ref
      }
      event.preventDefault()
    })
    el.classList.add('readonly-select')
    el.setAttribute('data-readonly', 'true')
  },
}

export default readonly
