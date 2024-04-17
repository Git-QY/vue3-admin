const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator') // 引入验证规则
const schemaRules = {
  name: { type: String, required: true },
  hash: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
}
const Schema = new mongoose.Schema(schemaRules)
const File = mongoose.model('flie', Schema)

const validationRules = () => []

module.exports = { File, schemaRules, validationRules }
