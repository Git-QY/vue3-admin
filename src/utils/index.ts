// 获取assets静态图片
export const getAssetsImge = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}
// 深拷贝
export const deepClone = (data: any) => {
  // 排除不需要类型
}
