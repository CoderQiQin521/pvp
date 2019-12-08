const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  parent: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Article', schema)