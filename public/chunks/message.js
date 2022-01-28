main.app.initMessage = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    var message = imageify(urlify(form.querySelectorAll('input')[1].value))
    if (message.trim() == '') return ''
    form.reset();
    var id = Math.floor(Math.random() * (999999999999 - 100000000000) + 100000000000)
    var toSend = JSON.stringify({ type: 'message', token: localStorage['token'], content: message, channel: location.pathname.split('/').splice(3, 1), id: id })
    var AccountData = JSON.parse(localStorage['udata'])
    var element = CreateMessage({
      author: AccountData.username,
      hash: AccountData.hash,
      uid: AccountData.uid,
      timestamp: new Date().getTime(),
      icon: AccountData.icon,
      content: message,
      id: id
    })
    element.classList.add('loadingsend')
    document.querySelector('#message-wrap').insertAdjacentElement('beforeend', element)
    main.app.ws.send(toSend)
    ScrollBottom(document.querySelector('#message-wrap'))
  })
}