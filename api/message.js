const fs = require('fs')

module.exports = function(req, res, app) {
  var Paths = ''
  req.url.replace(/\/v[0-9]\/[a-zA-Z0-9]+\/(.*)/g, (e, p) => Paths = p.split('?')[0])
  var Data = JSON.parse(fs.readFileSync('./data/messages.json'))
  if (!Data[Paths]) return res.writeHead(405).end('Channel Does Not Exist')
  res.json(Data[Paths].splice(Data[Paths].length - 50, 50))
}
