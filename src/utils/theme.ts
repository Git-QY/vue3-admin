// 适合vue2vue3主题是转换
interface ThemeColors {
  [key: string]: string
}

/**
 * 创建主题样式
 * @param color 主题色（默认为 '#3582FB'）
 * @returns 包含不同程度主题颜色的对象
 */
export const createTheme = (color: string = '#3582FB'): ThemeColors | undefined => {
  if (!color) return
  color = decodeURIComponent(color)
  if (!String(color).startsWith('#')) color = '#' + color
  // 设置css vars值
  const colors: ThemeColors = { ...getThemeCluster(color.replace('#', '')), primary: color }
  // 设置elementui主题色
  Object.keys(colors).forEach(key => {
    document.body.style.setProperty('--el-color-' + key, colors[key])
  })

  return colors
}

/**
 * 获取主题相关的颜色集合
 * @param theme 主题色
 * @returns 包含不同程度主题颜色的对象
 */
function getThemeCluster(theme: string): ThemeColors {
  const clusters: ThemeColors = {}
  const tintColor = (color: string, tint: number): string => {
    let red: any = parseInt(color.slice(0, 2), 16)
    let green: any = parseInt(color.slice(2, 4), 16)
    let blue: any = parseInt(color.slice(4, 6), 16)
    red += Math.round(tint * (255 - red))
    green += Math.round(tint * (255 - green))
    blue += Math.round(tint * (255 - blue))
    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)
    return hexToRgb(`#${red}${green}${blue}`)
  }
  const shadeColor = (color: string, shade: number): string => {
    let red: any = parseInt(color.slice(0, 2), 16)
    let green: any = parseInt(color.slice(2, 4), 16)
    let blue: any = parseInt(color.slice(4, 6), 16)
    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)
    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)
    return hexToRgb(`#${red}${green}${blue}`)
  }

  for (let i = 1; i <= 9; i++) {
    clusters[`light-${i}`] = tintColor(theme, Number((i / 10).toFixed(2)))
  }
  clusters['shade-1'] = shadeColor(theme, 0.1)
  return clusters
}

/**
 * 将十六进制颜色值转换为RGB格式的字符串
 * @param hex 十六进制颜色值
 * @returns RGB格式的颜色字符串
 */
function hexToRgb(hex: string): string {
  hex = hex.replace('#', '')
  var bigint = parseInt(hex, 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255
  return `rgb(${r}, ${g}, ${b})`
}

// 随机生成颜色 格式#3582FB
export function randomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
