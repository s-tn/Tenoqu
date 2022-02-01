//lib 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
module.exports = function(app) {
  app.use((r,e,n) => {
    //e.removeHeader('content-security-policy')
    //e.setHeader('content-security-policy', "default-src 'self' *")
    n()
  })
  return {
    app: app, Route: function(req, res, next) {
      if (req.url.startsWith('/channels/')) {
        return res.sendFile('@me.html', { root: './public/' })
      }
      if (req.url.startsWith('/app')) return res.writeHead(301, { 'location': '/channels/' }).end('')
      if (req.url.startsWith('/@me')) return res.writeHead(301, { 'location': '/channels/' }).end('')
      return next();
    }
  }
}