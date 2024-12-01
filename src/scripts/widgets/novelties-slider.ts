import Swiper from 'swiper'

export const swiper = new Swiper('.slider-novelties', {
  slidesPerView: 1.2,
  spaceBetween: 10,

  breakpoints: {
    350: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 2.2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3.3,
      spaceBetween: 15,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1500: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
})
