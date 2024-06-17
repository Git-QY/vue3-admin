const express = require('express')
const router = express.Router()
const { Layout, validationResult } = require('../mongodb/models/layout')

/* 新增 */
router.post('/add', async (req, res) => {
  const { body } = req
  try {
    await Layout.create({ ...body })
    res.send({ code: 200, msg: '新增成功' })
  } catch (error) {
    console.log('🚀 ~ router.post ~ error:', error)
    res.send({ code: 500, msg: '新增失败' })
  }
})

/* 删除 */
router.delete('/delete', async (req, res) => {
  const { body } = req
  try {
    await Layout.deleteOne({ id: body.id })
    res.send({ code: 200, msg: '删除成功' })
  } catch (error) {
    res.send({ code: 500, msg: '删除失败' })
  }
})

/* 修改 */
router.put('/update', async (req, res) => {
  const { body } = req
  try {
    await Layout.updateOne({ id: body.id }, { ...body, updateTime: new Date() })
    res.send({ code: 200, msg: '修改成功' })
  } catch (error) {
    res.send({ code: 500, msg: '修改失败' })
  }
})

/* 列表(无分页) */
router.get('/list', async (req, res) => {
  const { query } = req
  try {
    const data = await Layout.find({ ...query })
    res.send({ code: 200, msg: '查询成功', data })
  } catch (error) {
    res.send({ code: 500, msg: '查询失败' })
  }
})

/* 详情 */
router.get('/detail', async (req, res) => {
  const { id } = req.query
  try {
    const data = await Layout.findOne({ id })
    res.send({ code: 200, msg: '查询成功', data })
  } catch (error) {
    res.send({ code: 500, msg: '查询失败' })
  }
})
module.exports = router
