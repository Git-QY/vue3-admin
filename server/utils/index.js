// 使用  UUID v4 生成全局唯一 ID
function generateUUID() {
  const { v4: uuidv4 } = require('uuid')
  return uuidv4()
}

module.exports = {
  generateUUID,
}
