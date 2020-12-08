$( function() {           //header search-form
  $('#search').on('click', function(e) {
    e.preventDefault()
    $('.header__sidenav').toggleClass('hidden')
    $('.header__search-form').toggleClass('active')
  })

  window.addEventListener('scroll', function() {
    $('.header__top').toggleClass('sticky', window.scrollY > 0)
  })

  $('.slider__inner').slick({
    dots: true,
    arrows: false,
    autoplay: true
  })
})