import request from '@/utils/request'
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
}
export const listRole = (data?: Role): Promise<response> => request({ url: '/roles/list', method: 'post', data })
export const addRole = (data?: Role): Promise<response> => request({ url: '/roles/add', method: 'post', data })
export const updateRole = (data?: Role): Promise<response> => request({ url: '/roles/update', method: 'put', data })
export const deleteRole = (id: string): Promise<response> => request({ url: '/roles/delete', method: 'delete', params: { id } })
export const detailRole = (data?: Role): Promise<response> => request({ url: '/roles/detail', method: 'get', data })
export const updateRoleField = (data: { id: string; fieldName: string; fieldValue: any }): Promise<response> => request({ url: `/roles/update/field`, method: 'put', data })
// 根据角色ids获取菜单权限
export const listMenuByRoleIds = (data: { ids: string[] }): Promise<response> => request({ url: '/roles/aggregate/permissions', method: 'post', data })
