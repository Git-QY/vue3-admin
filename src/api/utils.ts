import request from '@/utils/request'

// 上传
export function upload(data: any) {
  return request({
    url: '/utils/upload',
    method: 'post',
    data,
  })
}
// https://img.likepoems.com/resource/mc/1QM1Uq2DM66V1jMImQpW.jpg
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
