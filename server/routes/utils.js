var express = require('express')
var router = express.Router()
var path = require('path')
var fs = require('fs')
const multipart = require('connect-multiparty')
const { url } = require('inspector')
const multipartMiddleware = multipart()

// 判断数据库是否有相同hash的数据 有则实现秒传  （待实现）
// 断点续传（待实现）就是多数据进行重新切片只上传未上传的切片
const CHUNK_DIR = 'public/uploads/'
router.post('/upload', multipartMiddleware, (req, res) => {
  const file = req.files.file
  console.log(file)
  const newPath = path.resolve(CHUNK_DIR, file.originalFilename)
  fs.copyFileSync(file.path, newPath)
  fs.unlinkSync(file.path) // 删除原始文件
  const url = `http://localhost:3000/uploads/${file.originalFilename}`
  res.send({ code: 200, msg: '上传成功', data: { url, name: file.originalFilename } })
})
router.post('/chunk-upload', multipartMiddleware, (req, res) => {
  console.log('req.body', req.body, req.files)
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
  console.log('chunkPaths', chunkPaths)
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
    console.log('error', error)
    res.send({ code: 400, msg: error })
  }
})

module.exports = router
