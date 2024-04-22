const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator') // 引入验证规则
// 角色
const schemaRules = {
  id: { type: String }, // id
  name: { type: String, required: true, unique: true }, // 角色名称
  menuIds: { type: Array, default: [] }, // 菜单id集合
  remark: { type: String, default: '' }, // 备注
  status: { type: String, default: '1' }, // 状态 1:启用 0:禁用
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
}

// 创建用户模型
const Role = mongoose.model('Role', new mongoose.Schema(schemaRules))

// 预校验规则
const roleValidationRules = () => [
  body('name').notEmpty().withMessage('角色名称不能为空'),
  body('menuIds').optional().isArray().withMessage('菜单id集合必须为数组'),
  body('remark').optional().isLength({ max: 100 }).withMessage('备注不能超过100个字符'),
  body('status').optional().isString().withMessage('状态必须为字符串').bail().isIn(['0', '1']).withMessage('状态值错误'),
]

module.exports = { Role, schemaRules, roleValidationRules }
