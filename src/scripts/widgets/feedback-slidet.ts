import { Navigation, Pagination } from 'swiper/modules'
import Swiper from 'swiper'

export const feedbackSwiper = new Swiper('.slider-feedback', {
  slidesPerView: 1,
  spaceBetween: 20,
  watchOverflow: true,
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
