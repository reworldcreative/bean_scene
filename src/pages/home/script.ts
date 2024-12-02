import { burger } from '@/scripts/modules/burger'
import { feedbackList } from '@/scripts/widgets/feedback-list'
import { feedbackSwiper } from '@/scripts/widgets/feedback-slidet'
import { noveltiesList } from '@/scripts/widgets/novelties-list'
import { swiper } from '@/scripts/widgets/novelties-slider'

document.addEventListener('DOMContentLoaded', () => {
  burger()
  noveltiesList()
  feedbackList()
  swiper
  feedbackSwiper
})
