// 表格表头数组里的每一项类型
export interface TableHeaderItem {
  label: string,
  prop: string,
  width?:string
}

// 表格内容数组里的每一项类型
export interface TableBodyItem {
  [key: string]: string
}