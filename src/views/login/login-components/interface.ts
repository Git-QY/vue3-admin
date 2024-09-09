export interface LoginProvide {
  loginSuccess: (data: any) => void
  loginFailure: (data: any) => void
  setPane: (name: any) => void
}
