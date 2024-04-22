const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator') // 引入验证规则
// 菜单
const schemaRules = {
  id: { type: String }, // id
  parentId: { type: String }, // 父级id
  parentName: { type: String, required: true }, // 父级名称
  menuName: { type: String, required: true }, // 菜单名称
  menuType: { type: String, required: true }, // 菜单类型 0目录 1菜单 2按钮
  icon: { type: String, required: false }, // 菜单图标
  path: { type: String, required: false }, // 路由路径
  component: { type: String, required: false }, // 页面路径
  sort: { type: Number, default: true }, // 排序
  perms: { type: String, default: true }, // 权限标识
  createdTime: { type: Date, default: Date.now }, // 创建时间，默认为当前时间
  updatedTime: { type: Date, default: Date.now }, // 最后更新时间，默认为当前时间
  status: { type: String, default: true }, // 状态 1正常 0停用
  visible: { type: String, default: true }, // 是否隐藏 1显示 0隐藏
}
// 定义用户模型
const menuSchema = new mongoose.Schema(schemaRules)

// 创建用户模型
const Menu = mongoose.model('Menu', menuSchema)

// 预校验规则
const menuValidationRules = () => [
  // 菜单名称
  body('menuName').notEmpty().withMessage('菜单名称不能为空').bail().isLength({ min: 2, max: 20 }).withMessage('菜单名称长度在2-20之间'),
  // 菜单类型
  body('menuType').notEmpty().withMessage('菜单类型不能为空').bail().isIn(['0', '1', '2']).withMessage('菜单类型只能是0,1,2'),
  // 权限标识
  body('perms').notEmpty().withMessage('权限标识不能为空'),
  // 排序
  body('sort').notEmpty().withMessage('排序不能为空').bail().isNumeric().withMessage('排序必须为数字'),
  // 状态
  body('status').notEmpty().withMessage('状态不能为空').bail().isString().withMessage('状态必须为字符串').bail().isIn(['1', '0']).withMessage('状态只能是1,0'),
  // 是否隐藏
  body('visible').notEmpty().withMessage('是否隐藏不能为空').bail().isString().withMessage('是否隐藏必须为字符串').bail().isIn(['1', '0']).withMessage('是否隐藏只能是1,0'),
]

module.exports = { Menu, schemaRules, menuValidationRules }
