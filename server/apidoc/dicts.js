/**
 * @api {post} /dict/add 新增字典
 * @apiDescription 新增字典信息
 * @apiGroup 字典接口
 * @apiBody {String} dictName 字典名称
 * @apiBody {String} dictType 字典类型，全局唯一
 * @apiBody {String} [remark] 备注
 * @apiBody {Number} [sort] 排序，默认为0
 * @apiBody {String} [status] 字典状态，1表示启用，0表示禁用，默认为1
 * @apiBody {String} createById 创建人ID
 * @apiParamExample {json} Request-Example:
 *     {
 *       "dictName": "字典名称",
 *       "dictType": "字典类型",
 *       "createById": "创建人ID"
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
 * @api {post} /dict/list 获取字典列表
 * @apiDescription 获取字典列表信息
 * @apiGroup 字典接口
 * @apiParam {Object} page 分页信息
 * @apiParam {Number} page.page 页码，默认为1
 * @apiParam {Number} page.pageSize 每页数量，默认为10
 * @apiBody {String} [dictName] 字典名称，模糊查询
 * @apiParamExample {json} Request-Example:
 *     {
 *       "page": {
 *         "page": 1,
 *         "pageSize": 10
 *       },
 *       "dictName": "字典名称"
 *        ...
 *     }
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Object} data 字典列表数据
 * @apiSuccess {Object} page 分页信息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "查询成功",
 *       "data": [],
 *       "page": {
 *         "page": 1,
 *         "pageSize": 10,
 *         "total": 0
 *       }
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
 * @api {put} /dict/update 更新字典
 * @apiDescription 更新字典信息
 * @apiGroup 字典接口
 * @apiBody {String} id 字典ID
 * @apiBody {String} [dictName] 字典名称
 * @apiBody {String} [dictType] 字典类型
 * @apiBody {String} [remark] 备注
 * @apiBody {Number} [sort] 排序
 * @apiBody {String} [status] 字典状态
 * @apiBody {String} updateById 更新者ID
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": "字典ID",
 *       "dictName": "字典名称",
 *       "dictType": "字典类型",
 *       "updateById": "更新者ID"
 *        ...
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
 *       "message": ""
 *     }
 * @apiVersion 0.0.1
 */

/**
 * @api {delete} /dict/delete 删除字典
 * @apiDescription 删除字典信息
 * @apiGroup 字典接口
 * @apiParam {String} id 字典ID
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": "字典ID"
 *     }
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
 *       "message": ""
 *     }
 * @apiVersion 0.0.1
 */

/**
 * @api {post} /dict/item/add 新增字典项
 * @apiDescription 新增字典项信息
 * @apiGroup 字典接口
 * @apiBody {String} dictId 字典id
 * @apiBody {String} dictType 字典code
 * @apiBody {String} [parentId] 父级id
 * @apiBody {String} lable 名称
 * @apiBody {String} value 值
 * @apiBody {Number} [sort] 排序
 * @apiBody {String} [remark] 备注
 * @apiBody {String} [status] 状态，1表示启用，0表示禁用
 * @apiBody {String} createById 创建人ID
 * @apiParamExample {json} Request-Example:
 *     {
 *       "dictId": "字典id",
 *       "dictType": "字典code",
 *       "lable": "名称",
 *       "value": "值",
 *       "createById": "创建人ID"
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
 * @api {get} /dict/item/list 获取字典项列表
 * @apiDescription 获取字典项列表信息
 * @apiGroup 字典接口
 * @apiParam {Number} [page=1] 页码
 * @apiParam {Number} [pageSize=10] 每页数量
 * @apiParam {String} [dictId] 字典id
 * @apiParam {String} [dictType] 字典code
 * @apiParam {String} [parentId] 父级id
 * @apiParamExample {json} Request-Example:
 *     {
 *       "page": 1,
 *       "pageSize": 10,
 *       "dictId": "字典id",
 *       "dictType": "字典code",
 *       "parentId": "父级id"
 *        ...
 *     }
 * @apiSuccess {Object[]} data 字典项列表数据
 * @apiSuccess {Number} code 返回状态码，200表示成功
 * @apiSuccess {String} message 返回消息，查询成功或错误信息
 * @apiSuccess {Object} page 分页信息
 * @apiSuccess {Number} page.page 当前页码
 * @apiSuccess {Number} page.pageSize 每页数量
 * @apiSuccess {Number} page.total 总记录数
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "查询成功",
 *       "data": [
 *           {
 *               "id": "字典项ID",
 *               "dictId": "字典id",
 *               "dictType": "字典code",
 *               "parentId": "父级id",
 *               "lable": "名称",
 *               "value": "值",
 *               "sort": 0,
 *               "remark": "备注",
 *               "status": "1",
 *               "createTime": "创建时间",
 *               "createById": "创建人ID",
 *               "updateTime": "更新时间",
 *               "updateById": "更新人ID",
 *               "createdBy": "创建人用户名",
 *               "updatedBy": "更新人用户名"
 *           }
 *       ],
 *       "page": {
 *           "page": 1,
 *           "pageSize": 10,
 *           "total": 1
 *       }
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
 * @api {put} /dict/item/update 更新字典项
 * @apiDescription 更新字典项信息
 * @apiGroup 字典接口
 * @apiBody {String} id 字典项ID
 * @apiBody {String} dictId 字典id
 * @apiBody {String} dictType 字典code
 * @apiBody {String} [parentId] 父级id
 * @apiBody {String} lable 名称
 * @apiBody {String} value 值
 * @apiBody {Number} [sort] 排序
 * @apiBody {String} [remark] 备注
 * @apiBody {String} [status] 状态，1表示启用，0表示禁用
 * @apiBody {String} updateById 更新人ID
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": "字典项ID",
 *       "dictId": "字典id",
 *       "dictType": "字典code",
 *       "lable": "名称",
 *       "value": "值",
 *       "updateById": "更新人ID"
 *        ...
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
 *       "message": ""
 *     }
 * @apiVersion 0.0.1
 */

/**
 * @api {delete} /dict/item/delete 删除字典项
 * @apiDescription 删除字典项信息
 * @apiGroup 字典接口
 * @apiParam {String} id 字典项ID
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": "字典项ID"
 *     }
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
 *       "message": ""
 *     }
 * @apiVersion 0.0.1
 */
