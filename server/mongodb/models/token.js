const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  id: String,
  token: String,
  createdAt: { type: Date, default: Date.now },
  userId: String,
  isActive: { type: Boolean, default: true },
})

module.exports = mongoose.model('Token', tokenSchema)
