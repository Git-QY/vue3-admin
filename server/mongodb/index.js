// const mongoose = require('mongoose')
// mongoose.set('strictQuery', true) // 开启严格模式
// // mongoose.connect("mongodb://127.0.0.1:27017/vue3admin", {});
// mongoose.connect('mongodb+srv://qinyu:13512319102.@qycluster.xsk1hfo.mongodb.net/vue3admin')
// const db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', res => console.log('db ok'))
// mongodb+srv://595870773:hAOxUTXHyxNApZfL@cluster0.luetbep.mongodb.net/

var mongoose = require('mongoose')

const connections = [
  { name: 'db1Connection', url: 'mongodb+srv://qinyu:13512319102.@qycluster.xsk1hfo.mongodb.net/vue3admin' },
  { name: 'db2Connection', url: 'mongodb+srv://qy:13512319102.@cluster0.xv6lm6l.mongodb.net/' },
]

mongoose.Promise = global.Promise

// 创建连接并导出
const connectionObjects = {}
connections.forEach(connection => {
  connectionObjects[connection.name] = mongoose.createConnection(connection.url)
  connectionObjects[connection.name].on('connected', function () {
    console.log(`Mongoose 连接成功，连接到 ${connection.name}: ${connection.url}`)
  })
  connectionObjects[connection.name].on('error', function (err) {
    console.log(`Mongoose 连接错误 ${connection.name}: ${err}`)
  })
  connectionObjects[connection.name].on('disconnected', function () {
    console.log(`Mongoose 连接断开 ${connection.name}`)
  })
})

module.exports = connectionObjects
