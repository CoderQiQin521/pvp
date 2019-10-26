module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')
  router.get('/categories', async (req, res) => {
    const model = await Category.find()
    res.send(model)
  })
  router.post('/categories', async (req, res) => {
    console.log('req.body: ', req.body)
    const model = await Category.create(req.body)
    res.send(model)
  })
  router.post('/del_categories', async (req, res) => {
    console.log(15, req.body)
    const model = await Category.remove({ _id: req.body.id })
    // res.send(model)
  })
  app.use('/admin/api', router)
}
