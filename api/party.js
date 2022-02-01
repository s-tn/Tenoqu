// TenoquAPI 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const fs = require('fs')

module.exports = function(req, res, app) {
  var Paths = ''
  req.url.replace(/\/v[0-9]\/[a-zA-Z0-9]+\/(.*)/g, (e, p) => Paths = p.split('?')[0])
  if (req.query['type'] && req.query['type'] == 'userservers') {
    var Data = JSON.parse(fs.readFileSync('./accounts/data.json'))[req.query['uid']]
    if (!Data) return res.writeHead(405).end('Info Does Not Exist')
    return res.json(Data.servers);
  }
  req.query.display = '80808080'
  if (req.query['type'] && req.query['type'] == 'create') {
    var Data = JSON.parse(fs.readFileSync('./data/parties.json'))
    var id = req.query.icon.split('/').splice(4, 1)[0]
    Data[id] = {
      "name": req.query.name,
      "roles": [],
      "icon": req.query.icon,
      "display": req.query.display,
      "channels": {

      }
    }
    fs.writeFileSync('./data/parties.json', JSON.stringify(Data))
    Data = JSON.parse(fs.readFileSync('./accounts/data.json'));
    Data[req.query.uid].servers.push(id.toString());
    fs.writeFileSync('./accounts/data.json', JSON.stringify(Data))
    return res.send('/channels/' + id + '/' + req.query.display)
  }
  var Data = JSON.parse(fs.readFileSync('./data/parties.json'))
  if (!Data[Paths]) return res.writeHead(405).end('Channel Does Not Exist')
  res.json(Data[Paths])
}