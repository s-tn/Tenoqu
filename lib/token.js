//lib 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
function genToken(uid, sess) {
  var c = Buffer.from(Math.round(Math.random() * (9999999999 - 1000000000) + 1000000000).toString()).toString('base64')
  var ns = Buffer.from(sess.toString()).toString('base64')
  return (Buffer.from(uid.toString()).toString('base64') + '.' + ns + '.' + c).replace(/=/g, '')
}

function decodeToken(token) {
  return { uid: parseInt(Buffer.from(token.split('.')[0], 'base64').toString('utf-8')), key: parseInt(Buffer.from(token.split('.')[1], 'base64').toString('utf-8')), session: parseInt(Buffer.from(token.split('.')[2], 'base64').toString('utf-8')) }
}

module.exports.encode = genToken
module.exports.decode = decodeToken