import Handlebars from 'handlebars'
import data from '@/data/home/novelties.json'

export const noveltiesList = (): void => {
  const listElement = document.getElementById('noveltiesList')
  if (!listElement) return

  const template = Handlebars.compile(
    `<li class='swiper-slide novelties-section__item'>
      <article class='card'>
        <div class='card__container'>
          <div class='card__img'>
            <picture>
              <source type="image/webp" srcset="{{webpSrc}}">
              <img src="{{image}}" alt="{{imageAlt}}" class="image" width=280 height=220>
            </picture>
          </div>

          <div class='card__content'>
            <h3 class='card__name'>{{name}}</h3>
            <p class='card__description'>{{description}}</p>
            <p class='card__price'>{{price}}</p>
          </div>
        </div>

        <button type='button' class='button card__button'>Order Now</button>
      </article>
      </li>`
  )

  data.forEach(item => {
    const context = {
      image: item.image,
      name: item.title,
      description: item.description,
      price: item.price,
    }

    const HTML = template(context)
    listElement.innerHTML += HTML
  })
}
