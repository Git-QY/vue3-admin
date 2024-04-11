var express = require('express')
var router = express.Router()
const { User } = require('../mongodb/models/user')
const { generateUUID, sendMail } = require('../utils/index')
const { createToken, verifyToken } = require('../utils/token')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '可以访问用户的接口' })
})
// 根据邮箱获取code
// 设置一个定时器 定时清除check和邮箱的对应关系
const check = {}
router.get('/code', function (req, res, next) {
  let email = req.query.email
  // 获取邮箱
  if (!email) return res.send({ code: 400, message: '缺少必填参数' })
  let code = Math.random().toString().slice(2, 6)
  check[email] = code // 邮箱和验证码对应关系
  sendMail(email, code, function (result) {
    if (result) {
      // 获取邮箱成功 开启定时器
      setTimeout(() => {
        delete check[email]
        console.log(`成功清除${email}code的对应关系`)
      }, 60000)
      res.send({ code: 200, message: '验证码发送成功' })
    } else {
      res.send({ code: 400, message: '验证码发送失败' })
    }
  })
})
// 注册用户
router.post('/register', async function (req, res) {
  const { username, password, email, code } = req.body // 必填账号密码邮箱
  if (!username || !password || !email || !code) return res.send({ code: 400, message: '缺少必填参数' })
  // 用户名唯一
  const user = await User.findOne({ username })
  if (user) return res.send({ code: 400, message: '用户名已存在' })
  // 判断邮箱验证码是否正确 失效时间1分钟
  if (check[email] === code) {
    await User.create({ ...req.body, id: generateUUID() }) // 创建新用户
    res.send({ code: 200, message: '注册成功' })
  } else {
    return res.send({ code: 400, message: '验证码错误' })
  }
})
// 检验验证码
router.post('/checkCode', async function (req, res) {
  // 获取邮箱和验证码
  const { email, code } = req.body
  if (!email || !code) return res.send({ code: 400, message: '缺少必填参数' })
  // 校验用户是否注册过
  const user = await User.findOne({ email })
  if (!user) return res.send({ code: 400, message: '用户不存在' })
  // 判断邮箱验证码是否正确 失效时间1分钟
  if (check[email] === code) {
    res.send({ code: 200, message: '验证成功' })
  } else {
    return res.send({ code: 400, message: '验证码错误' })
  }
})
// 用户登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.send({ code: 500, message: '用户名或密码不能为空' })
  try {
    const user = await User.findOne({ username, password: password })
    if (!user) return res.send({ code: 403, message: '用户名或密码错误' })
    const { status, id } = user
    if (status === 0) return res.send({ code: 403, message: '该用户已被禁用' })
    let token = createToken({ login: true, name: username, id })
    res.send({ code: 200, message: '登录成功', data: { token, userInfo: user } })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
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
// 忘记密码
// 1 获取邮箱验证码
// 2 校验邮箱验证码
// 3 输入新密码
// 4 修改密码

// 检验验证码
router.post('/checkEmailCode', async function (req, res, next) {
  // 获取邮箱和验证码
  const { email, code } = req.body
  if (!email || !code) return res.send({ code: 400, message: '缺少必填参数' })
  // 校验用户是否注册过
  const user = await User.findOne({ email })
  if (!user) return res.send({ code: 400, message: '用户不存在' })
  // 判断邮箱验证码是否正确 失效时间1分钟
  if (check[email] === code) {
    // 生成一个token来判断是否获取成功code
    const token = createToken({ email, code }, 'checkEmailCode')
    res.send({ code: 200, message: '验证成功', data: token })
  } else {
    return res.send({ code: 400, message: '验证码错误' })
  }
})
// 修改密码
router.post('/forget', async (req, res) => {
  const { email, token, newPassword } = req.body
  if (!email || !newPassword) return res.send({ code: 400, message: '缺少必填参数' })
  // 判断是否注册
  const user = await User.findOne({ email })
  if (!user) return res.send({ code: 400, message: '用户不存在' })
  // 更新密码
  try {
    // 校验token
    const result = await verifyToken(token, 'checkEmailCode')
    if (result.email !== email) return res.send({ code: 400, message: 'token验证失败' })
    await User.updateOne({ id: user.id }, { ...req.body, updatedTime: Date.now(), password: newPassword })
    res.send({ code: 200, message: '密码修改成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
module.exports = router
