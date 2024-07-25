// const mongoose = require('mongoose')
// mongoose.set('strictQuery', true) // 开启严格模式
// // mongoose.connect("mongodb://127.0.0.1:27017/vue3admin", {});
// mongoose.connect('mongodb+srv://qinyu:13512319102.@qycluster.xsk1hfo.mongodb.net/vue3admin')
// const db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', res => console.log('db ok'))
// mongodb+srv://595870773:hAOxUTXHyxNApZfL@cluster0.luetbep.mongodb.net/

const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
// 连接数据库1
const db1URI = 'mongodb+srv://qinyu:13512319102.@qycluster.xsk1hfo.mongodb.net/vue3admin'
const db1Options = {}
const db1Connection = mongoose.createConnection(db1URI, db1Options)

// 连接数据库2
const db2URI = 'mongodb+srv://595870773:hAOxUTXHyxNApZfL@cluster0.luetbep.mongodb.net'
const db2Options = {}
const db2Connection = mongoose.createConnection(db2URI, db2Options)

// 成功链接2个数据库打印
Promise.all([db1Connection.asPromise(), db2Connection.asPromise()]).then(() => {
  console.log('db1Connection, db2Connection ok')
})

module.exports = { db1Connection, db2Connection }
