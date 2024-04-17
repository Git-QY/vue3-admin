const fs = require('fs')
const path = require('path')

module.exports = function (app) {
  const routesDir = path.join(__dirname, '../routes') // 路由文件所在目录
  const routeFiles = fs.readdirSync(routesDir) // 获取所有路由文件
  routeFiles.forEach(file => {
    const router = require(path.join(routesDir, file))
    let routerPath = `/${file.split('.')[0]}` // 根据文件名生成访问路径
    routerPath = routerPath == '/index' ? '/' : routerPath // 将 "/index" 路径映射为根路径 "/"
    app.use(routerPath, router) // 注册路由
  })
}
