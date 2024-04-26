// i18n.ts
import { createI18n } from 'vue-i18n'

// Chinese
// English
// Japanese
// Korean
import Chinese from './Chinese'
import English from './English'
import Korean from './Korean'
import Japanese from './Japanese'

const i18n = createI18n({
  legacy: false, // 使用CompotitionAPI必须添加这条.
  locale: JSON.parse(localStorage.global).language || 'Chinese', // 默认语言
  // fallbackLocale: 'English', // 默认第二语言
  messages: {
    Chinese,
    English,
    Korean,
    Japanese,
  },
})

export default i18n
