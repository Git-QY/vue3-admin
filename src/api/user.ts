import request from '@/utils/request'

// 登录类型规范
export interface LoginType {
  username: string
  password: string
}
// 注册类型规范
export interface RegisterType {
  username: string
  password: string
  email: string
  code: string
}

// 响应类型规范
interface response {
  code: number;
  message:string
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
  // 注册接口
  register(data:{username:string;password:string;email:string,code:string}):Promise<response> {
    return request({
      url:'/users/register',
      method:'post',
      data
    })
  },

  // 获取邮箱验证码
  emailCode(email: string): Promise<response> {
    return request({
      url: `/users/code?email=${email}`,
      method:'get'
    })
  }
}
