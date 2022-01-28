setTimeout(() => {
  oncontextmenu = (e) => {
    e.preventDefault()
    document.querySelectorAll('.ctxmenu').forEach(e => e.remove())
    let menu = document.createElement("div")
    menu.id = "ctxmenu"
    menu.classList.add('ctxmenu')
    menu.style = `top:${e.pageY - 0}px;left:${e.pageX + 0}px`
    //menu.onmouseleave = () => ctxmenu.outerHTML = ''
    menu.innerHTML = "<p>Option1</p><p>Option2</p><p>Option3</p><p>Option4</p>"
    document.body.appendChild(menu)
  }

  document.addEventListener('click', (e) => {
    if (e.id == 'ctxmenu') {

    } else if (e.target.parentElement && e.target.parentElement.id == 'ctxmenu') {

    } else if (e.target.parentElement && e.target.parentElement.parentElement && e.target.parentElement.parentElement.id == 'ctxmenu') {

    } else {
      document.querySelector('#ctxmenu') ? document.querySelector('#ctxmenu').remove() : null
    }
  })
}, 3900)