const express = require('express')
const router = express.Router()
const { AiRoom, aiRoomValidationRules, validationResult, AiRoomMessage } = require('../mongodb/models/chat')
const { BaseService } = require('../utils')

const AiRoomService = new BaseService(AiRoom)
const AiRoomMessageService = new BaseService(AiRoomMessage)

router.post('/aiRoom/add', aiRoomValidationRules(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  AiRoomService.add(req, res)
})
router.delete('/aiRoom/delete', async (req, res) => {
  const { id } = req.query
  try {
    await AiRoom.deleteOne({ id })
    await AiRoomMessage.deleteMany({ roomId: id })
    res.send({ code: 200, message: '删除成功' })
  } catch (error) {
    res.send({ code: 500, message: '删除失败' })
  }
})
router.put('/aiRoom/update', aiRoomValidationRules(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.send({ code: 500, message: errors.array().map(item => item.msg) })
  AiRoomService.update(req, res)
})
router.get('/aiRoom/detail', async (req, res) => {
  AiRoomService.detail(req, res)
})
router.post('/aiRoom/list', async (req, res) => {
  const { page = { pageSize: 10, page: 1 }, ...data } = req.body
  const query = { ...data, name: { $regex: data.name ?? '' } }
  AiRoomService.list(query, page, res)
})
router.post('/aiRoomMessage/add', async (req, res) => {
  AiRoomMessageService.add(req, res)
})
router.put('/aiRoomMessage/update', async (req, res) => {
  AiRoomMessageService.update(req, res)
})

module.exports = router
