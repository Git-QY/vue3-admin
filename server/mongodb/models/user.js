const mongoose = require('mongoose')
const schemaRules = {
  id: { type: String }, // 用户ID，必需且唯一
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 20,
  }, // 用户名，必需且唯一
  password: {
    type: String,
    required: true,
    match: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/, // 长度至少6位，包含字母和数字或字符
  }, // 密码，必需
  createdTime: { type: Date, default: Date.now }, // 创建时间
  updatedTime: { type: Date, default: Date.now }, // 最后更新时间
  // 邮箱
  email: { type: String, required: true },
  // 状态
  status: { type: Number, default: 1 }, // 1: 正常，0: 禁用
  // 头像
  avatar: { type: String, default: '' },
}
// 定义用户模型
const userSchema = new mongoose.Schema(schemaRules)

// 创建用户模型
const User = mongoose.model('User', userSchema)

// 导出用户模型
module.exports = { User, schemaRules }
