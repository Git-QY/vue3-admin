// getList: { type: Function, default: () => {} }, // 获取列表数据的方法
// options: { type: Object, default: () => ({}) }, // 组件选项
// multiple: { type: Boolean, default: false }, // 是否多选
// selected: { type: Array, default: () => [] }, // 已选数据
// placeholder: { type: String, default: '请输入关键词' }, // 搜索框占位符
// mode: { type: String, default: 'tree' }, // 默认展示模式
// nodeAdapter: { type: Function, default: (list: any) => list }, // 节点适配器函数
// defaultTop: { type: Array, default: () => [] }, // 默认顶级节点
// showRightPanel: { type: Boolean, default: false }, // 是否出现右侧面板
export interface selectOption {
  getList: Function
  options: Options
  multiple: boolean
  selected: any[]
  placeholder: string
  mode: string
  nodeAdapter: Function
  defaultTop: any[]
  isRightPanel: boolean
}
export interface Item {
  [key: string]: any
}
export interface Options {
  label: string
  value: string
  children: string
  page?: pageProps
}
export interface pageProps {
  page: number
  pageSize: number
  total?: number
  pageSizes: number[]
  layout?: string
}
