const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [{
    url: { type: String },
    image: { type: String }
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Ad', schema)