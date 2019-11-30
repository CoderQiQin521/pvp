module.exports = options => {
  return async (req, res, next) => { // 中间件
    /*
    字符串的转换 (小写复数=>大写开头单数)
    categories => Category
    herore => Heroe
    */
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}