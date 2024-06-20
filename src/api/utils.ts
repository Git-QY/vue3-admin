import request from '@/utils/request'

// 上传
export const upload = (data: any) => request({ url: '/utils/uploads', method: 'post', data })
// 单个切片上传
export const uploadChunk = (data: any) => request({ url: '/utils/uploads/chunk', method: 'post', data })
// 全部切片上传完成合并
export const uploadChunkMerge = (data: any) => request({ url: '/utils/uploads/merge', method: 'post', data })

export function getImage() {
  return request({
    url: 'http://localhost:5173/likepoems/img/mc/?json',
    method: 'get',
  })
}
// 导出
export function exportXlsx() {
  return request({
    url: '/utils/export-xlsx',
    method: 'get',
  })
}

// 获取gitee events
export function giteeEvents() {
  return request({
    url: '/utils/gitee-events',
    method: 'get',
  })
}
// gitee-commits
export function giteeCommits(params: any) {
  return request({
    url: '/utils/gitee-commits',
    method: 'get',
    params,
  })
}
// gitee-branches
export function giteeBranches(params: any) {
  return request({
    url: '/utils/gitee-branches',
    method: 'get',
    params,
  })
}
