import { burger } from '@/scripts/modules/burger'
import { list } from '@/scripts/widgets/novelties-list'
import { swiper } from '@/scripts/widgets/novelties-slider'

document.addEventListener('DOMContentLoaded', () => {
  burger()
  list()
  swiper
})
