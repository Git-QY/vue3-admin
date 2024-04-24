const express = require('express')
const router = express.Router()
const { Role, schemaRules, roleValidationRules } = require('../mongodb/models/role')
const { generateUUID } = require('../utils/index')

// 创建角色  (主要是获取菜单资源数据)
router.post('/add', roleValidationRules(), async (req, res) => {
  const { body } = req
  try {
    await Role.create({ ...body, id: generateUUID() }) // 创建新用户
    res.send({ code: 200, message: '创建成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 获取角色列表
router.post('/list', async (req, res) => {
  const { name, page = { pageSize: 10, page: 1 } } = req.body
  const query = {}
  if (name) {
    query.name = { $regex: name }
  }
  try {
    const role = await Role.find(query)
      .skip((page.page - 1) * page.pageSize)
      .limit(page.pageSize)
      .sort({ createdAt: -1 }) // 按创建时间倒序排序
    const total = await Role.countDocuments(query) // 获取符合条件的用户总数
    res.send({ code: 200, data: role, page: { ...page, total }, message: '获取成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 更新角色
router.put('/update', roleValidationRules(), async (req, res) => {
  const { body } = req
  try {
    await Role.updateOne({ id: body.id }, { ...body, updatedTime: Date.now() })
    res.send({ code: 200, message: '更新成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 跟新角色状态
router.put('/update/status', async (req, res) => {
  const { status, id } = req.body
  if (!status || !id) return res.send({ code: 500, message: '缺少参数' })
  try {
    await Role.updateOne({ id }, { status, updatedTime: Date.now() })
    res.send({ code: 200, message: '更新成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 是否可以实现单独更新某一个字段的接口
// 删除角色
router.delete('/delete', async (req, res) => {
  const { id } = req.body
  try {
    await Role.deleteOne(id)
    res.send({ code: 200, message: '删除成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 获取角色详情
router.get('/detail', async (req, res) => {
  const { id } = req.query
  try {
    const role = await Role.findById(id)
    res.send({ code: 200, data: role, message: '获取成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})

module.exports = router
