// chunks 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
main.app.handleServer = function(server, data) {
  return function(event) {
    var url = server.getAttribute('data-predir')
    var ServersStorage = JSON.parse(localStorage.getItem('serversStored') || "{}")
    if (JSON.stringify(ServersStorage) == "{}") url = url + '/' + server.getAttribute('data-show'); else {
      url = url+'/'+(ServersStorage[server.getAttribute('data-predir').split('/')[2]]?ServersStorage[server.getAttribute('data-predir').split('/')[2]]:server.getAttribute('data-show'))
    }
    document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'))
    server.classList.add('selected')
    main.app.redirect(url)
    main.app.LoadServer(server, data)
  }
}

main.app.handleChannel = function(channel, data) {
  return function(event) {
    var originalPath = location.pathname.split('/').splice(3, 1)
    var a = JSON.parse(localStorage['serversStored'])
    a[location.pathname.split('/').splice(2, 1).toString()] = channel.getAttribute('data-direction')
    if (data.type!=='voice') localStorage['serversStored'] = JSON.stringify(a)
    var path = location.pathname.split('/').splice(0, 3)
    path.push(channel.getAttribute('data-direction'))
    path = path.join('/')
    main.app.redirect(path)
    document.querySelectorAll('.channelselected').forEach(e => e.classList.remove('channelselected'))
    channel.classList.add('channelselected')
    document.querySelector('.ii').setAttribute('placeholder', 'Message '+channel.innerText)
    if (data.type=='voice') return main.app.LoadVoiceChannel();
    if (originalPath==channel.getAttribute('data-direction')) return main.app.loadChannel(channel, data, event, path)
    main.app.Skeleton()
    main.app.loadChannel(channel, data, event, path)
  }
}