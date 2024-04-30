var express = require('express')
var router = express.Router()
const { User, userValidationRules, validationResult } = require('../mongodb/models/user')
const { Role } = require('../mongodb/models/role')
const { generateUUID, sendMail } = require('../utils/index')
const { createToken, verifyToken } = require('../utils/token')
const { encryptHash, hashWithSalt } = require('../utils/auth')
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
  // 一个游戏只能注册一个账号
  const emailUser = await User.findOne({ email })
  if (emailUser) return res.send({ code: 400, message: '该邮箱已注册' })
  // 判断邮箱验证码是否正确 失效时间1分钟
  if (check[email] === code) {
    await User.create({ ...req.body, id: generateUUID(), password: hashWithSalt(password) }) // 创建新用户
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
  let { username, password } = req.body
  if (!username || !password) return res.send({ code: 500, message: '用户名或密码不能为空' })
  try {
    password = hashWithSalt(password)
    const user = await User.findOne({ username, password: password })
    if (!user) return res.send({ code: 403, message: '用户名或密码错误' })
    const { status, id } = user
    if (status == 0) return res.send({ code: 403, message: '该用户已被禁用' })
    let token = createToken({ login: true, name: username, id })
    res.send({ code: 200, message: '登录成功', data: { token, userInfo: user } })
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
  const { email, token, newPassword, nextPassword } = req.body
  if (!email || !newPassword || !nextPassword || !token) return res.send({ code: 400, message: '缺少必填参数' })
  // 判断是否注册
  const user = await User.findOne({ email })
  if (!user) return res.send({ code: 400, message: '用户不存在' })
  // 判断2次密码是否一致
  if (newPassword !== nextPassword) return res.send({ code: 400, message: '两次密码不一致' })
  // 更新密码
  try {
    // 校验token
    const result = await verifyToken(token, 'checkEmailCode')
    if (result.email !== email) return res.send({ code: 400, message: 'token标识错误' })
    await User.updateOne({ id: user.id }, { ...req.body, updateTime: Date.now(), password: hashWithSalt(newPassword) })
    res.send({ code: 200, message: '密码修改成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 邮箱验证码登录
router.post('/login/email', async (req, res) => {
  // 获取邮箱验证
  const { email, code } = req.body
  // 验证邮箱验证码
  if (check[email] === code) {
    try {
      // 拿到用户信息
      const user = await User.findOne({ email })
      // 返回token
      const token = createToken({ login: true, name: user.username, id: user.id })
      res.send({ code: 200, message: '登录成功', data: { token, userInfo: user } })
    } catch (error) {
      res.send({ code: 500, message: error })
    }
  }
})

// 第三方登录
/**
 * @api {post} /users/login/third 第三方登录
 * @apiHeader {String} token token
 * @apiDescription   
  1 创建第三方应用 填写回调地址(项目的一个页面来获取code)<br>
  2 点击第三方提供的链接跳转 会自动给回调地址拼接上code<br>
  3 根据回调地址获取code code用过第三方的开放接口获取用户信息<br>
  4 根据用户信息生成账号 成功登录<br>
  5 在我们的回调地址页面 页面会更具监听是否成功登陆来跳转
 * @apiGroup users
 * @apiBody {String} type 第三方登录的类型(目前只支持gitee)
 * @apiBody {String} code 获取用户信息的code
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} message 消息
 * @apiSuccess {String} data 数据
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "code": 200,
 *   "message": "登录成功"
 *   "data": {}
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *   "code": 500,
 *   "message": "登录失败"
 * }
 * @apiVersion 0.0.1
 *
 */
const axios = require('axios')
// 目前有个问题就是如果注册的邮箱和第三方登录的邮箱相同 怎么处理
router.post('/login/third', async (req, res) => {
  const { type, code } = req.body
  if (!type || !code) return res.send({ code: 500, message: '缺少必填参数' })
  try {
    const response = await axios.post('https://gitee.com/oauth/token', {
      grant_type: 'authorization_code',
      code,
      client_id: 'c2c0c137422ab80e3a13ee7e242ae230b4825f5cf8cde692ce72ae99cea32f78',
      redirect_uri: 'http://localhost:5173/loginWithGitee.html',
      client_secret: '9d5f56dc5b8fc1ac9dc88a96ba322b0368ec4e94c49d594a5649fe492f4c6d1e',
    })
    // const response = {
    //   status: 200,
    //   data: {
    //     access_token: '8efd697cebcdc7e684f92d361b389432',
    //     token_type: 'bearer',
    //     expires_in: 86400,
    //     refresh_token: '969efe7099e8208dbd761881f1ef474c892b9dc78b5db3612de0e528922c4869',
    //     scope: 'user_info',
    //     created_at: 1712910568,
    //   },
    // }
    if (response.status !== 200) return res.send({ code: 500, error })
    const { access_token, token_type, refresh_token } = response.data
    const userInfo = await axios.get(`https://gitee.com/api/v5/user?access_token=${access_token}`)
    if (userInfo.status !== 200) return res.send({ code: 500, error })
    // 当前查询的第三方用户如果存在邮箱
    const findEmailUser = await User.findOne({ email: userInfo.data.email })
    // 提示邮箱已在当前系统中存在请使用邮箱登录
    // ****
    let thirdUser = null

    thirdUser = await User.findOne({ username: userInfo.data.name })
    if (!thirdUser) {
      thirdUser = await User.create({
        id: generateUUID(),
        username: userInfo.data.name,
        password: hashWithSalt(encryptHash('123456')),
        avatar: userInfo.data.avatar_url,
        status: 1,
        createTime: new Date(),
        updateTime: new Date(),
      })
    }
    let token = createToken({ login: true, name: thirdUser.username, id: thirdUser.id })
    res.send({ code: 200, message: '登录成功', data: { token, userInfo: thirdUser } })
  } catch (error) {
    res.send({ code: 500, error })
  }
})

// ******************************************************************************************************************
// 新增用户
router.post('/add', userValidationRules(true), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  }
  try {
    const { body } = req
    const createTime = new Date()
    await User.create({ ...body, id: generateUUID(), createTime, password: hashWithSalt(encryptHash('123456')) }) // 创建新用户
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
// 单独更新某一个字段
const canUpdateField = ['status']
router.put('/update/field', async (req, res) => {
  const { fieldName, fieldValue, id } = req.body
  // 字段的类型格式验证(后续添加)
  if (!canUpdateField.includes(fieldName)) return res.send({ code: 500, message: '该字段不允许更新' })
  if (!fieldName || !fieldValue || !id) return res.send({ code: 500, message: '缺少参数' })
  try {
    const updateField = {}
    updateField[fieldName] = fieldValue
    await User.updateOne({ id }, { ...updateField, updateTime: Date.now() })
    res.send({ code: 200, message: '更新成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 修改用户
router.put('/update', userValidationRules(false), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  try {
    const { id } = req.body
    await User.updateOne({ id }, { ...req.body, updateTime: Date.now() })
    res.send({ code: 200, message: '更新成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 查询用户列表
router.post('/list', async (req, res) => {
  const { username, email, page = { pageSize: 10, page: 1 } } = req.body
  const query = { ...req.body }
  // 添加 username 模糊查询条件
  if (username) query.username = { $regex: username }
  if (email) query.email = { $regex: email }
  try {
    const users = await User.find(query)
      .skip((page.page - 1) * page.pageSize)
      .limit(page.pageSize)
      .sort({ createTime: -1 }) // 按创建时间倒序排序
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
/**
 * @api {post} /users/assign/roles 给用户分配角色
 * @apiDescription 根据用户 ID 给用户分配角色
 * @apiGroup 用户接口
 * @apiParam {Array} userIds 用户 ID 列表
 * @apiParam {Array} roleIds 角色 ID 列表
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userIds": ["605c72c1d3b2a832b2e8e001", "605c72c1d3b2a832b2e8e002"],
 *       "roleIds": ["605c72c1d3b2a832b2e8e032", "605c72c1d3b2a832b2e8e033"]
 *     }
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 成功信息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "角色分配成功"
 *     }
 * @apiError {Number} code 错误状态码
 * @apiError {String} message 错误信息
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "用户不存在"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "部分角色不存在"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": "服务器内部错误"
 *     }
 * @apiVersion 0.0.1
 */
router.post('/assign/roles', async (req, res) => {
  const { userIds, roleIds } = req.body
  if (!userIds || !roleIds || !Array.isArray(userIds) || !Array.isArray(roleIds)) {
    return res.send({ code: 500, message: '参数错误' })
  }
  // 校验userIds和roleIds是否都存在
  try {
    // 假设有一个UserModel和RoleModel，以及一个UserRole关联模型
    const users = await User.find({ id: { $in: userIds } }) // 查询用户是否存在
    const roles = await Role.find({ id: { $in: roleIds } }) // 查询角色是否存在
    // 验证查询结果，确保所有提供的ID都是有效的
    if (users.length !== userIds.length || roles.length !== roleIds.length) {
      return res.send({ code: 404, message: '部分用户或角色不存在' })
    }
    // 把roleIds分配给每个userIds对应的用户
    // 批量更新
    await User.updateMany({ id: { $in: userIds } }, { $set: { roleIds: roleIds } })
    res.send({ code: 200, message: '角色分配成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// ******************************************************************************************************************
module.exports = router
