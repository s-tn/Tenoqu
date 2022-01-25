main.app.loadChannel = async () => {
  var type = 'public'
  if (!/[0-9]{12}/.test(location.pathname.split('/').splice(3, 1))) type = 'private'
  if (location.pathname=='/channels/@me') type = 'friends'
}

main.app.LoadServer = async (el, server) => {
  if (/[0-9]{12}/.test(location.pathname.split('/').splice(3, 1))) {
    await main.app.loadChannels(server)
    document.querySelector('.server-info').innerText = server.name
  } else {

  }
}

main.app.loadChannels = async server => {
  return new Promise((e, r) => {
    document.querySelector('.clist').innerHTML = ''
    Object.entries(server.channels).map(async ([e, v]) => {
      var a = await main.app.request('channels', v, [['v', '1']])
      var channel = document.createElement('div')
      if (document.querySelector(`*[data-direction="${v}"]`)) return ;
      channel.classList.add('channel')
      channel.setAttribute('data-direction', v)
      channel.addEventListener('click', main.app.handleChannel(channel, a))
      channel.innerText = '#'+a.name;
      document.querySelector('.clist').insertAdjacentElement('afterbegin', channel)
      return ''
    })
    setTimeout(()=>e('done'),40)
  })
}

setTimeout(() => {
  if (/[0-9]{12}/.test(location.pathname.split('/').splice(3, 1))) {
    document.querySelector(`*[data-predir="/channels/${location.pathname.split('/').splice(2, 1).toString().match(/[0-9]{12}/g)[0]}"]`).click()
  }
}, 2300)