$( function() {           //header search-form
  $('#search').on('click', function(e) {
    e.preventDefault()
    $('.header__sidenav').toggleClass('hidden')
    $('.header__search-form').toggleClass('active')
  })

  window.addEventListener('scroll', function() {
    $('.header__inner').toggleClass('sticky', window.scrollY > 0)
  })
})