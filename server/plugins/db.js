module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongoose://127.0.0.1:27017/node-vue-maba', {
    useNewUrlParser: true
  })
}