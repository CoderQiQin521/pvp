// restful api
module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true // 允许在中间件获取到req.params
  })

  // const Category = require('../../models/Category')

  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const model = await req.Model.find()
      .setOptions(queryOptions)
      .limit(100)
    res.send(model)
  })
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // :resource 占位
  app.use(
    '/admin/api/rest/:resource',
    async (req, res, next) => { // 中间件
      /*
      字符串的转换 (小写复数=>大写开头单数)
      categories => Category
      herore => Heroe
      */
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router
  )


  const multer = require('multer') // 图片上传模块
  /*
  单图: single
  多图: array
  */
  const upload = multer({ dest: __dirname + '/../../uploads' })
  // 不是router.post()
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}
