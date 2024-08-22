// 响应类型规范
interface response {
  code: number
  data?: any
  message: string
}
interface resError {
  code: number
  data?: any
  message: string
}

/**
 * 组件通用
 */
// table 类型
interface tableProps {
  data?: any[] // 表格数据
  table?: any // 表格配置
  searchForm?: any // 搜索表单form
  api?: (params: any) => Promise<any> //  请求数据函数
  columns: columnsProps[] // 配置列配置
  page?: pageProps // 分页配置
}
interface columnsProps {
  prop: string
  label: string
  formatter?: (row: any) => string
  width?: string | number
  fixed?: string // 固定列
  align?: string // 对齐方式
  type?: string // 类型 默认为input
  rules?: any // 校验规则
  props?: any // formItem 其他配置
  hide?: boolean
  mate?: any
  [key: string]: any
}
interface pageProps {
  page: number
  pageSize: number
  total?: number
  pageSizes: number[]
  layout?: string
}
