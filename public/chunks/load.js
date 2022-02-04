main.app.home={};main.app.home.load = async function() {
  const HomeBTN = document.querySelector('.home-label.server-init')
  document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'))
  HomeBTN.classList.add('selected')
  main.app.redirect('channels/@me')
  
}