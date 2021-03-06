module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true // 继承父级路由路径参数,允许在中间件获取到req.params
  })
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')

  const svgCaptcha = require('svg-captcha')

  // const Category = require('../../models/Category')

  /* ------------------------------- restful api ------------------------------ */
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category' || req.Model.modelName === 'Article') {
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
    file.url = `http://localhost:3200/uploads/${file.filename}`
    // file.url = `http://111.229.27.8:3200/uploads/${file.filename}`
    res.send(file)
  })

  app.get('/admin/api/user/info', async (req, res) => {
    res.send({ "code": 20000, "data": { "roles": ["admin"], "introduction": "I am a super administrator", "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif", "name": "Super Admin" } })
  })

  app.get('/getcode', (req, res, next) => {
    // 验证方法 https://www.jianshu.com/p/f6f19756e4bd     https://www.cnblogs.com/kakayang/p/8794546.html
    const codeConfig = {
      size: 5,
      ignoreChars: '0o1i',
      noise: 2,
      fontSize: 42,
      color: true,
      background: '#cc9966',
      width: 150,
      height: 44
    }
    var captcha = svgCaptcha.create(codeConfig)
    console.log('captcha: ', captcha.text);

    res.type('svg')
    res.send(captcha.data)

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
