const fs = require('fs')

module.exports = function(req, res, app) {
  var Paths = ''
  req.url.replace(/\/v[0-9]\/[a-zA-Z0-9]+\/(.*)/g, (e, p) => Paths = p.split('?')[0])
  if (req.query.type && req.query.type == 'servercats') {
    var Data = JSON.parse(fs.readFileSync('./data/parties.json'))
    return res.json(Data[Paths].categories)
  }
  var Data = JSON.parse(fs.readFileSync('./data/categories.json'))
  if (!Data[Paths]) return res.writeHead(405).end('Channel Does Not Exist')
  res.json(Data[Paths])
}