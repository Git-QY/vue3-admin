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
