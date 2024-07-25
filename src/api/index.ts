import request from '@/utils/request'

// 布局
export interface LayoutItem {
  i: string
  name: string
  x: number
  y: number
  w: number
  h: number
  display?: boolean
  moved?: boolean
}
export interface Layout {
  id?: string
  userId: string // 用户id隔离
  viewName: string
  moduleList: LayoutItem[]
  sort?: number
  createTime?: Date
  updateTime?: Date
}

export const addLayout = (data?: Layout): Promise<response> => request({ url: '/layouts/add', method: 'post', data })
export const updateLayout = (data?: Layout): Promise<response> => request({ url: '/layouts/update', method: 'put', data })
export const deleteLayout = (id: string): Promise<response> => request({ url: `/layouts/delete/${id}`, method: 'delete' })
export const listLayout = (params?: any): Promise<response> => request({ url: '/layouts/list', method: 'get', params })
export const detailLayout = (id: string): Promise<response> => request({ url: `/layouts/detail`, method: 'get', params: { id } })

// 用户
export interface User {
  id?: string
  username: string
  password?: string
  createTime?: Date
  updateTime?: Date
  email: string
  status: string
  avatar?: any
  remark?: string
  sex?: string
}
// 根据用户id获取菜单权限
export const listMenuByUserId = (id: string): Promise<response> => request({ url: `/users/menus/${id}`, method: 'get' })
// 菜单
export interface Menu {
  id?: string
  parentId: string
  menuName: string
  menuType: string
  icon?: string
  path: string
  component?: string
  sort: number
  perms: string
  status: string
  visible: Boolean
  isLink?: string
  isKeepAlive?: string
  isFold: string
  createTime?: Date
  updateTime?: Date
  children?: Menu[]
  [key: string]: any
}
export const listMenu = (data?: Menu): Promise<response> => request({ url: '/menus/list', method: 'post', data })
export const addMenu = (data?: Menu): Promise<response> => request({ url: '/menus/add', method: 'post', data })
export const updateMenu = (data?: Menu): Promise<response> => request({ url: '/menus/update', method: 'put', data })
export const deleteMenu = (id: string): Promise<response> => request({ url: '/menus/delete', method: 'delete', params: { id } })
export const detailMenu = (data?: Menu): Promise<response> => request({ url: '/menus/detail', method: 'get', data })

// 角色
export interface Role {
  id?: string
  roleName: string
  permissions?: string[]
  perms: string
  status: string
  remark?: string
  sort: number
  createBy?: string
  updateBy?: string
  createTime?: string
  updateTime?: string
  [key: string]: any
  page?: object
}
export const listRole = (data?: Role): Promise<response> => request({ url: '/roles/list', method: 'post', data })
export const addRole = (data?: Role): Promise<response> => request({ url: '/roles/add', method: 'post', data })
export const updateRole = (data?: Role): Promise<response> => request({ url: '/roles/update', method: 'put', data })
export const deleteRole = (params: any): Promise<response> => request({ url: '/roles/delete', method: 'delete', params })
export const detailRole = (params?: any): Promise<response> => request({ url: '/roles/detail', method: 'get', params })
export const updateRoleField = (data: { id: string; fieldName: string; fieldValue: any }): Promise<response> => request({ url: `/roles/update/field`, method: 'put', data })
// 根据角色ids获取菜单权限
export const listMenuByRoleIds = (data: { ids: string[] }): Promise<response> => request({ url: '/roles/aggregate/permissions', method: 'post', data })

// 登录日志
export interface Log {
  id?: string
  content?: string
  ip?: string
  method?: string
  address?: string
  createById?: string
  createTime?: Date
  updateById?: string
  updateTime?: Date
  [key: string]: any
}
export const listLog = (data?: Log): Promise<response> => request({ url: '/logs/list', method: 'post', data })
export const deleteLog = (id: string): Promise<response> => request({ url: '/logs/delete', method: 'delete', params: { id } })

// 字典
export interface Dict {
  id?: string
  dictName: string
  dictType: string
  remark?: string
  sort?: number
  status?: string
  [key: string]: any
}
export const addDict = (data: Dict): Promise<response> => request({ url: '/dicts/add', method: 'post', data })
export const listDict = (data?: Dict): Promise<response> => request({ url: '/dicts/list', method: 'post', data })
export const updateDict = (data: Dict): Promise<response> => request({ url: '/dicts/update', method: 'put', data })
export const deleteDict = (id: string): Promise<response> => request({ url: '/dicts/delete', method: 'delete', params: { id } })

// 字典项（枚举）
export interface DictItem {
  id?: string // 主键
  dictId: string // 字典id
  dictType: string // 字典类型
  parentId?: string // 父级id
  label: string // 名称
  value: string // 值
  remark?: string // 备注
  sort?: number
  status?: string // 状态 1:启用 0:禁用
  [key: string]: any
}

export const addDictItem = (data: any): Promise<response> => request({ url: '/dicts/item/add', method: 'post', data })
export const listDictItem = (data: any): Promise<response> => request({ url: '/dicts/item/list', method: 'post', data })
export const updateDictItem = (data: any): Promise<response> => request({ url: '/dicts/item/update', method: 'put', data })
export const deleteDictItem = (id: string): Promise<response> => request({ url: '/dicts/item/delete', method: 'delete', params: { id } })

// 部门
export interface Dept {
  id?: string
  parentId?: string
  deptName: string
  [key: string]: any
}
export const listDept = (data?: any): Promise<response> => request({ url: '/depts/list', method: 'post', data })
export const addDept = (data?: Dept): Promise<response> => request({ url: '/depts/add', method: 'post', data })
export const updateDept = (data?: Dept): Promise<response> => request({ url: '/depts/update', method: 'put', data })
export const deleteDept = (id: string): Promise<response> => request({ url: '/depts/delete', method: 'delete', params: { id } })
export const detailDept = (params: any): Promise<response> => request({ url: '/depts/detail', method: 'get', params })

// 题库
export interface Interview {
  id?: string
  type: string
  stem: string
  tags?: string[]
  level: number
  score?: number
  options?: { type: string; value: string }[]
  answer: any
  analysis?: string
  source?: string
}
export const listInterview = (data?: any): Promise<response> => request({ url: '/interviews/list', method: 'post', data })
export const addInterview = (data?: Interview): Promise<response> => request({ url: '/interviews/add', method: 'post', data })
export const updateInterview = (data?: Interview): Promise<response> => request({ url: '/interviews/update', method: 'put', data })
export const deleteInterview = (params: { id?: string; ids?: any }): Promise<response> => request({ url: '/interviews/delete', method: 'delete', params })
export const detailInterview = (params: any): Promise<response> => request({ url: '/interviews/detail', method: 'get', params })
