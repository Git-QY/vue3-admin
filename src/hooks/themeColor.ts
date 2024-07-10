/**
 * 函数用于计算基于主色的变浅衍生色
 * @param baseColor 主色，格式为 '#RRGGBB'
 * @param steps 一个数组，包含每个衍生色相对于主色的变浅程度（百分比增量，0 到 1 之间）
 * @returns 变浅衍生色数组，格式为 ['#RRGGBB', '#RRGGBB', ...]
 */
const calculateLighterColors = (baseColor: string, steps: number[]): string[] => {
  const lightenColor = (color: string, weight: number): string => {
    weight = Math.max(Math.min(Number(weight / 10), 1), 0) // 确保 weight 在 0 到 10 之间
    const r = parseInt(color.substring(1, 3), 16)
    const g = parseInt(color.substring(3, 5), 16)
    const b = parseInt(color.substring(5, 7), 16)

    // 计算变浅后的颜色值
    const lightenedR = Math.round(r + (255 - r) * weight)
    const lightenedG = Math.round(g + (255 - g) * weight)
    const lightenedB = Math.round(b + (255 - b) * weight)

    // 转换为十六进制，并确保每个颜色通道的值在合法范围内
    const _r = ('0' + Math.min(lightenedR, 255).toString(16)).slice(-2)
    const _g = ('0' + Math.min(lightenedG, 255).toString(16)).slice(-2)
    const _b = ('0' + Math.min(lightenedB, 255).toString(16)).slice(-2)

    return '#' + _r + _g + _b
  }

  // 计算衍生色数组
  const lighterColors: string[] = steps.map(step => {
    const lightenedColor = lightenColor(baseColor, step)
    return lightenedColor
  })

  return lighterColors
}
const useTheme = () => {
  const html = document.documentElement
  // const PRE = '--el-color-primary'
  // const PRE_LIGHT = `${PRE}-light`
  // const PRE_DARK = `${PRE}-dark`
  // const Levels: number[] = [3, 5, 7, 8, 9]
  const WHITE = '#FFFFFF'
  const BLACK = '#000000'
  const isDark = ref(false)

  // /* 模式切换变量，默认light模式 */
  // --current-background-color: var(--light-background-color);
  // --current-primary-color: var(--light-primary-color);

  // /* 浅色主题 */
  // --light-primary-color: #666;
  // --light-background-color: #fff;

  // /* 深色主题 */
  // --dark-primary-color: #fff;
  // --dark-background-color: #282c34;

  // 写一个方法替换var(--light-background-color) => var(--dark-background-color);
  function findCurrentCssVariables(): string[] {
    const currentCssVars: string[] = []
    const styleSheets = Array.from(document.styleSheets)

    for (const sheet of styleSheets) {
      if (sheet instanceof CSSStyleSheet) {
        const cssRules = Array.from(sheet.cssRules)
        for (const rule of cssRules) {
          if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
            const style = rule.style as CSSStyleDeclaration
            for (let i = 0; i < style.length; i++) {
              const name = style[i]
              if (name.startsWith('--current')) {
                currentCssVars.push(name)
              }
            }
          }
        }
      }
    }

    return currentCssVars
  }

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
    // html.style.setProperty(PRE, color)
    // Levels.forEach((level: number) => {
    //   html.style.setProperty(`${PRE_LIGHT}-${level}`, mix(color, WHITE, level * 0.1))
    // })

    // 本身设置的颜色
    html.style.setProperty(`--primary`, color)
    for (let i = 0; i < 10; i++) {
      html.style.setProperty(`--light-${i}`, mix(color, WHITE, i * 0.1))
    }
  }
  const setThemeColor = (color: string | null): void => {
    changeTheme(color)
  }
  // 改变具体 参数的 颜色
  const changeThemeColor = (str: string, color: string, textColor: string = '#000') => {
    html.style.setProperty(`--${str}`, color)
    html.style.setProperty(`--text-color`, textColor)
  }
  // 暗黑明亮跟随系统切换 light dark auto
  const setTheme = (mode: string): void => {
    const html = document.documentElement as HTMLElement
    const currentCssVariables = findCurrentCssVariables()
    let theme = mode
    if (mode === 'auto') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else if (mode !== 'dark' && mode !== 'light') {
      console.warn('Invalid theme mode:', mode)
      return
    }
    html.classList.toggle('dark', theme === 'dark')
    html.removeAttribute('class')
    if (theme === 'dark') {
      html.classList.add('dark') // 对于element元素
    }
    currentCssVariables.forEach(item => {
      const value = `var(--${theme}${item.substring(9)})`
      document.documentElement.style.setProperty(item, value) // 自定义元素

      // 自定义衍生色
      const color = getComputedStyle(html).getPropertyValue(item)
      const Levels = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      if (theme === 'dark') {
        calculateLighterColors(color, Levels)
          .reverse()
          .forEach((color, index) => {
            document.documentElement.style.setProperty(`${item}-${Levels[index]}`, color)
          })
      } else {
        calculateLighterColors(color, Levels).forEach((color, index) => {
          document.documentElement.style.setProperty(`${item}-${Levels[index]}`, color)
        })
      }
    })

    isDark.value = !!(theme == 'dark')
  }

  return {
    setThemeColor,
    changeThemeColor,
    setTheme,
    isDark,
  }
}

export default useTheme
