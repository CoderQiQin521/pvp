module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true // 继承父级路由路径参数,允许在中间件获取到req.params
  })
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')

  // const Category = require('../../models/Category')

  /* ------------------------------- restful api ------------------------------ */
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

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  const resourceMiddleware = require('../../middleware/resource')

  /* ------------------------------------------------- 中间件&批量引入models ------------------------------------------------- */

  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  )

  /* --------------------------------- 图片上传模块 --------------------------------- */
  const multer = require('multer')
  /*
  单图: single
  多图: array
  */
  const upload = multer({ dest: __dirname + '/../../uploads' })
  // 不是router.post()
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    // file.url = `http://111.229.27.8:3200/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await AdminUser.findOne({
      username
    }).select('+password')
    assert(user, 422, '用户不存在')
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))
    res.send({ token })
  })

  // express错误处理
  app.use(async (err, req, res, next) => {
    console.log('err: ', err);
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
