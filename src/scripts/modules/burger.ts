import { disablePageScroll, enablePageScroll } from '@fluejs/noscroll'

export const burger = (): void => {
  const burgerButton = document.querySelector('.burger')
  const container = document.querySelector('.header__container')
  const nav = document.querySelector('.header__nav')

  burgerButton?.addEventListener('click', () => {
    container?.classList.toggle('open')
    container?.classList.contains('open') ? disablePageScroll() : enablePageScroll()
  })

  document.addEventListener('click', e => {
    if (e.target !== nav && e.target !== burgerButton) {
      container?.classList.remove('open')
      enablePageScroll()
    }
  })
}
