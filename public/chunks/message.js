// chunks 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
main.AwaitingMessages = []

main.app.initMessage = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    var message = imageify(urlify(form.querySelectorAll('input')[1].value))
    if (message.trim() == '') return ''
    form.reset();
    var id = Math.floor(Math.random() * (999999999999 - 100000000000) + 100000000000)
    main.AwaitingMessages.push(id)
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
    if (main.app.ws.readyState!=1) main.app.FailMessage(id)
    setTimeout(() => {
      if (main.AwaitingMessages.indexOf(id)>-1) {
        main.app.FailMessage(id)
      }
    }, 4000)
    ScrollBottom(document.querySelector('#message-wrap'))
  })
}

main.app.FailMessage = function(id) {
  try {
    document.querySelector(`.message[id="${id.toString()}"`).querySelector('.user-message').style.color = '#ca4a4a'
  } catch {return}
}