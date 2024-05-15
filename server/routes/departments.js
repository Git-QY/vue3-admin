var express = require('express')
var router = express.Router()
const { Department, departmentValidationRules, validationResult } = require('../mongodb/models/department')
// 添加部门
router.post('/add', departmentValidationRules(true), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  const { body, user } = req
  try {
    await Department.create({ ...body, id: $generateUUID() }) // 创建新用户
    res.send({ code: 200, message: '创建成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 删除部门
router.delete('/delete', async (req, res) => {
  const { id } = req.query
  try {
    const hasChildren = await Department.findOne({ parentId: id })
    if (hasChildren) return res.send({ code: 500, message: '存在子部门，不允许删除' })
    await Department.deleteOne({ id })
    res.send({ code: 200, message: '删除成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 更新列表
router.put('/update', departmentValidationRules(false), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  const { body } = req
  try {
    // 更新时间
    body.updateTime = new Date()
    await Department.updateOne({ id: body.id }, { ...body })
    res.send({ code: 200, message: '修改成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 部门列表
router.post('/list', async (req, res) => {
  const { ...query } = req.body
  try {
    const list = await Department.find({ ...query, deptName: { $regex: query.deptName ?? '' } })
    res.send({ code: 200, message: '获取成功', data: list })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 部门详情
router.get('/detail', async (req, res) => {
  const { id } = req.query
  try {
    const detail = await Department.findOne({ id })
    res.send({ code: 200, message: '获取成功', data: detail })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
module.exports = router
