import request from '@/utils/request'

// 上传
export function upload(data: any) {
  return request({
    url: '/utils/upload',
    method: 'post',
    data,
  })
}
