module.exports = function(app) {
  return {app: app, Route: function(req, res, next) {
    if (req.url.startsWith('/channels/')) {
      return res.sendFile('index.html', {root: './public/@me'})
    }
    if (req.url.startsWith('/app')) return res.writeHead(301, {'location': '/@me'}).end('')
    return next();
  }}
}