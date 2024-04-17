const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator') // 引入验证规则

const schemaRules = {
  id: { type: String }, // 用户ID，必需且唯一
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 20,
  }, // 用户名，必需且唯一
  password: { type: String, required: true }, // 密码，必需
  createdTime: { type: Date, default: Date.now }, // 创建时间
  updatedTime: { type: Date, default: Date.now }, // 最后更新时间
  // 邮箱
  email: { type: String },
  // 状态
  status: { type: Number, default: 1 }, // 1: 正常，0: 禁用
  // 头像
  avatar: { type: String, default: '' },
}

// 定义用户模型
const userSchema = new mongoose.Schema(schemaRules)

// 创建用户模型
const User = mongoose.model('User', userSchema)

// 预校验规则
const userValidationRules = isNewUser => [
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .bail()
    .isString()
    .withMessage('用户名必须为字符串')
    .bail()
    .custom(async (value, { req }) => {
      // 新增用户时候确保唯一性
      const query = { username: value }
      if (!isNewUser) {
        query._id = { $ne: req.user._id }
      }
      const user = await User.findOne({ username: value })
      if (user) {
        throw new Error('用户名已存在')
      }
    })
    .bail()
    .isLength({ min: 3, max: 20 })
    .bail()
    .withMessage('用户名长度为 3 到 20 个字符'),
  body('password').notEmpty().withMessage('密码不能为空').bail().isString().withMessage('密码必须为字符串').bail().isLength({ min: 6 }).withMessage('密码长度为 6 个字符以上'),
  body('email').optional().isEmail().withMessage('邮箱格式不正确'),
  // 状态
  body('state').optional().isIn([0, 1]).withMessage('状态值不合法'),
]

// 导出用户模型
module.exports = { User, schemaRules, validationResult, userValidationRules }
