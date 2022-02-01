//lib 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
module.exports = function(app) {
  app.use((r, s, n) => {
    s.status(404).sendFile('404.html', { root: './public' })
  })
  app.listen(8080)
}