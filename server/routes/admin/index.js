module.exports = app => {
  const express = require('express')

  const router = express.Router({
    mergeParams: true // 允许在中间件获取到req.params
  })

  // const Category = require('../../models/Category')

  /* --------------------------------------------------- restful api -------------------------------------------------- */

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

  /* ------------------------------------------------- 中间件&批量引入models ------------------------------------------------- */

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

  /* ----------------------------------------------------- 图片上传模块 ----------------------------------------------------- */

  const multer = require('multer')
  /*
  单图: single
  多图: array
  */
  const upload = multer({ dest: __dirname + '/../../uploads' })
  // 不是router.post()
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    // file.url = `http://111.229.27.8:3200/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({
      username
    }).select('+password')
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    const isValid = require('bcryptjs').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))
    res.send({ token })
  })
}
