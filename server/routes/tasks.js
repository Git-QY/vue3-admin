const express = require('express')
const router = express.Router()
const { Task, taskPreValidate, validationResult } = require('../mongodb/models/task')

// id: { type: String, required: true }, // 任务ID
// taskName: { type: String, required: true }, // 任务名称
// remark: { type: String }, // 任务描述
// priority: { type: String }, // 任务优先级 'low' 低 'medium' 中等  'high' 高
// status: { type: String }, // 任务状态  ‘0’：未认领，‘1’：开发中，‘2’：'已完成'

// assigneeId: { type: String }, // 认领人id 查询详细的时候通过连表查询

// tags: { type: String }, // 关联标签  '1'：bug，'2'：优化，'3'：新功能，'4'：其他
// attachments: { type: String }, // 附件

// startTime: { type: Date }, // 开始时间
// endTime: { type: Date }, // 结束时间

// createTime: { type: Date, default: Date.now },
// createById: { type: String }, // 创建人id
// updateTime: { type: Date, default: Date.now },
// updateById: { type: String }, // 更新人id

// 新增任务
/**
 * @api {post} /tasks/add 新增任务
 * @apiDescription 新增任务信息
 * @apiGroup 任务接口
 * @apiBody {String} taskName 任务名称
 * @apiBody {String} [remark] 备注
 * @apiBody {String} priority 任务优先级 'low' 低 'medium' 中等 'high' 高
 * @apiBody {String} status 任务状态 '0': 未认领, '1': 开发中, '2': 已完成
 * @apiBody {String} assigneeId 认领人ID
 * @apiBody {String} [tags] 关联标签 '1': bug, '2': 优化, '3': 新功能, '4': 其他
 * @apiBody {String} [attachments] 附件
 * @apiBody {Date} [startTime] 开始时间
 * @apiBody {Date} [endTime] 结束时间
 * @apiParamExample {json} Request-Example:
 *     {
 *       "taskName": "任务名称",
 *       "remark": "备注",
 *       "priority": "high",
 *       "status": "0",
 *       "assigneeId": "认领人ID",
 *       "tags": "1",
 *       "attachments": "附件",
 *       "startTime": "2024-05-13T12:00:00Z",
 *       "endTime": "2024-05-20T12:00:00Z",
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
 *       "message": "错误信息"
 *     }
 * @apiVersion 0.0.1
 */
