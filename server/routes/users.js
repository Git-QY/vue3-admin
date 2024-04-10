var express = require('express')
var router = express.Router()
const { User } = require('../mongodb/models/user')
const { generateUUID } = require('../utils/index')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '可以访问用户的接口' })
})
// 新增用户
router.post('/add', async (req, res) => {
  const { body } = req
  try {
    await User.create({ ...body, id: generateUUID() }) // 创建新用户
    res.send({ code: 200, message: '创建成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 删除用户
router.delete('/delete', async (req, res) => {
  try {
    const { id, ids } = req.body
    if (id) {
      await User.deleteOne({ id })
    } else {
      await User.deleteMany({ id: { $in: ids } })
    }
    res.send({ code: 200, message: '删除成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 修改用户
router.put('/update', async (req, res) => {
  try {
    const { id } = req.body
    await User.updateOne({ id }, { ...req.body, updatedTime: Date.now() })
    res.send({ code: 200, message: '更新成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 查询用户列表
router.post('/list', async (req, res) => {
  const { username, page = { pageSize: 10, page: 1 } } = req.body
  const query = {}
  // 添加 username 模糊查询条件
  if (username) {
    query.username = { $regex: username }
  }
  try {
    const users = await User.find(query)
      .skip((page.page - 1) * page.pageSize)
      .limit(page.pageSize)
      .sort({ createdTime: -1 }) // 按创建时间倒序排序
    const total = await User.countDocuments(query) // 获取符合条件的用户总数
    res.send({ code: 200, data: users, page: { ...page, total } })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 用户详情
router.get('/detail', async (req, res) => {
  try {
    const userId = req.query.id
    const user = await User.findOne({ id: userId }) // 根据ID查询用户
    if (!user) res.send({ code: 500, message: `没有ID为${userId}的用户信息` })
    res.send({ code: 200, data: user })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
module.exports = router
