const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')

// 部门
const departmentSchemaRules = {
  id: { type: String }, // id
  deptName: { type: String, required: true }, // 部门名称
  remark: { type: String, default: null }, // 备注
  parentId: { type: String, default: '0' }, // 上级部门ID，默认为0表示顶级部门
  leader: { type: String, default: '' }, // 部门负责人
  phone: { type: String, default: '' }, // 联系电话
  email: { type: String, default: '' }, // 联系邮箱
  status: { type: String, default: '0' }, // 部门状态，1表示启用，0表示禁用
  createBy: { type: String, default: null }, // 创建者
  createTime: { type: Date, default: Date.now },
  updateBy: { type: String, default: null }, // 更新者
  updateTime: { type: Date, default: Date.now },
}

// 创建部门模型
const Department = mongoose.model('Department', new mongoose.Schema(departmentSchemaRules))

// 预校验规则
const departmentValidationRules = isNewUser => [
  // 部门名称全局唯一
  body('deptName')
    .notEmpty()
    .withMessage('部门名称不能为空')
    .custom(async (value, { req }) => {
      const query = { deptName: value }
      if (req.body.id) {
        query._id = { $ne: req.body._id }
      }
      const department = await Department.findOne(query)
      if (department) {
        throw new Error('部门名称已存在')
      }
    }),
  body('remark').optional({ checkFalsy: true }).isLength({ max: 100 }).withMessage('部门描述不能超过100个字符'),
  body('leader').optional({ checkFalsy: true }).isString().withMessage('部门负责人必须为字符串'),
  body('parentId').notEmpty().withMessage('上级部门名称不能为空'),
  body('phone').optional({ checkFalsy: true }).isMobilePhone('zh-CN').withMessage('联系电话必须为手机号'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('联系邮箱必须为邮箱格式'),
  body('status').optional({ checkFalsy: true }).isIn(['0', '1']).withMessage('部门状态必须为0或1'),
]

module.exports = { Department, departmentValidationRules, validationResult }
