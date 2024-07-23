const express = require('express')
const router = express.Router()
const { Interview, validationResult, interviewValidationRules } = require('../mongodb/models/interview')

router.post('/add', interviewValidationRules(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  const { body, user } = req
  try {
    await Interview.create({ ...body, createById: user.id })
    res.send({ code: 200, message: '创建成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
router.delete('/delete', async (req, res) => {
  const { id, ids } = req.query
  try {
    if (id) {
      await Interview.deleteOne({ id })
    } else if (ids) {
      const idArray = ids.map(id => id.trim())
      await Interview.deleteMany({ id: { $in: idArray } })
    } else {
      throw new Error('缺少必要的参数')
    }
    res.status(200).json({ code: 200, message: '删除成功' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})
router.put('/update', interviewValidationRules(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  const { body } = req
  try {
    await Interview.updateOne({ id: body.id }, { ...body, updateTime: new Date() })
    res.send({ code: 200, message: '修改成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
router.get('/detail', async (req, res) => {
  const { id, ids } = req.query
  try {
    if (id) {
      const dept = await Interview.findOne({ id })
      if (!dept) throw new Error('未找到该资源')
      res.status(200).json({ code: 200, data: dept })
    } else if (ids) {
      const idArray = ids.map(id => id.trim())
      const depts = await Interview.find({ id: { $in: idArray } })
      res.status(200).json({ code: 200, data: depts })
    } else {
      throw new Error('缺少必要的参数')
    }
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})
router.post('/list', async (req, res) => {
  const { page = { pageSize: 10, page: 1 }, ...data } = req.body
  const query = { ...data, stem: { $regex: data.stem ?? '' } }
  try {
    const list = await Interview.aggregate([
      { $match: query }, // 匹配查询条件
      { $sort: { sort: 1 } }, // 按创建时间倒序排序
      { $skip: (page.page - 1) * page.pageSize }, // 跳过指定数量的文档
      { $limit: page.pageSize }, // 限制返回的文档数量
      // { $project: { field_to_exclude: 0 } }, // 排除指定字段
    ])
    const total = await Interview.countDocuments(query) // 获取符合条件的用户总数
    res.send({ code: 200, data: list, page: { ...page, total }, message: '获取成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})

module.exports = router
