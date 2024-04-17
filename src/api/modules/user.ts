import http from '@/api'

// 登录类型规范1
export interface ReqLoginType {
  username: string
  password: string
}
export interface ResLoginType {
  token: string;
  userInfo: UserInfo;
}
interface UserInfo {
  _id: string;
  id: string;
  username: string;
  password: string;
  email: string;
  status: number;
  avatar: string;
  createdTime: string;
  updatedTime: string;
  __v: number;
}
// 注册类型规范
export interface ReqRegisterType {
  username: string
  password: string
  email: string
  code: string
}

// 忘记密码表单类型规范
export interface ReqForgetType{
  email: string
  code: string
  newPassword: string
  nextPassword: string
}

export default {
  // 登录接口
  login: (data: ReqLoginType)=> {
    return http.post<ResLoginType>('/users/login',data)
  },
  // 注册接口
  register: (data:ReqRegisterType)=> {
    return http.post<any>('/users/register',data)
  },

  // 获取邮箱验证码
  emailCode: (email: string)=> {
    return http.get<any>(`/users/code?email=${email}`)
  },

  // 忘记密码模块部分

  // 校验邮箱验证码 会返回一个token 再带这个token去修改密码
  checkEmailCode: (data:{email:string;code:string})=> {
    return http.post<any>(`/users/checkEmailCode`,data)
  },
  // 修改密码
  // token 来自邮箱验证码
  forget: (data:ReqForgetType)=> {
    return http.post<any>(`/users/forget`,data)
  },

  // 第三方登录接口
  thirdLogin: (data: { type: string; code: string })=> {
    return http.post<any>('/users/login/third',data)
  }
}
