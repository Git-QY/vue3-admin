const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator') // 引入验证规则
// 生日记录
const schemaRules = {
  id: { type: String ,unique: true}, // id
  name: { type: String, required: true,  }, // 姓名
  sex: { type: String, default:'1'}, // 性别
  birthdayTime: { type: String, default: '' }, // 生日时间
  birthdayType: { type: String, default: '' }, // 生日类型
}

// 创建生日记录模型
const BirthdayRecord = mongoose.model('BirthdayRecord', new mongoose.Schema(schemaRules))

// 预校验规则
const birthdayRecordValidationRules = () => [
    body('name').notEmpty().withMessage('用户姓名不能为空'),
    body('sex').notEmpty().withMessage('用户性别不能为空').optional().isString().withMessage('用户性别为字符串').bail().isIn(['1', '2']).withMessage('状态值错误'),
    body('birthdayTime').notEmpty().withMessage('用户生日时间不能为空'),
    body('birthdayType').notEmpty().withMessage('用户生日类型不能为空').optional().isString().withMessage('用户性别为字符串').bail().isIn(['1', '2']).withMessage('状态值错误'),
]
module.exports = { BirthdayRecord, validationResult,schemaRules, birthdayRecordValidationRules }
