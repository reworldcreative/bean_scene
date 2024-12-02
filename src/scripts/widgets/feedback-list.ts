import dataBackup from '@/data/home/feedback.json'

interface FeedbackItem {
  id: number
  description: string
  author: string
  position: string
  avatar: string
}

const API_URL = 'https://retoolapi.dev/9u3YqT/data?_limit=10'
let data: FeedbackItem[] = dataBackup

async function fetchData(): Promise<void> {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`HTTP помилка! Статус: ${response.status}`)
    }
    data = (await response.json()) as FeedbackItem[]
  } catch (error) {
    console.error('Error:', error)
  }
}

export const feedbackList = async (): Promise<void> => {
  const listElement = document.getElementById('feedbackList')
  if (!listElement) return
  await fetchData()

  data.forEach(item => {
    const HTML = `
    <article class='swiper-slide feedback-section__item'>
      <p class='text feedback-section__description'>
        ${item.description}
      </p>

      <h4 class='feedback-section__author'>
        ${item.author}
      </h4>

      <p class='text feedback-section__position'>
        ${item.position}
      </p>

      <div class='feedback-section__avatar'>
        <img src="/images/feedback/${item.avatar}.webp" alt="feedback author" aria-hidden="false" class="image" width="112" height="112" loading="lazy">
      </div>
    </article>
    `
    listElement.innerHTML += HTML
  })
}
