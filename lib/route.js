module.exports = function(app) {
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