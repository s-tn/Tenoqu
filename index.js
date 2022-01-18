const express = require('express');
var app = express();

const Login = require('./lib/login')

app.Token = require('./lib/token')

app.b64 = require('./lib/base')

app.Login = Login(app)

var {app, Token} = require('./lib/auth')(app)

var {app, Wss} = require('./lib/ws')(app)

var {app, Route} = require('./lib/route')(app)

const Api = new (require('./api/index'))(app)

app.use(express.static('./public', {extensions: ['html']}))
app.use(Token)
app.use(Route)
app.use('/api', Api)

require('./lib/server')(app)