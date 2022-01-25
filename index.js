const express = require('express');
var app = express();

const fs = require('fs')

const Login = require('./lib/login')

app.Token = require('./lib/token')

app.b64 = require('./lib/base')

app.Login = Login(app)

var {app} = require('./lib/auth')(app)

var {app, Wss} = require('./lib/ws')(app)

var {app, Route} = require('./lib/route')(app)

const Api = new (require('./api/index'))(app)

app.use(express.static('./public', {extensions: ['html']}))
app.use(Route)
app.use('/api', Api)

/*var data = JSON.parse(fs.readFileSync('./accounts/data.json'))
Object.entries(data).forEach(([e, v]) => {
  v.uid = e
  data[e] = v
})

fs.writeFileSync('./accounts/data.json', JSON.stringify(data))*/

require('./lib/server')(app)