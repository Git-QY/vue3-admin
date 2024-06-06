const express = require('express')
const router = express.Router()
const { Log, validationResult } = require('../mongodb/models/log')

// 新增日志
router.post('/add', async (req, res) => {
  const { body, user } = req
  try {
    await Log.create({ ...body, id: $generateUUID(), createById: user.id ?? null })
    res.send({ code: 200, message: '创建成功' })
  } catch (error) {
    res.send({ code: 500, message: '创建失败' })
  }
})
// 删除日志
router.delete('/delete', async (req, res) => {
  const { id } = req.query
  try {
    await Log.deleteOne({ id })
    res.send({ code: 200, message: '删除成功' })
  } catch (error) {
    res.send({ code: 500, message: '删除失败' })
  }
})
// 获取日志列表
router.post('/list', async (req, res) => {
  const { page = { pageSize: 10, page: 1 }, ...data } = req.body
  const query = { ...data, url: { $regex: data.url ?? '' } }
  try {
    const logs = await Log.aggregate([
      { $match: query }, // 匹配查询条件
      { $sort: { createTime: -1 } }, // 按照创建时间升序排序
      { $skip: (page.page - 1) * page.pageSize }, // 跳过指定数量的文档
      { $limit: page.pageSize }, // 限制返回的文档数量
      { $lookup: { from: 'users', localField: 'createById', foreignField: 'id', as: 'user' } }, // 通过 $lookup 聚合操作，将日志与用户关联起来
      { $unwind: '$user' }, // 将关联的数组拆分成单独的文档
      { $addFields: { createBy: '$user.username' } }, // 生成一个新字段  updateBy:user.username
      { $project: { user: 0 } }, // 删除 user 字段
    ])
    const total = await Log.countDocuments(query)
    res.send({ code: 200, data: logs, page: { ...page, total }, message: '获取成功' })
  } catch (error) {}
})
module.exports = router
