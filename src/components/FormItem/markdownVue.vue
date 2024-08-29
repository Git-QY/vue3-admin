<template>
  <div class="text-black" :class="wrapClass">
    <div ref="textRef" class="leading-relaxed break-words">
      <div v-if="!inversion" class="markdown-body" v-html="text" />
      <div v-else class="whitespace-pre-wrap" v-text="text" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import mdKatex from '@traptitech/markdown-it-katex'
import { t } from '@/language/i18n'

// 定义 props
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  inversion: {
    type: Boolean,
    default: false,
  }, // 是否反转样式
})
// 初始化 MarkdownIt，配置代码高亮
const md = new MarkdownIt({
  html: true, // 允许解析 HTML 标签
  linkify: true, // 自动识别链接
  typographer: true, // 允许使用 typographer 插件
  highlight(code: string, language: string) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})
md.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })
function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper">
  <div class="code-block-header">
  <span class="code-block-header__lang">${lang}</span>
  <span class="code-block-header__copy">${t('chat.copyCode')}</span>
  </div>
  <code class="hljs code-block-body ${lang}">${str}</code>
  </pre>
  `
}

const wrapClass = computed(() => {
  return [
    // 'text-wrap',
    // 'min-w-[20px]',
    // 'rounded-md',
    // props.inversion ? 'bg-[#d2f9d1]' : 'bg-[#f4f6f8]',
    // props.inversion ? 'dark:bg-[#a1dc95]' : 'dark:bg-[#1e1e20]',
  ]
})
const text = computed(() => {
  const value = props.content ?? ''
  if (!props.inversion) return md.render(value)
  return value
})
</script>

<style lang="scss">
.markdown-body {
  background-color: transparent;
  font-size: 14px;

  p {
    white-space: pre-wrap;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  pre code,
  pre tt {
    line-height: 1.65;
  }

  .highlight pre,
  pre {
    background-color: #fff;
  }

  code.hljs {
    padding: 0;
  }

  .code-block {
    &-wrapper {
      position: relative;
      padding-top: 24px;
    }
    &-header {
      position: absolute;
      top: 5px;
      right: 0;
      width: 100%;
      padding: 0 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #b3b3b3;

      &__copy {
        cursor: pointer;
        margin-left: 0.5rem;
        user-select: none;
        &:hover {
          color: #65a665;
        }
      }
    }
  }
}

html.dark {
  .highlight pre,
  pre {
    background-color: #282c34;
  }
}
</style>
<style lang="scss" scoped></style>
