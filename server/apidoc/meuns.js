/**
 * @api {post} /menus/add 新增菜单
 * @apiDescription 新增菜单信息
 * @apiGroup 菜单接口
 * @apiBody {String} menuName 菜单名称
 * @apiBody {String} menuType 菜单类型，0表示目录，1表示菜单，2表示按钮
 * @apiBody {String} [icon] 菜单图标
 * @apiBody {String} [path] 路由路径
 * @apiBody {String} [component] 页面路径
 * @apiBody {Number} [sort] 排序
 * @apiBody {String} [perms] 权限标识
 * @apiBody {Date} [createTime] 创建时间，默认为当前时间
 * @apiBody {Date} [updateTime] 最后更新时间，默认为当前时间
 * @apiBody {String} [status] 状态，1表示正常，0表示停用
 * @apiBody {Boolean} [isHidden] 是否隐藏
 * @apiBody {String} [isLink] 外链地址，存在则是外联
 * @apiBody {Boolean} [isKeepAlive] 是否缓存，1表示缓存，0表示不缓存
 * @apiBody {Boolean} [isFold] 是否折叠
 * @apiBody {String} [remark] 备注
 * @apiParamExample {json} Request-Example:
 *     {
 *       "menuName": "菜单名称",
 *       "menuType": "菜单类型",
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
 *       "message": ""
 *     }
 * @apiVersion 0.0.1
 */

/**
 * @api {post} /menus/list 获取菜单列表
 * @apiDescription 获取所有菜单列表
 * @apiGroup 菜单接口
 * @apiParam {String} [menuName] 菜单名称，模糊查询
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "data": [],
 *       "message": "菜单列表获取成功"
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
 * @api {put} /menus/update 更新菜单
 * @apiDescription 更新菜单信息
 * @apiGroup 菜单接口
 * @apiBody {String} id 菜单ID
 * @apiBody {String} menuName 菜单名称
 * @apiBody {String} menuType 菜单类型，0表示目录，1表示菜单，2表示按钮
 * @apiBody {String} [icon] 菜单图标
 * @apiBody {String} [path] 路由路径
 * @apiBody {String} [component] 页面路径
 * @apiBody {Number} [sort] 排序
 * @apiBody {String} [perms] 权限标识
 * @apiBody {Date} [updateTime] 最后更新时间，默认为当前时间
 * @apiBody {String} [status] 状态，1表示正常，0表示停用
 * @apiBody {Boolean} [isHidden] 是否隐藏
 * @apiBody {String} [isLink] 外链地址，存在则是外联
 * @apiBody {Boolean} [isKeepAlive] 是否缓存，1表示缓存，0表示不缓存
 * @apiBody {Boolean} [isFold] 是否折叠
 * @apiBody {String} [remark] 备注
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": "菜单ID",
 *       "menuName": "菜单名称",
 *       "menuType": "菜单类型",
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
 *       "message": ""
 *     }
 * @apiVersion 0.0.1
 */

/**
 * @api {delete} /menus/delete 删除菜单
 * @apiDescription 删除菜单信息
 * @apiGroup 菜单接口
 * @apiParam {String} id 菜单ID
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
 * @api {get} /menus/detail 获取菜单详情
 * @apiDescription 获取菜单详情信息
 * @apiGroup 菜单接口
 * @apiParam {String} id 菜单ID
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "data": {},
 *       "message": "菜单详情获取成功"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": ""
 *     }
 * @apiVersion 0.0.1
 */
