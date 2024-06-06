var express = require('express')
var router = express.Router()
var path = require('path')
var fs = require('fs')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const readline = require('readline')

// 判断数据库是否有相同hash的数据 有则实现秒传  （待实现）
// 断点续传（待实现）就是多数据进行重新切片只上传未上传的切片
const CHUNK_DIR = 'public/uploads/'
router.post('/upload', multipartMiddleware, (req, res) => {
  const file = req.files.file
  const newPath = path.resolve(CHUNK_DIR, file.originalFilename)
  fs.copyFileSync(file.path, newPath)
  fs.unlinkSync(file.path) // 删除原始文件
  const url = `http://localhost:3000/uploads/${file.originalFilename}`
  res.send({ code: 200, msg: '上传成功', data: { url, name: file.originalFilename } })
})
router.post('/chunk-upload', multipartMiddleware, (req, res) => {
  const { fileHash, chunkHash } = req.body

  // 如果临时文件夹(用于保存分片)不存在，则创建
  const chunkDir = path.resolve(CHUNK_DIR, fileHash)
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir)
  }

  // 如果临时文件夹里不存在该分片，则将用户上传的分片移到临时文件夹里
  const chunkPath = path.resolve(chunkDir, chunkHash)
  if (!fs.existsSync(chunkPath)) {
    const fileData = req.files.chunk
    // 将用户上传的分片复制到临时文件夹里，然后删除原始文件
    fs.copyFileSync(fileData.path, chunkPath)
    fs.unlinkSync(fileData.path) // 删除原始文件
  }
  res.send({ code: 200, msg: '分片上传成功' })
})
router.post('/chunk-merge', async (req, res) => {
  const { fileHash, fileName } = req.body
  // 最终合并的文件路径
  const filePath = path.resolve(CHUNK_DIR, fileHash + path.extname(fileName))
  // 临时文件夹路径
  const chunkDir = path.resolve(CHUNK_DIR, fileHash)
  // 读取临时文件夹，获取该文件夹下“所有文件（分片）名称”的数组对象
  const chunkPaths = fs.readdirSync(chunkDir)
  // 读取临时文件夹获得的文件（分片）名称数组可能乱序，需要重新排序
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  // 遍历文件（分片）数组，将分片追加到文件中
  const pool = chunkPaths.map(
    chunkName =>
      new Promise(resolve => {
        const chunkPath = path.resolve(chunkDir, chunkName)
        // 将分片追加到文件中
        fs.appendFileSync(filePath, fs.readFileSync(chunkPath))
        // 删除分片
        fs.unlinkSync(chunkPath)
        resolve()
      }),
  )
  try {
    await Promise.all(pool)
    // 等待所有分片追加到文件后，删除临时文件夹
    await fs.rmdirSync(chunkDir)
    res.send({ code: 200, msg: '合并成功', fs: fs })
  } catch (error) {
    res.send({ code: 400, msg: error })
  }
})
// 读取5级行政架构
router.get('/area', (req, res) => {
  let { parentId = 0 } = req.query
  const results = []
  let filePath = path.resolve(__dirname, `../public/resources/area_code_2023.csv`)
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  })
  const Allresults = []
  rl.on('line', line => {
    const [code, name, level, parent, enable] = line.split(',')
    if (parent == parentId) {
      results.push({ _id: code, parent, level, code, name, enable })
    }
  })
  // 监听读取流的 close 事件
  rl.on('close', async () => {
    res.send({ code: 200, data: results, msg: '查询成功', total: results.length })
  })
})

// 读取对应gitee仓库动态
const axios = require('axios')
const owner = 'Git-QY'
const repo = 'vue3-admin'
// 用户授权码
const access_token = '0c2badccddd48644ea7eca35f3d6b08f'
const apiUrl = `https://gitee.com/api/v5/repos/${owner}/${repo}/events`
router.get('/gitee-events', async (req, res) => {
  try {
    const response = await axios.get(apiUrl)
    const events = response.data
    const results = events.map(event => {
      const { id, type, created_at, actor, repo } = event
      return { id, type, created_at, actor, repo }
    })
    res.send({ code: 200, data: results, msg: '查询成功', total: results.length })
  } catch (error) {
    res.send({ code: 400, msg: error })
  }
})
// 读取对应gitee仓库commit
router.get('/gitee-commits', async (req, res) => {
  const { branch, page = { page: 1, pageSize: 10 } } = req.query
  try {
    const response = await axios.get(`https://gitee.com/api/v5/repos/${owner}/${repo}/commits`, {
      params: { access_token, sha: branch, page: page.page, per_page: page.pageSize },
    })
    const events = response.data
    res.send({ code: 200, data: events, msg: '查询成功', total: events.length })
  } catch (error) {
    res.send({ code: 400, msg: error })
  }
})
// 读取对应gitee仓库分支
router.get('/gitee-branches', async (req, res) => {
  const { page = { page: 1, pageSize: 10 } } = req.query
  try {
    const response = await axios.get(`https://gitee.com/api/v5/repos/${owner}/${repo}/branches`, { params: { access_token, page: page.page, per_page: page.pageSize } })
    const events = response.data
    console.log('🚀 ~ router.get ~ events:', events)
    res.send({ code: 200, data: events, msg: '查询成功', total: events.length })
  } catch (error) {
    res.send({ code: 400, msg: error })
    console.log('🚀 ~ router.get ~ error:', error)
  }
})

// 导出表格
const xlsx = require('node-xlsx')
router.get('/export-xlsx', async (req, res) => {})

module.exports = router
