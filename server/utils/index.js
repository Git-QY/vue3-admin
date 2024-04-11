const nodemailer = require('nodemailer') //引入模块
// 使用  UUID v4 生成全局唯一 ID
function generateUUID() {
  const { v4: uuidv4 } = require('uuid')
  return uuidv4()
}

// 获取邮箱验证码
let transporter = nodemailer.createTransport({
  service: 'qq', // 类型qq邮箱
  port: 465,
  secure: true,
  auth: { user: '595870773@qq.com', pass: 'usgcdcegsjunbcea' },
})
function sendMail(email, code, call) {
  // 发送的配置项
  let mailOptions = {
    from: '595870773@qq.com', // 发送者
    to: email, // 接受者,可以同时发送多个,以逗号隔开
    subject: 'vue3-admin', // 标题
    html: `<h2>欢迎登录:本次的验证码是${code}</h2>`,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      call(false)
    } else {
      call(true) //因为是异步 所有需要回调函数通知成功结果
    }
  })
}


module.exports = {
  generateUUID,
  sendMail,
}
