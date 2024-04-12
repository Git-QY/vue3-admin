const mongoose = require('mongoose')
mongoose.set('strictQuery', true) // 开启严格模式
// mongoose.connect('mongodb://0f2a134cc6c5.c.methodot.com:30544/vue3admin', {})
mongoose.connect("mongodb://127.0.0.1:27017/vue3admin", {});
// mongoose.connect('mongodb+srv://qinyu:13512319102.@qycluster.xsk1hfo.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', res => console.log('db ok'))
