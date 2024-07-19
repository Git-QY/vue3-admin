var express = require('express')
var router = express.Router()
var path = require('path')
var fs = require('fs')

const readline = require('readline')

// 读取5级行政架构
router.get('/area', (req, res) => {
  let { parentId = 0 } = req.query
  const results = []
  let filePath = path.resolve(__dirname, `../../public/resources/area_code_2023.csv`)
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
const access_token = 'a82d5f838379e6e97b6ec38c8b659b39'
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
