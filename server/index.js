const express = require('express')
const app = express()

app.set('secret', 'asgbd7812ge1231267312t')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3200, () => {
  console.log('http://localhost:3200')
})
