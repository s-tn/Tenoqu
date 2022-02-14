// TenoquAPI 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const fs = require('fs')

module.exports = function(req, res, app) {
  var num = 50
  if (req.query.limit) num = req.query.limit
  if (num>200) return []
  var Paths = ''
  req.url.replace(/\/v[0-9]\/[a-zA-Z0-9]+\/(.*)/g, (e, p) => Paths = p.split('?')[0])
  var Data = JSON.parse(fs.readFileSync('./data/messages.json'))
  if (!Data[Paths]) return res.writeHead(405).end('Channel Does Not Exist')
  res.json(Data[Paths].splice(Data[Paths].length - num, num))
  return Data[Paths].splice(Data[Paths].length - num, num)
}
