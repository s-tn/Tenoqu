main.app.handleServer = function(server, data) {
  return function(event) {
    var url = server.getAttribute('data-predir')
    var ServersStorage = JSON.parse(localStorage.getItem('serversStored')||"{}")
    if (JSON.stringify(ServersStorage)=="{}") url = url + '/' + server.getAttribute('data-show');
    document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'))
    server.classList.add('selected')
    main.app.LoadServer(server, data)
    main.app.redirect(url)
  }
}

main.app.handleChannel = function(channel, data) {
  return function(event) {
    console.log('AAAAAAA')
  }
}