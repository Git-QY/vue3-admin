/**
 * @api {post} /tasks/add 新增任务
 * @apiDescription 新增任务信息
 * @apiGroup 任务接口
 * @apiHeader {String} token
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

/**
 * @api {delete} /tasks/delete 删除任务
 * @apiDescription 删除指定ID的任务
 * @apiGroup 任务接口
 * @apiHeader {String}  token
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

/**
 * @api {put} /tasks/update 修改任务
 * @apiDescription 修改指定ID的任务信息
 * @apiGroup 任务接口
 * @apiHeader {String}  token
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

/**
 * @api {put} /tasks/update/field 单独更新任务字段
 * @apiDescription 单独更新任务的指定字段
 * @apiGroup 任务接口
 * @apiHeader {String}  token
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

/**
 * @api {post} /tasks/list 获取任务列表
 * @apiDescription 获取符合条件的任务列表
 * @apiGroup 任务接口
 * @apiHeader {String}  token
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
