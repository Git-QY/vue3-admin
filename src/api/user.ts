import request from '@/utils/request'

export interface LoginType {
  username: string
  password: string
}

export default {
  // 登录接口
  login(data: { username: string; password: string }) {
    return request({
      url: '/users/login',
      method: 'post',
      data,
    })
  },
}
