//lib 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
var Request = require('request')

module.exports = function(app) {
  app.use((r,e,n) => {
    //e.removeHeader('content-security-policy')
    //e.setHeader('content-security-policy', "default-src 'self' *")
    n()
  })
  return {
    app: app, Route: function(req, res, next) {
      var c = false
      if (req.url.startsWith('/channels/')) {
        return res.sendFile('@me.html', { root: './public/' })
      }
      if (req.url.startsWith('/external-resource/')) {
        var r = Request({url: req.url.split('/external-resource/')[1].replace('https://','https:/').replace('https:/','https://'),method:'GET'})
        return r.on('response', (e) => {
          var a = []
          e.on('data', (e)=>a.push(e))
          e.on('end', () => {
            c = true
            if (e.statusCode!==200) return res.writeHead(404).end('Not Found')
            return res.end(Buffer.concat(a))
          })
        })
      }
      if (req.url.startsWith('/app')) return res.writeHead(301, { 'location': '/channels/' }).end('')
      if (req.url.startsWith('/@me')) return res.writeHead(301, { 'location': '/channels/' }).end('')
      if (c==false) return next();
    }
  }
}