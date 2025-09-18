<template>
  <div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
    <div
      class="relative max-h-[70vh] w-full rounded-lg overflow-hidden mb-4 cursor-pointer"
      @click="openModal(currentImage)"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <img
        :src="currentImage.src"
        :alt="currentImage.alt"
        class="w-full h-full object-cover transition-opacity duration-300"
      />
    </div>

    <div class="text-center text-gray-500 mb-4">← Навигация клавишами и свайпом →</div>

    <div
      ref="thumbnailContainer"
      class="flex gap-2 w-full overflow-x-auto pb-2"
      style="scrollbar-width: none; -ms-overflow-style: none"
    >
      <img
        v-for="(image, index) in images"
        :key="index"
        :ref="
          (el) => {
            if (el) thumbnailRefs[index] = el
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
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
    @click="closeModal"
  >
    <div class="relative w-full h-full flex items-center justify-center" @click.stop>
      <img
        :src="modalImage.src"
        :alt="modalImage.alt"
        class="max-w-full max-h-full object-contain"
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
import g1 from '../assets/images/g1.jpg'
import g2 from '../assets/images/g2.jpg'
import g3 from '../assets/images/g3.jpg'
import g4 from '../assets/images/g4.jpg'
import g5 from '../assets/images/g5.jpg'
import g6 from '../assets/images/g6.jpg'
import g7 from '../assets/images/g7.jpg'
import g8 from '../assets/images/g8.jpg'
import g9 from '../assets/images/g9.jpg'

const images = [
  { src: g1, thumb: g1, alt: 'Паркет-елочка' },
  { src: g2, thumb: g2, alt: 'Светлая комната' },
  { src: g3, thumb: g3, alt: 'Паркет-елочка' },
  { src: g4, thumb: g4, alt: 'Паркет-елочка' },
  { src: g5, thumb: g5, alt: 'Паркет-елочка' },
  { src: g6, thumb: g6, alt: 'Паркет-елочка' },
  { src: g7, thumb: g7, alt: 'Паркет-елочка' },
  { src: g8, thumb: g8, alt: 'Паркет-елочка' },
  { src: g9, thumb: g9, alt: 'Паркет-елочка' },
]

const currentIndex = ref(0)
const currentImage = ref(images[0])
const isModalOpen = ref(false)
const modalImage = ref<any>({})

// --- НОВЫЙ КОД ДЛЯ ПРОКРУТКИ И СВАЙПА ---

// Refs для DOM-элементов
const thumbnailContainer = ref<HTMLElement | null>(null)
const thumbnailRefs = ref<HTMLElement[]>([])

// Refs для отслеживания касаний
const touchStartX = ref(0)
const touchEndX = ref(0)

const selectImage = (index: number) => {
  currentIndex.value = index
  currentImage.value = images[index]
}

// Обработчики свайпа
const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX
  touchEndX.value = 0
}

const handleTouchMove = (event: TouchEvent) => {
  touchEndX.value = event.touches[0].clientX
}

const handleTouchEnd = () => {
  if (touchEndX.value === 0) return // Это был клик, а не свайп

  const diff = touchStartX.value - touchEndX.value
  const threshold = 50 // Минимальная дистанция для свайпа

  if (diff > threshold) {
    // Свайп влево -> следующее изображение
    const newIndex = (currentIndex.value + 1) % images.length
    selectImage(newIndex)
  } else if (diff < -threshold) {
    // Свайп вправо -> предыдущее изображение
    const newIndex = (currentIndex.value - 1 + images.length) % images.length
    selectImage(newIndex)
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

// --- КОНЕЦ НОВОГО КОДА ---

const openModal = (image: { src: string; alt: string; thumb: string }) => {
  modalImage.value = image
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (isModalOpen.value) {
    if (event.key === 'Escape') {
      closeModal()
    }
    return
  }

  if (event.key === 'ArrowLeft') {
    const newIndex = (currentIndex.value - 1 + images.length) % images.length
    selectImage(newIndex)
  } else if (event.key === 'ArrowRight') {
    const newIndex = (currentIndex.value + 1) % images.length
    selectImage(newIndex)
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
