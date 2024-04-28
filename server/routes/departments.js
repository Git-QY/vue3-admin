var express = require('express')
var router = express.Router()
const { Department, departmentValidationRules, validationResult } = require('../mongodb/models/department')
// id: { type: String }, // id
// deptName: { type: String, required: true }, // 部门名称
// remark: { type: String, default: null }, // 备注
// parentId: { type: String, default: '0' }, // 上级部门ID，默认为0表示顶级部门
// leader: { type: String, default: '' }, // 部门负责人
// phone: { type: String, default: '' }, // 联系电话
// email: { type: String, default: '' }, // 联系邮箱
// status: { type: String, default: '0' }, // 部门状态，1表示启用，0表示禁用
// createBy: { type: String, default: null }, // 创建者
// createTime: { type: Date, default: Date.now },
// updateBy: { type: String, default: null }, // 更新者
// updateTime: { type: Date, default: Date.now },
/**
 * @api {post} /department/add 新增部门
 * @apiDescription 新增部门信息
 * @apiGroup 部门接口
 * @apiBody {String} deptName 部门名称
 * @apiBody {String} parentId 上级部门ID 默认为0表示顶级部门
 * @apiBody {String} [remark] 备注
 * @apiBody {String} [phone] 联系电话
 * @apiBody {String} [email] 邮箱
 * @apiBody {String} status 部门状态 ，1表示启用，0表示禁用
 * @apiBody {String} createBy 创建人
 * @apiBody {String} updateBy 更新者
 * @apiParamExample {json} Request-Example:
 *     {
 *       "deptName": "部门名称",
 *       "parentId": "上级部门ID"
 *        ...
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "创建成功"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": ""
 *     }
 * @apiVersion 0.0.1
 */
router.post('/add', departmentValidationRules(true), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  const { body } = req
  try {
    await Department.create({ ...body, id: $generateUUID() }) // 创建新用户
    res.send({ code: 200, message: '创建成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
/**
 * @api {delete} /department/delete 删除部门
 * @apiGroup 部门接口
 * @apiParam {String} id 部门id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "删除成功"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 500,
 *       "message": ""
 *     }
 */
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
/**
 * @api {put} /department/update 修改部门
 * @apiName 修改部门
 * @apiGroup 部门接口
 * @apiBody {String} id 部门id
 * @apiBody {String} deptName 部门名称
 * @apiBody {String} parentId 上级部门ID 默认为0表示顶级部门
 * @apiBody {String} [remark] 备注
 * @apiBody {String} [phone] 联系电话
 * @apiBody {String} [email] 邮箱
 * @apiBody {String} status 部门状态 ，1表示启用，0表示禁用
 * @apiBody {String} [createBy] 创建人
 * @apiBody {String} updateBy 更新者
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id"："xxxxxxxxxxxxx"
 *       "deptName": "部门名称",
 *       "parentId": "上级部门ID"
 *        ...
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "成功"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": ""
 *     }
 */
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
/**
 * @api {post} /department/list 部门列表
 * @apiDescription 获取全部列表 跟根据parentId获取相应的下级
 * @apiGroup 部门接口
 * @apiBody {String} any 全部参数可检索 deptName支持模糊
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id"："xxxxxxxxxxxxx"
 *       "deptName": "部门名称",
 *       "parentId": "上级部门ID"
 *        ...
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "成功"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": ""
 *     }
 */
router.post('/list', async (req, res) => {
  try {
    const list = await Department.find({ ...req.query, deptName: { $regex: deptName } })
    res.send({ code: 200, message: '获取成功', data: list })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 详情
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
