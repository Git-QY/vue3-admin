const express = require('express')
const router = express.Router()
const { BirthdayRecord, validationResult,schemaRules, birthdayRecordValidationRules } = require('../mongodb/models/birthdayRecord')
const { generateUUID } = require('../utils/index')
// 创建生日记录
router.post('/add', birthdayRecordValidationRules(), async (req, res) => {
  const { body } = req
  try {
    await BirthdayRecord.create({ ...body, id: generateUUID() }) // 创建新用户
    res.send({ code: 200, message: '创建成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 删除角色
router.delete('/delete', async (req, res) => {
  const { id } = req.body
  try {
    await BirthdayRecord.deleteOne(id)
    res.send({ code: 200, message: '删除成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 修改用户
router.put('/update', birthdayRecordValidationRules(false), async (req, res) => {
  const errors = validationResult(req)
  // if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) [0]})
  try {
    const { id } = req.body
    await BirthdayRecord.updateOne({ id }, { ...req.body, updatedTime: Date.now() })
    res.send({ code: 200, message: '更新成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 获取角色列表
router.post('/query', async (req, res) => {
  const { name, page = { pageSize: 10, page: 1 } } = req.body
  const query = {}
  if (name) {
    query.name = { $regex: name }
  }
  try {
    const birthdayRecordList = await BirthdayRecord.find(query)
      .skip((page.page - 1) * page.pageSize)
      .limit(page.pageSize)
      .sort({ createdAt: -1 }) // 按创建时间倒序排序
    const total = await BirthdayRecord.countDocuments(query) // 获取符合条件的用户总数
    res.send({ code: 200, data: birthdayRecordList, page: { ...page, total }, message: '获取成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
module.exports = router
