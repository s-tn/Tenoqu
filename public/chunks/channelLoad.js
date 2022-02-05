// chunks 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
main.app.loadChannel = async () => {
  if (document.querySelector('.failed')) document.querySelector('.failed').remove()
  var type = 'public'
  if (!/[0-9]{12}/.test(location.pathname.split('/').splice(3, 1))) type = 'private'
  if (location.pathname == '/channels/@me') type = 'friends'
  console.log(type)
  var messages = await main.app.request('messages', location.pathname.split('/').splice(3, 1), [['v', '1']])
  if (messages[0]=='failed') return main.app.FailLoad();
  document.querySelector('#message-wrap').innerHTML = messages.map(e => {
    var message = CreateMessage(e)
    /*var message = document.createElement('div')
    message.id = e.id
    message.classList.add('message')
    var imgDiv = document.createElement('div')
    var img = document.createElement('img')
    img.setAttribute('src', e.icon)
    imgDiv.appendChild(img)
    var messCont = document.createElement('div')
    messCont.classList.add('mess-cont')
    var aMessage = document.createElement('div')
    aMessage.classList.add('amessage')
    var userMessage = document.createElement('span')
    userMessage.classList.add('user-message')
    userMessage.innerHTML = e.content
    aMessage.appendChild(userMessage)
    var Aut = document.createElement('span')
    Aut.classList.add('aut')
    var date = new Date(e.timestamp)
    if (CheckDate(date)) {
      var newDate = 'Today at '+GetDate(new Date(date).toString().split(' ').splice(4, 1)[0].split(':').splice(0, 2).join(':'))
    } else {
      var newDate = new Date(date).toJSON().split('T')[0].split('-').join('/')
    }
    Aut.innerHTML = `${e.author}<span class="date-m">${newDate}</span>`
    messCont.appendChild(Aut)
    message.insertAdjacentElement('afterbegin', aMessage)
    message.insertAdjacentElement('afterbegin', messCont)
    message.insertAdjacentElement('afterbegin', imgDiv)*/
    return message.outerHTML
  }).join('\n')
  ScrollBottom(document.querySelector('#message-wrap'))
  document.querySelector('#message-wrap').style.overflow = 'auto'
}

main.app.LoadServer = async (el, server) => {
  if (/[0-9]{12}/.test(location.pathname.split('/').splice(3, 1))) {
    document.querySelector('.clist').innerHTML = ''
    var e = await main.app.request('categories', location.pathname.split('/').splice(2, 1), [['v', '1'], ['type', 'servercats']])
    var oa = ''
    e.map(async t => {
      oa = t
      var c = await main.app.request('categories', t, [['v', '1']])
      var a = document.createElement('div')
      a.classList.add('cat')
      a.setAttribute('data-catid', t)
      if (document.querySelectorAll(`.cat[data-catid="${t}"]`).length != 0) document.querySelectorAll(`.cat[data-catid="${t}"]`).forEach(e => e.remove())
      var b = document.createElement('div')
      b.classList.add('category-name')
      b.innerText = c.name
      a.insertAdjacentElement('afterbegin', b)
      document.querySelector('.clist').insertAdjacentElement('beforeend', a)
    })
    await new Promise(e => setTimeout(e, 50))
    //console.log(document.querySelector(`.cat[data-catid="${oa}"]`)) amogus 
    await main.app.loadChannels(server)
    document.querySelector('.server-info').innerText = server.name
  } else {
    console.log('broke')
  }
}

main.app.loadChannels = async server => {
  return new Promise((e, r) => {
    //document.querySelector('.clist').innerHTML = ''
    Object.entries(server.channels).map(async ([e, v]) => {
      var a = await main.app.request('channels', v, [['v', '1']])
      var channel = document.createElement('div')
      if (document.querySelector(`*[data-direction="${v}"]`)) return;
      channel.classList.add('channel')
      channel.setAttribute('data-direction', v)
      channel.setAttribute('data-category', a.category)
      channel.onclick = main.app.handleChannel(channel, a)
      channel.innerText = '' + a.name;
      try { document.querySelector(`.cat[data-catid="${a.category}"]`).insertAdjacentElement('beforeend', channel) } catch { document.querySelector('.clist').insertAdjacentElement('afterbegin', channel) }
      if (location.pathname.split('/').splice(3, 1)==v) {main.app.Skeleton();channel.click()}
    })
    setTimeout(() => e('done'), 40)
  })
}

/*setTimeout(() => { amogus 
  if (/[0-9]{12}/.test(location.pathname.split('/').splice(3, 1))) {
    main.app.Skeleton();
    try {document.querySelector(`*[data-predir="/channels/${location.pathname.split('/').splice(2, 1).toString().match(/[0-9]{12}/g)[0]}"]`).click()} catch {
      setTimeout(() => {
        document.querySelector(`*[data-predir="/channels/${location.pathname.split('/').splice(2, 1).toString().match(/[0-9]{12}/g)[0]}"]`).click()
      }, 500)
    }
  }
}, 3000)*/

main.app.FailLoad = function() {
  if (document.querySelector('.failed')) document.querySelector('.failed').remove()
  var html = '<div class="failed"><div class="failedRed"><span class="failedMessage">Channel Failed to Load</span><span class="failedTryAgain">Try Again</span></div></div>'
  document.querySelector('.message-wrapper').insertAdjacentHTML('beforeend', html)

  document.querySelector('.failedTryAgain').addEventListener('click', (e) => {
    main.app.loadChannel()
  })
}

setInterval(() => {
  if (document.querySelector('.failed')) document.querySelector('.failed').style.width = document.querySelector('.input-top').clientWidth+'px'
}, 5)