export const validator = {
  // 正整数
  int: (val: string) => /^[1-9]\d*$/.test(val),
  // 移动手机
  phone: (val: string) => /^1[3-9]\d{9}$/.test(val),
  // 邮箱
  email: (val: string) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val),
  // 保留1位小数
  decimal1: (val: string) => /^(0|[1-9]\d*)(\.\d{1})?$/.test(val),
  // 保留2位小数
  decimal2: (val: string) => /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(val),
  // 保留3位小数
  decimal3: (val: string) => /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(val),
}
// 检验规则
const checkRule = (item: any, folg: string, validator: any) => {
  return folg == '1'
    ? [
        { required: true, message: `${item.label}不能为空`, trigger: ['blur', 'change'] },
        { validator, trigger: ['blur', 'change'] },
      ]
    : { validator, trigger: ['blur', 'change'] }
}
export const getValidationRules = (item: any, folg: string): { [key: string]: any } => {
  return {
    must: { required: true, message: `${item.label}不能为空`, trigger: ['blur', 'change'] },
    int: checkRule(item, folg, (_rule: any, value: any, callback: any) => {
      if (!validator.int(value) && value) {
        callback(new Error(`${item.label}必须为正整数`))
      } else {
        callback()
      }
    }),
    mobile: checkRule(item, folg, (_rule: any, value: any, callback: any) => {
      if (!!validator.phone(value) && value) {
        callback(new Error(`${item.label}格式不正确`))
      } else {
        callback()
      }
    }),
    phone: checkRule(item, folg, (_rule: any, value: any, callback: any) => {
      if (!validator.email(value) && value) {
        callback(new Error(`${item.label}格式不正确`))
      } else {
        callback()
      }
    }),
    decimal1: checkRule(item, folg, (_rule: any, value: any, callback: any) => {
      if (!validator.decimal1(value) && value) {
        callback(new Error(`${item.label}保留1位小数`))
      } else {
        callback()
      }
    }),
    decimal2: checkRule(item, folg, (_rule: any, value: any, callback: any) => {
      if (!validator.decimal2(value) && value) {
        callback(new Error(`${item.label}保留2位小数`))
      } else {
        callback()
      }
    }),
  }
}
