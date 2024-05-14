/**
 * @api {post} /departments/add 新增部门
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

/**
 * @api {delete} /departments/delete 删除部门
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

/**
 * @api {put} /departments/update 修改部门
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

/**
 * @api {post} /departments/list 部门列表
 * @apiDescription 获取全部列表 跟根据parentId获取相应的下级
 * @apiGroup 部门接口
 * @apiHeader {String} token 用户授权token
 * @apiBody {String} any 全部参数可检索 deptName支持模糊
 * @apiParamExample {json} Request-Example:
 *     {
 *       "deptName": "部门名称",
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
