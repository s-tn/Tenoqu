var fs = require('fs')
var Message = require('../api/message')

module.exports = function(req, res, app) {
  var Paths = ''
  req.url.replace(/\/v[0-9]\/bot\/channels\/(.*)/g, (e, p) => Paths = p.split('?')[0])
  var Data = JSON.parse(fs.readFileSync('./data/channels.json'))
  if (!Data[Paths]) return res.writeHead(405).end('Channel Does Not Exist')
  Data[Paths].messages = Message({url:'/v1/messages/'+Paths, query: {limit: req.query.limit||50}}, {json:()=>{},end:()=>{},writeHead:()=>{}}, app)
  return res.json(Data[Paths])
}