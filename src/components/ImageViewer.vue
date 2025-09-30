<template>
  <div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
    <div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4 group">
      <img
        :key="currentImage.src + '-bg'"
        :src="currentImage.src"
        :alt="currentImage.alt"
        class="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-110 transition-opacity duration-500"
      />
      <img
        :key="currentImage.src"
        :src="currentImage.src"
        alt="img"
        class="relative z-10 w-full h-full object-contain cursor-pointer transition-opacity duration-500"
        @click="openModal(currentImage)"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      />

      <button
        @click="prevImage"
        class="absolute cursor-pointer top-1/2 left-4 -translate-y-1/2 z-20 bg-black/20 bg-opacity-40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-60"
        aria-label="Предыдущее изображение"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        @click="nextImage"
        class="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2 z-20 bg-black/20 bg-opacity-40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-60"
        aria-label="Следующее изображение"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div class="text-center text-gray-500 mb-4">← Навигация клавишами и свайпом →</div>

    <div
      ref="thumbnailContainer"
      class="flex gap-2 w-full overflow-x-auto p-2"
      style="scrollbar-width: none; -ms-overflow-style: none"
    >
      <img
        v-for="(image, index) in images"
        :key="index"
        :ref="
          (el) => {
            if (el) thumbnailRefs[index] = el as HTMLElement
          }
        "
        :src="image.thumb"
        :alt="image.alt"
        @click="selectImage(index)"
        :class="[
          'w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-transform duration-200 flex-shrink-0',
          currentIndex === index
            ? 'border-blue-500 scale-105'
            : 'border-transparent hover:scale-105',
        ]"
      />
    </div>
  </div>

  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-90 p-4"
    @click="closeModal"
  >
    <div class="relative w-full h-full flex items-center justify-center" @click.stop>
      <img
        :src="modalImage.src"
        :alt="modalImage.alt"
        class="max-w-full max-h-full object-contain rounded-2xl"
      />
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-white text-3xl font-bold bg-transparent border-none cursor-pointer"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import g1 from '../assets/images/g1.jpg'
import g2 from '../assets/images/g2.jpg'
import g4 from '../assets/images/g4.jpg'
import g5 from '../assets/images/g5.jpg'
import g6 from '../assets/images/g6.jpg'
import g7 from '../assets/images/g7.jpg'
import g8 from '../assets/images/g8.jpg'
import g9 from '../assets/images/g9.jpg'

const images = [
  { src: g1, thumb: g1, alt: 'Паркет-елочка' },
  { src: g2, thumb: g2, alt: 'Светлая комната' },
  { src: g4, thumb: g4, alt: 'Современный дизайн' },
  { src: g5, thumb: g5, alt: 'Паркет в спальне' },
  { src: g6, thumb: g6, alt: 'Минималистичный коридор' },
  { src: g7, thumb: g7, alt: 'Кухня с паркетом' },
  { src: g8, thumb: g8, alt: 'Рабочее место' },
  { src: g9, thumb: g9, alt: 'Уютный уголок' },
]

const currentIndex = ref(0)
const currentImage = computed(() => images[currentIndex.value])
const isModalOpen = ref(false)
const modalImage = ref<any>({})

const thumbnailContainer = ref<HTMLElement | null>(null)
const thumbnailRefs = ref<HTMLElement[]>([])

const touchStartX = ref(0)
const touchEndX = ref(0)

const selectImage = (index: number) => {
  currentIndex.value = index
}

// --- 3. РЕФАКТОРИНГ ЛОГИКИ НАВИГАЦИИ ---
const nextImage = () => {
  const newIndex = (currentIndex.value + 1) % images.length
  selectImage(newIndex)
}

const prevImage = () => {
  const newIndex = (currentIndex.value - 1 + images.length) % images.length
  selectImage(newIndex)
}

// Обработчики свайпа (используют новые функции)
const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX
  touchEndX.value = 0
}

const handleTouchMove = (event: TouchEvent) => {
  touchEndX.value = event.touches[0].clientX
}

const handleTouchEnd = () => {
  if (touchEndX.value === 0) return // Клик, а не свайп

  const diff = touchStartX.value - touchEndX.value
  const threshold = 50 // Минимальная дистанция для свайпа

  if (diff > threshold) {
    nextImage() // Свайп влево
  } else if (diff < -threshold) {
    prevImage() // Свайп вправо
  }
}

// Отслеживаем изменение currentIndex и прокручиваем миниатюру в центр
watch(currentIndex, (newIndex) => {
  const activeThumbnail = thumbnailRefs.value[newIndex]
  if (activeThumbnail) {
    activeThumbnail.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }
})

// Модальное окно
const openModal = (image: { src: string; alt: string; thumb: string }) => {
  modalImage.value = image
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Навигация с клавиатуры (использует новые функции)
const handleKeyDown = (event: KeyboardEvent) => {
  if (isModalOpen.value) {
    if (event.key === 'Escape') {
      closeModal()
    }
    return
  }

  if (event.key === 'ArrowLeft') {
    prevImage()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Скрываем полосу прокрутки для Webkit-браузеров (Chrome, Safari) */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
