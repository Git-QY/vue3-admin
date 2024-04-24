// 菜单接口
import request from '@/utils/request'

// 菜单列表
export function menulist(data?:any):Promise<response>{
  return request({
    url:'/menus/list',
    method:'post',
    data
  })
}
// 新增菜单
export function addMenu(data:unknown):Promise<response>{
  return request({
    url:'/menus/add',
    method:'post',
    data
  })
}

// 更新菜单
export function updateMenu(data:unknown):Promise<response>{
  return request({
    url:'/menus/update',
    method:'post',
    data
  })
}

// 删除菜单
export function deleteMenu(id:string):Promise<response>{
  return request({
    url:'/menus/delete?id='+id,
    method:'delete'
  })
}

// 菜单详情
export function menuDetail(id:number):Promise<response>{
  return request({
    url:'/menus/detail?id='+id,
    method:'get'
  })
}