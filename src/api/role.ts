import request from "@/utils/request";
// 角色接口

// 创建角色
export function createRole(data: unknown) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

// 获取角色列表
export function roleList() {
  return request({
    url: '/role/list',
    method: 'post'
  })
}

// 删除角色
export function deleteRole(id: number) {
  return request({
    url: '/role/delete?id=' + id,
    method: 'delete'
  })
}

// 更新角色
export function updateRole(data: unknown) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}

// 获取角色详情
export function roleDetail(id: number) {
  return request({
    url: '/role/detail?id=' + id,
    method: 'get'
  })
}