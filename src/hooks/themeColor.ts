import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/store'
const useTheme = () => {
  const html = document.documentElement
  const PRE = '--el-color-primary'
  const PRE_LIGHT = `${PRE}-light`
  const PRE_DARK = `${PRE}-dark`
  const Levels: number[] = [3, 5, 7, 8, 9]
  const WHITE = '#FFFFFF'
  const BLACK = '#000000'

  const mix = (color1: string, color2: string, weight: number): string => {
    weight = Math.max(Math.min(Number(weight), 1), 0)
    const r1 = parseInt(color1.substring(1, 3), 16)
    const g1 = parseInt(color1.substring(3, 5), 16)
    const b1 = parseInt(color1.substring(5, 7), 16)
    const r2 = parseInt(color2.substring(1, 3), 16)
    const g2 = parseInt(color2.substring(3, 5), 16)
    const b2 = parseInt(color2.substring(5, 7), 16)
    const r = Math.round(r1 * (1 - weight) + r2 * weight)
    const g = Math.round(g1 * (1 - weight) + g2 * weight)
    const b = Math.round(b1 * (1 - weight) + b2 * weight)
    const _r = ('0' + (r || 0).toString(16)).slice(-2)
    const _g = ('0' + (g || 0).toString(16)).slice(-2)
    const _b = ('0' + (b || 0).toString(16)).slice(-2)
    return '#' + _r + _g + _b
  }

  const changeTheme = (color: string | null): void => {
    if (!color) {
      console.warn('Color value is not provided')
      return
    }
    html.style.setProperty(PRE, color)

    Levels.forEach((level: number) => {
      html.style.setProperty(`${PRE_LIGHT}-${level}`, mix(color, WHITE, level * 0.1))
    })

    const dark = mix(color, BLACK, 0.2)
    html.style.setProperty(`${PRE_DARK}-2`, dark)

    // 本身设置的颜色
    html.style.setProperty(`--primary`, color)
    for (let i = 0; i < 10; i++) {
      html.style.setProperty(`--light-${i}`, mix(color, WHITE, i * 0.1))
    }
  }
  const setTheme = (color: string | null): void => {
    changeTheme(color)
  }
  // 改变具体 参数的 颜色
  const changeThemeColor = (str: string, color: string, textColor: string = '#000') => {
    html.style.setProperty(`--${str}`, color)
    html.style.setProperty(`--text-color`, textColor)
  }
  // const globalStore = useGlobalStore()
  // const { isDark, themeColor } = storeToRefs(globalStore)
  // 暗黑明亮切换
  const switchDark = (): void => {
    // 获取HTML根节点
    // const html = document.documentElement as HTMLElement
    // html.setAttribute('class', isDark.value ? 'dark' : '')
    // changeTheme(themeColor.value)
    // setAsideTheme()
    // setHeaderTheme()
  }

  return {
    setTheme,
    switchDark,
    changeThemeColor,
  }
}

export default useTheme
