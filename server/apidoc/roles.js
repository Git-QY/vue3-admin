/**
 * @api {post} /roles/add 创建角色
 * @apiDescription 创建新的角色信息
 * @apiGroup 角色管理接口
 * @apiBody {String} roleName 角色名称 (必填)
 * @apiBody {Array} permissions 权限列表
 * @apiBody {String} remark 备注
 * @apiBody {String} perms 权限标识 (必填)
 * @apiBody {Number} sort 排序
 * @apiParamExample {json} Request-Example:
 *     {
 *       "roleName": "角色名称",
 *       "permissions": ["权限1", "权限2"],
 *       "perms": "权限标识",
 *       ...
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
 * @api {post} /roles/list 获取角色列表
 * @apiDescription 获取角色列表信息
 * @apiGroup 角色管理接口
 * @apiBody {Object} page 分页信息
 * @apiBody {Number} page.pageSize 每页显示数量
 * @apiBody {Number} page.page 当前页码
 * @apiBody {String} roleName 角色名称 (可选)
 * @apiParamExample {json} Request-Example:
 *     {
 *       "page": {
 *         "pageSize": 10,
 *         "page": 1
 *       },
 *       "roleName": "角色名称",
 *       ...
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "data": [{...}], // 角色列表数据
 *       "page": { "pageSize": 10, "page": 1, "total": 100 }, // 分页信息
 *       "message": "获取成功"
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
 * @api {delete} /roles/delete 删除角色
 * @apiDescription 删除指定角色信息
 * @apiGroup 角色管理接口
 * @apiBody {String} id 角色ID
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": "角色ID",
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
 *       "message": "错误信息"
 *     }
 * @apiVersion 0.0.1
 */

/**
 * @api {put} /roles/update 更新角色
 * @apiDescription 更新指定角色信息
 * @apiGroup 角色管理接口
 * @apiBody {String} id 角色ID
 * @apiBody {String} roleName 角色名称 (可选)
 * @apiBody {Array} permissions 权限列表 (可选)
 * @apiBody {String} remark 备注 (可选)
 * @apiBody {String} perms 权限标识 (可选)
 * @apiBody {Number} sort 排序 (可选)
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": "角色ID",
 *       "roleName": "新角色名称",
 *       ...
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
 * @api {get} /roles/detail 获取角色详情
 * @apiDescription 根据角色ID获取角色详情信息
 * @apiGroup 角色管理接口
 * @apiParam {String} id 角色ID
 * @apiSuccess {Number} code 返回状态码，200表示成功，500表示失败
 * @apiSuccess {Object} data 返回的角色详情数据
 * @apiSuccess {String} data.roleName 角色名称
 * @apiSuccess {String[]} data.permissions 权限数组，菜单ID集合
 * @apiSuccess {String} data.remark 备注
 * @apiSuccess {String} data.status 状态，1表示启用，0表示禁用
 * @apiSuccess {String} data.perms 权限字符串
 * @apiSuccess {Number} data.sort 排序
 * @apiSuccess {String} data.createBy 创建人
 * @apiSuccess {String} data.updateBy 更新人
 * @apiSuccess {Date} data.createTime 创建时间
 * @apiSuccess {Date} data.updateTime 更新时间
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "data": {
 *         "roleName": "角色名称",
 *         "permissions": [],
 *         "remark": "备注",
 *         "status": "1",
 *         "perms": "",
 *         "sort": 0,
 *         "createBy": "",
 *         "updateBy": "",
 *         "createTime": "2024-05-14T07:28:42.000Z",
 *         "updateTime": "2024-05-14T07:28:42.000Z"
 *       },
 *       "message": "获取成功"
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
 * @api {put} /roles/update/field 更新角色字段
 * @apiDescription 根据角色ID更新角色的特定字段
 * @apiGroup 角色管理接口
 * @apiParam {String} fieldName 待更新字段的名称，只能为 "status" 或 "permissions"
 * @apiParam {String} fieldValue 新的字段值
 * @apiParam {String} id 角色ID
 * @apiSuccess {Number} code 返回状态码，200表示成功，500表示失败
 * @apiSuccess {String} message 返回的消息
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
 * @api {post} /roles/aggregate/permissions 根据角色集合获取权限合集
 * @apiDescription 根据角色ID集合获取所有角色的权限合集
 * @apiGroup 角色管理接口
 * @apiParam {String[]} ids 角色ID集合
 * @apiSuccess {Number} code 返回状态码，200表示成功，500表示失败
 * @apiSuccess {Object} data 返回的权限合集数据
 * @apiSuccess {String[]} data.permissions 权限合集，包含所有角色的权限
 * @apiSuccess {Object[]} data.menus 菜单信息数组，与 permissions 相关联
 * @apiSuccess {String} data.menus.id 菜单ID
 * @apiSuccess {String} data.menus.name 菜单名称
 * @apiSuccess {String} data.menus.url 菜单链接
 * @apiSuccess {Number} data.menus.sort 菜单排序
 * @apiSuccess {String} data.menus.parentId 父级菜单ID
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "data": {
 *         "permissions": ["permission1", "permission2"],
 *         "menus": [
 *           {
 *             "id": "menu1",
 *             "name": "菜单1",
 *             "url": "/menu1",
 *             "sort": 1,
 *             "parentId": "parent1"
 *           },
 *           {
 *             "id": "menu2",
 *             "name": "菜单2",
 *             "url": "/menu2",
 *             "sort": 2,
 *             "parentId": "parent1"
 *           }
 *         ]
 *       },
 *       "message": "获取成功"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": "错误信息"
 *     }
 * @apiVersion 0.0.1
 */
