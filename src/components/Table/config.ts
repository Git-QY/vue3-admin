export const defaultConfig = {
  searchForm: {},
  table: {}, // 表格配置
  page: {
    total: 0,
    page: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50],
    layout: 'total, sizes, prev, pager, next, jumper',
  },
}
// 递归合并对象
export function deepMerge<T = any>(src: any, target: any): T {
  let key
  for (key in target) {
    src[key] = src[key] && src[key].toString() === '[object Object]' ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}
