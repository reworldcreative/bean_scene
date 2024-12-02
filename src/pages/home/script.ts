import { burger } from '@/scripts/modules/burger'
import { feedbackSwiper } from '@/scripts/widgets/feedback-slidet'
import { list } from '@/scripts/widgets/novelties-list'
import { swiper } from '@/scripts/widgets/novelties-slider'

document.addEventListener('DOMContentLoaded', () => {
  burger()
  list()
  swiper
  feedbackSwiper
})
