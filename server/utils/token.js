const jwt = require('jsonwebtoken')
// 秘钥
//生成token
function createToken(playload, screat = '123456') {
  playload.ctime = Date.now()
  playload.exps = 24 * 60 * 60 * 1000 // 手动设置过期时间 60s
  return jwt.sign(playload, screat)
}
// 验证token
function verifyToken(token, screat = '123456') {
  return new Promise((resolve, reject) => {
    jwt.verify(token, screat, (err, data) => {
      if (!token) return reject({ code: 401, msg: '请携带token请求' })
      if (err) return reject({ code: 401, msg: 'token 验证失败' })
      const beforeTime = data.ctime + data.exps
      const nowTime = Date.now()
      if (nowTime > beforeTime) return reject({ code: 401, msg: 'token 过期' }) // 比对当前时间戳  jwt创建的时间+有效期  前端收到重新获取token
      resolve(data)
    })
  })
}

module.exports = {
  createToken,
  verifyToken,
}
