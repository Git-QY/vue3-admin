import request from '@/utils/request'

export interface Dept {
  id?: string
  parentId?: string
  deptName: string
  [key: string]: any
}
// 获取部门列表
export const listDept = (data?: Dept): Promise<response> => request({ url: '/departments/list', method: 'post', data })

// 新增部门
export const addDept = (data?: Dept): Promise<response> => request({ url: '/departments/add', method: 'post', data })

// 修改部门
export const updateDept = (data?: Dept): Promise<response> => request({ url: '/departments/update', method: 'put', data })

// 删除部门
export const deleteDept = (id: string): Promise<response> => request({ url: '/departments/delete', method: 'delete', params: { id } })
