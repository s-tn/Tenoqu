//lib 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const fs = require('fs')

module.exports = function(app) {
  app.use((req, res, next) => {
    res.send = new Proxy(res.send, {
      apply(t, g, a) {
        if (a[0].includes('<!DOCTYPE html>')) a[0] = a[0] + ''
        return Reflect.apply(t, g, a)
      }
    })
    next()
  })
  app.post('/token', function(req, res) {
    if (req.method == 'POST' && req.url.split('?')[0].split('#')[0] == '/token') {
      var data = JSON.parse(req.body)
      if (data.username == '' || data.password == '') {
        return res.writeHead(403, { 'content-type': 'application/json' }).end(JSON.stringify({ status: 'failure' }))
      }
      if (!data.captcha) return res.writeHead(400).end('Captcha Required')
      app.Login.get(data.username, data.password).then((tf) => {
        var uid = tf[1]
        var tf = tf[0];
        if (tf == true) {
          const KEY_TOKEN = app.Token.encode(uid, data.session)
          return app.Login.token(data.username, data.password, KEY_TOKEN).then(a => res.end(JSON.stringify({ status: 'success', crypt: KEY_TOKEN })))
        } else {
          return res.writeHead(403, { 'content-type': 'application/json' }).end(JSON.stringify({ status: 'failure' }))
        }
      })
    }
  })
  app.post('/join', function(req, res) {
    if (req.method == 'POST' && req.url.split('?')[0].split('#')[0] == '/join') {
      var data = JSON.parse(req.body)
      if (data.username == '' || data.password == '') {
        return res.writeHead(403, { 'content-type': 'application/json' }).end(JSON.stringify({ status: 'failure' }))
      }
      var codes = JSON.parse(fs.readFileSync('./accounts/data.json'))
      var a = codes
      codes = a.inviteCodes
      console.log(codes, data.invite)
      if (codes.indexOf(data.invite)==-1) return res.writeHead(403, { 'content-type': 'application/json' }).end(JSON.stringify({ status: 'failure' }))
      a.inviteCodes.splice(codes.indexOf(data.invite), 1)
      fs.writeFileSync('./accounts/data.json', JSON.stringify(a))
      app.Login.set(data.email, data.password, data.username).then(id => {
        var TOKEN = app.Token.encode(id, data.session)
        app.Login.token(data.email, data.password, TOKEN).then(e => res.end(JSON.stringify({ status: 'success', crypt: TOKEN })))
      }).catch(e => '')
    }
  })
  return { app: app }
}