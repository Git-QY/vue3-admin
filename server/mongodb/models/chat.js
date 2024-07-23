const mongoose = require('mongoose')
const { db1Connection } = require('../index')
const { body, validationResult } = require('express-validator')
const schemaRules = {
  room: String,
  sender: String,
  message: String,
  type: String, // text, image, video, emoji
  timestamp: { type: Date, default: Date.now },
}

module.exports = { Chat: db1Connection.model('Chat', new mongoose.Schema(schemaRules)), validationResult }
