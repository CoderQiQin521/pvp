const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: { type: String }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

module.exports = mongoose.model('Category', schema)
