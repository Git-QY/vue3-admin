import request from '@/utils/request'

export interface Role {
  id?: string
  name: string
  permissions?: string[]
  perms: string
  status: string
  remark?: string
  createTime?: string
  updateTime?: string
}
// 角色接口

// 创建角色
export function addRole(data: Role) {
  return request({
    url: '/roles/add',
    method: 'post',
    data,
  })
}

// 获取角色列表
export function roleList(data: Role) {
  return request({
    url: '/roles/list',
    method: 'post',
    data,
  })
}

// 删除角色
export function deleteRole(id: string) {
  return request({
    url: '/roles/delete?id=' + id,
    method: 'delete',
  })
}

// 更新角色
export function updateRole(data: Role) {
  return request({
    url: '/roles/update',
    method: 'put',
    data,
  })
}

// 获取角色详情
export function roleDetail(id: number) {
  return request({
    url: '/roles/detail?id=' + id,
    method: 'get',
  })
}
