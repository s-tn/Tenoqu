//lib 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
module.exports = { encode: str => new Buffer.from(str).toString('base64'), decode: str => new Buffer.from(str, 'base64').toString('utf-8') }