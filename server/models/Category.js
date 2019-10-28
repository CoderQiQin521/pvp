const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

module.exports = mongoose.model('Category', schema)
