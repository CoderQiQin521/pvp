module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')

  router.post('/categories', async (req, res) => {
    console.log('req.body: ', req.body)
    const model = await Category.create(req.body)
    res.send(model)
  })
  app.use('/admin/api', router)
}
