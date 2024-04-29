import request from '@/utils/request'

// 菜单
export interface Menu {
  id?: string
  parentId: string
  menuName: string
  menuType: string
  icon?: string
  path: string
  component?: string
  sort?: string
  perms: string
  status: string
  visible: string
  isLink?: string
  isKeepAlive?: string
  isFold: string
  createdTime?: Date
  updatedTime?: Date
  children?: Menu[]
  [key: string]: any
}
export const listMenu = (data?: Menu): Promise<response> => request({ url: '/menus/list', method: 'post', data })
export const addMenu = (data?: Menu): Promise<response> => request({ url: '/menus/add', method: 'post', data })
export const updateMenu = (data?: Menu): Promise<response> => request({ url: '/menus/update', method: 'put', data })
export const deleteMenu = (id: string): Promise<response> => request({ url: '/menus/delete', method: 'delete', params: { id } })
export const detailMenu = (data?: Menu): Promise<response> => request({ url: '/menus/detail', method: 'get', data })
