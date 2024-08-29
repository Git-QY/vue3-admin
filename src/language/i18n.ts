// i18n.ts
import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import { LanguageType } from '@/store/interface'
function getLanguage() {
  if (!localStorage.global) return false
  return JSON.parse(localStorage.global).language
}
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
  locale: getLanguage() || 'Chinese', // 默认语言
  // fallbackLocale: 'English', // 默认第二语言
  messages: {
    Chinese,
    English,
    Korean,
    Japanese,
  },
})
export function t(key: string) {
  return i18n.global.t(key)
}
export function setLocale(locale: LanguageType) {
  i18n.global.locale = locale
  // localStorage.global = JSON.stringify({ language: locale })
}

export function setupI18n(app: App) {
  app.use(i18n)
}

export default i18n
