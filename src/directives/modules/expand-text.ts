// src/directives/expand-text.ts

import { DirectiveBinding } from 'vue'

interface ExpandTextOptions {
  maxLines?: number
  maxWidth?: string
}

const expandText = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding<ExpandTextOptions>) {
    const maxLines = binding.value?.maxLines || 3 // 最大行数
    const maxWidth = binding.value?.maxWidth || '200px' // 最大宽度
    const originalText = el.innerText || ''
    //  获取文本的宽度
    el.style.textOverflow = 'ellipsis'
    el.style.overflow = 'hidden'
    if (maxLines === 1) {
      el.style.display = 'block'

      el.style.whiteSpace = 'nowrap' // 不允许换行
      el.style.maxWidth = maxWidth
      el.addEventListener('mouseenter', () => {
        const textWidth = el.scrollWidth
        if (textWidth > Number(maxWidth.replace('px', ''))) {
          el.title = originalText
          el.style.cursor = 'pointer'
        }
      })
    } else {
      el.style.display = '-webkit-box'
      el.style.webkitBoxOrient = 'vertical'
      el.style.whiteSpace = 'normal'
      el.style.webkitLineClamp = String(maxLines)
      el.style.maxWidth = maxWidth
      el.style.cursor = 'pointer'

    //   el.addEventListener('mouseenter', () => {
    //     el.style.webkitLineClamp = 'initial'
    //     el.style.overflow = 'visible'
    //   })

    //   el.addEventListener('mouseleave', () => {
    //     el.style.webkitLineClamp = String(maxLines)
    //     el.style.overflow = 'hidden'
    //   })

      el.addEventListener('click', () => {
        if (el.style.webkitLineClamp === String(maxLines)) {
          el.style.webkitLineClamp = 'initial'
        } else {
          el.style.webkitLineClamp = String(maxLines)
        }
      })
    }
  },
}

export default expandText
