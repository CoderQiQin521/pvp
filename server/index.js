const express = require('express')
const app = express()
require('./plugins/db')(app)
const router = require('./routes/admin')(app)

app.listen(300, () => {
  console.log('http://localhost:3000');
})