router.post('/add', taskPreValidate(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  const { body, user } = req
  try {
    await Task.create({ ...body, id: $generateUUID(), createById: user.id }) // 创建新用户
    res.send({ code: 200, message: '创建成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 删除任务
/**
 * @api {delete} /tasks/delete 删除任务
 * @apiDescription 删除指定ID的任务
 * @apiGroup 任务接口
 * @apiParam {String} id 任务ID
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "删除成功"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": "错误信息"
 *     }
 * @apiVersion 0.0.1
 */
router.delete('/delete', async (req, res) => {
  const { id } = req.query
  try {
    await Task.deleteOne({ id })
    res.send({ code: 200, message: '删除成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 修改任务
/**
 * @api {put} /tasks/update 修改任务
 * @apiDescription 修改指定ID的任务信息
 * @apiGroup 任务接口
 * @apiBody {String} id 任务ID
 * @apiBody {String} taskName 任务名称
 * @apiBody {String} [remark] 备注
 * @apiBody {String} priority 任务优先级 'low' 低 'medium' 中等 'high' 高
 * @apiBody {String} status 任务状态 '0': 未认领, '1': 开发中, '2': 已完成
 * @apiBody {String} assigneeId 认领人ID
 * @apiBody {String} [tags] 关联标签 '1': bug, '2': 优化, '3': 新功能, '4': 其他
 * @apiBody {String} [attachments] 附件
 * @apiBody {Date} [startTime] 开始时间
 * @apiBody {Date} [endTime] 结束时间
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": "任务ID",
 *       "taskName": "任务名称",
 *       "remark": "备注",
 *       "priority": "high",
 *       "status": "0",
 *       "assigneeId": "认领人ID",
 *       "tags": "1",
 *       "attachments": "附件",
 *       "startTime": "2024-05-13T12:00:00Z",
 *       "endTime": "2024-05-20T12:00:00Z",
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "更新成功"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": "错误信息"
 *     }
 * @apiVersion 0.0.1
 */
router.put('/update', taskPreValidate(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  const { body, user } = req
  try {
    await Task.updateOne({ id: body.id }, { ...body, updateTime: Date.now(), updateById: user.id })
    res.send({ code: 200, message: '更新成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 单独更新某一个字段
/**
 * @api {put} /tasks/update/field 单独更新任务字段
 * @apiDescription 单独更新任务的指定字段
 * @apiGroup 任务接口
 * @apiBody {String} id 任务ID
 * @apiBody {String} fieldName 字段名称
 * @apiBody {String} fieldValue 字段值
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": "任务ID",
 *       "fieldName": "status",
 *       "fieldValue": "1"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "更新成功"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": "错误信息"
 *     }
 * @apiVersion 0.0.1
 */
const canUpdateField = ['status']
router.put('/update/field', async (req, res) => {
  const { fieldName, fieldValue, id } = req.body
  // 字段的类型格式验证(后续添加)
  if (!canUpdateField.includes(fieldName)) return res.send({ code: 500, message: '该字段不允许更新' })
  if (!fieldName || !fieldValue || !id) return res.send({ code: 500, message: '缺少参数' })
  try {
    const updateField = {}
    updateField[fieldName] = fieldValue
    await Task.updateOne({ id }, { ...updateField, updateTime: Date.now(), updateBy: req.user.name })
    res.send({ code: 200, message: '更新成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})
// 任务列表

/**
 * @api {get} /tasks/list 获取任务列表
 * @apiDescription 获取符合条件的任务列表
 * @apiGroup 任务接口
 * @apiParam {String} taskName 任务名称（可选）
 * @apiParam {Number} [page.page=1] 页码，默认为1
 * @apiParam {Number} [page.pageSize=10] 每页显示数量，默认为10
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "data": [
 *         {
 *           "id": "任务ID",
 *           "taskName": "任务名称",
 *           "remark": "任务描述",
 *           "priority": "任务优先级",
 *           "status": "任务状态",
 *           "assigneeId": "认领人ID",
 *           "tags": "关联标签",
 *           "attachments": "附件",
 *           "startTime": "开始时间",
 *           "endTime": "结束时间",
 *           "createTime": "创建时间",
 *           "createById": "创建人ID",
 *           "updateTime": "更新时间",
 *           "updateById": "更新人ID"
 *         },
 *         ...
 *       ],
 *       "page": {
 *         "page": 1,
 *         "pageSize": 10,
 *         "total": 100
 *       },
 *       "message": "获取成功"
 *     }
 * @apiError {Number} code 状态码，500表示服务器内部错误
 * @apiError {String} message 错误消息
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": "服务器内部错误"
 *     }
 * @apiVersion 0.0.1
 */

router.get('/list', async (req, res) => {
  const { taskName, page = { pageSize: 10, page: 1 } } = req.body
  const query = { ...req.body, taskName: { $regex: taskName } }
  try {
    const task = await await Task.aggregate([
      { $match: query }, // 匹配查询条件
      { $sort: { createTime: 1 } }, // 按创建时间倒序排序
      { $skip: (page.page - 1) * page.pageSize }, // 跳过指定数量的文档
      { $limit: page.pageSize }, // 限制返回的文档数量
    ])
    const total = await Task.countDocuments(query) // 获取符合条件的用户总数
    res.send({ code: 200, data: task, page: { ...page, total }, message: '获取成功' })
  } catch (error) {
    res.send({ code: 500, message: error })
  }
})

module.exports = router
