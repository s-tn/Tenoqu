module.exports = function(app) {
  app.use((r,s,n) => {
    s.status(404).sendFile('404.html', {root: './public'})
  })
  app.listen(8080)
}