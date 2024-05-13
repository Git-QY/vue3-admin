// 日志
const mongoose = require('mongoose')
const schemaRules = {
  id: { type: String },
  content: { type: String, default: '' }, // 日志内容
  url: { type: String, default: '' }, // 日志来源URL
  ip: { type: String, default: '' }, // 日志来源IP
  address: { type: Object, default: {} }, // ip所属地址
  presenterId: { type: String, default: '' }, // 提交人id (有可能不存在 当访问接口不存在的token)
  createTime: { type: Date, default: Date.now }, // 创建时间
  updateTime: { type: Date, default: Date.now }, // 更新时间
}

module.exports = { Log: mongoose.model('Log', new mongoose.Schema(schemaRules)) }
