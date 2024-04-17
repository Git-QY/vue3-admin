import http from '@/api'

// 登录类型规范1
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

// 忘记密码表单类型规范
export interface ForgetType{
  email: string
  code: string
  newPassword: string
  nextPassword: string
}

// 响应类型规范
interface response {
  code: number;
  data?:any
  message:string
}

export default {
  // 登录接口
  login(data: { username: string; password: string }):Promise<response> {
    return http({
      url: '/users/login',
      method: 'post',
      data,
    })
  },
  // 注册接口
  register(data:{username:string;password:string;email:string,code:string}):Promise<response> {
    return http({
      url:'/users/register',
      method:'post',
      data
    })
  },

  // 获取邮箱验证码
  emailCode(email: string): Promise<response> {
    return http({
      url: `/users/code?email=${email}`,
      method:'get'
    })
  },

  // 忘记密码模块部分

  // 校验邮箱验证码 会返回一个token 再带这个token去修改密码
  checkEmailCode(data:{email:string;code:string}): Promise<response> {
    return http({
      url: `/users/checkEmailCode`,
      method:'post',
      data
    })
  },
  // 修改密码
  // token 来自邮箱验证码
  forget(data:{email:string;token:string;newPassword:string;nextPassword:string}): Promise<response> {
    return http({
      url: `/users/forget`,
      method:'post',
      data
    })
  },

  // 第三方登录接口
  thirdLogin(data: { type: string; code: string }): Promise<response> {
    return request({
      url: '/users/login/third',
      method: 'post',
      data,
    })
  }
}
