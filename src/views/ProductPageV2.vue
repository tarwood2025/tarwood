<template>
  <div class="flex flex-col gap-6 md:gap-8 items-start max-w-7xl mx-auto my-4 p-3 sm:p-4">
    <!-- Основной контент -->
    <div class="w-full flex flex-col lg:flex-row gap-4 md:gap-6">
      <!-- Изображение -->
      <div class="relative w-full lg:flex-1">
        <img
          :src="currentItem.img"
          :alt="currentItem.title"
          class="rounded-lg shadow-md w-full h-auto max-h-[400px] md:max-h-[500px] object-cover cursor-pointer"
          @click="openFullscreen(currentItem.img, currentItem.title)"
        />
        <p
          class="absolute bottom-2 left-2 text-xs sm:text-sm text-white bg-black/50 px-2 py-1 rounded"
        >
          {{ currentItem.type }}
        </p>
      </div>

      <!-- Описание и схемы укладки -->
      <div class="w-full lg:flex-1">
        <h2 class="text-xl sm:text-2xl font-semibold mb-4 md:mb-6">{{ currentItem.title }}</h2>

        <p class="text-base sm:text-lg mb-4 md:mb-6">
          {{ `На изображении показан вариант укладки «${currentItem.type}».` }}
          <br />
          Все возможные схемы укладок предоставленны ниже:
        </p>

        <!-- Схемы укладки -->
        <div class="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
          <div
            v-for="(layout, index) in layoutSchemes"
            :key="index"
            class="flex flex-col items-center max-w-[90px] sm:max-w-[100px]"
          >
            <img
              class="border object-cover rounded-lg border-gray-300 w-full h-auto cursor-pointer transition-transform hover:scale-105"
              :src="layout.image"
              :alt="layout.name"
              @click="openFullscreen(layout.image, layout.name)"
            />
            <span class="text-xs mt-1 text-center">{{ layout.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Таблицы конфигураций -->
    <div class="w-full flex-1">
      <div class="space-y-6 md:space-y-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <h3 class="text-base sm:text-lg font-semibold px-3 sm:px-4 py-2 bg-tar-green text-white">
            Варианты конфигурации
          </h3>

          <!-- Адаптивная таблица -->
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm min-w-[500px]">
              <!-- Заголовки таблицы вынесены за пределы цикла -->
              <thead class="bg-[#cecece]">
                <tr>
                  <th class="px-2 sm:px-4 py-2 text-left font-bold text-gray-700">Толщина (мм)</th>
                  <th class="px-2 sm:px-4 py-2 text-left font-bold text-gray-700">Ширина (мм)</th>
                  <th class="px-2 sm:px-4 py-2 text-left font-bold text-gray-700">Длина (мм)</th>
                  <th class="px-2 sm:px-4 py-2 text-left font-bold text-gray-700">м² в упаковке</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                <!-- Группируем все конфигурации в одном tbody -->
                <template v-for="(item, id) in productConfigurations" :key="id">
                  <!-- Заголовок группы -->
                  <tr class="bg-gray-50">
                    <td colspan="4" class="px-2 sm:px-4 py-2 text-gray-900 font-semibold">
                      {{ item.title }}
                    </td>
                  </tr>
                  <!-- Данные конфигурации -->
                  <tr
                    v-for="(product, index) in item.list"
                    :key="index"
                    class="odd:bg-gray-50 even:bg-gray-100"
                  >
                    <td class="px-2 sm:px-4 py-2 text-gray-900">{{ product.thickness }}</td>
                    <td class="px-2 sm:px-4 py-2 text-gray-900">{{ product.width }}</td>
                    <td class="px-2 sm:px-4 py-2 text-gray-900">{{ product.length }}</td>
                    <td class="px-2 sm:px-4 py-2 text-gray-900">{{ product.m2 }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно полноэкранного просмотра -->
    <div
      v-if="isFullscreen"
      class="fixed inset-0 bg-black/80 bg-opacity-90 z-50 flex items-center justify-center p-4"
      @click="closeFullscreen"
    >
      <div class="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <!-- Кнопка закрытия -->
        <button
          class="absolute cursor-pointer top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 z-10 transition-colors"
          @click.stop="closeFullscreen"
        >
          <svg class="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Кнопка предыдущего изображения -->
        <button
          v-if="hasMultipleImages"
          class="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 z-10 transition-colors"
          @click.stop="prevImage"
        >
          <svg class="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Кнопка следующего изображения -->
        <button
          v-if="hasMultipleImages"
          class="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 z-10 transition-colors"
          @click.stop="nextImage"
        >
          <svg class="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Контейнер изображения -->
        <div class="relative w-full h-full flex items-center justify-center">
          <img
            :src="currentFullscreenImage"
            :alt="currentFullscreenTitle"
            class="max-w-full max-h-full object-contain rounded-lg"
          />

          <!-- Заголовок изображения -->
          <div
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/20 text-white px-4 py-2 rounded-lg text-sm sm:text-base"
          >
            {{ currentFullscreenTitle }}
          </div>

          <!-- Индикатор прогресса (для множественных изображений) -->
          <div
            v-if="hasMultipleImages"
            class="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2"
          >
            <div
              v-for="(img, index) in allImages"
              :key="index"
              class="w-2 h-2 rounded-full transition-colors"
              :class="currentImageIndex === index ? 'bg-white' : 'bg-white/50'"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import palub from '../assets/images/paluba.jpg'
import fr from '../assets/images/fr.jpg'
import ven from '../assets/images/ven.jpg'

// Реактивные данные
const isFullscreen = ref(false)
const currentFullscreenImage = ref('')
const currentFullscreenTitle = ref('')
const currentImageIndex = ref(0)
const allImages = ref([])

// Данные компонента

const layoutSchemes = ref([
  { image: palub, name: 'Палубная доска' },
  { image: fr, name: 'Французская елка' },
  { image: ven, name: 'Венгерская елка' },
])

// Вычисляемые свойства
const hasMultipleImages = computed(() => allImages.value.length > 1)

// Методы
const openFullscreen = (image, title) => {
  // Собираем все изображения для галереи
  allImages.value = [
    { src: currentItem.value.img, title: currentItem.value.title },
    ...layoutSchemes.value.map((scheme) => ({
      src: scheme.image,
      title: scheme.name,
    })),
  ]

  // Находим индекс текущего изображения
  currentImageIndex.value = allImages.value.findIndex((img) => img.src === image)
  currentFullscreenImage.value = image
  currentFullscreenTitle.value = title
  isFullscreen.value = true

  // Блокируем прокрутку body
  document.body.style.overflow = 'hidden'
}

const closeFullscreen = () => {
  isFullscreen.value = false
  currentFullscreenImage.value = ''
  currentFullscreenTitle.value = ''
  currentImageIndex.value = 0
  allImages.value = []

  // Разблокируем прокрутку body
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (hasMultipleImages.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % allImages.value.length
    currentFullscreenImage.value = allImages.value[currentImageIndex.value].src
    currentFullscreenTitle.value = allImages.value[currentImageIndex.value].title
  }
}

const prevImage = () => {
  if (hasMultipleImages.value) {
    currentImageIndex.value =
      currentImageIndex.value === 0 ? allImages.value.length - 1 : currentImageIndex.value - 1
    currentFullscreenImage.value = allImages.value[currentImageIndex.value].src
    currentFullscreenTitle.value = allImages.value[currentImageIndex.value].title
  }
}

// Обработка нажатия клавиш
const handleKeydown = (event) => {
  if (!isFullscreen.value) return

  switch (event.key) {
    case 'Escape':
      closeFullscreen()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'ArrowLeft':
      prevImage()
      break
  }
}

// Хуки жизненного цикла
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const route = useRoute()

const items = ref([
  // --- Палубная доска ---
  {
    title: 'Дуб Аляска',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/1_palub_Alaska.webp',
    type: 'Палубная доска',
    id: 'dub-alyaska-palubnaya-doska',
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/2_palub_Antik.webp',
    type: 'Палубная доска',
    id: 'dub-bronza-palubnaya-doska',
  },
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/3_palub_Baltik.webp',
    type: 'Палубная доска',
    id: 'dub-baltik-palubnaya-doska',
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/4_palub_Barni.webp',
    type: 'Палубная доска',
    id: 'dub-barin-palubnaya-doska',
  },
  {
    title: 'Дуб Болтон',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/5_palub_Bolton.webp',
    type: 'Палубная доска',
    id: 'dub-bolton-palubnaya-doska',
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/6_palub_Kopcheniy.webp',
    type: 'Палубная доска',
    id: 'dub-kopcheniy-palubnaya-doska',
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/7_palub_Koritsa.webp',
    type: 'Палубная доска',
    id: 'dub-koritsa-palubnaya-doska',
  },
  {
    title: 'Дуб Маренго',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/8_palub_Marengo.webp',
    type: 'Палубная доска',
    id: 'dub-marengo-palubnaya-doska',
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/9_palub_Medniy.webp',
    type: 'Палубная доска',
    id: 'dub-medniy-palubnaya-doska',
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/10_palub_Merkuriy.webp',
    type: 'Палубная доска',
    id: 'dub-merkuriy-palubnaya-doska',
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/11_palub_Mindal.webp',
    type: 'Палубная доска',
    id: 'dub-mindal-palubnaya-doska',
  },
  {
    title: 'Дуб Мокка',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/12_palub_Mokka.webp',
    type: 'Палубная доска',
    id: 'dub-mokka-palubnaya-doska',
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/13_palub_Naturalniy.webp',
    type: 'Палубная доска',
    id: 'dub-originalniy-palubnaya-doska',
  },
  {
    title: 'Дуб Нежный Песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/14_palub_NezhniyPesok.webp',
    type: 'Палубная доска',
    id: 'dub-nezhniy-pesok-palubnaya-doska',
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/15_palub_Orekh.webp',
    type: 'Палубная доска',
    id: 'dub-orekh-palubnaya-doska',
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/16_palub_Satin.webp',
    type: 'Палубная доска',
    id: 'dub-satin-palubnaya-doska',
  },
  {
    title: 'Дуб Табак',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/17_palub_Tabak.webp',
    type: 'Палубная доска',
    id: 'dub-tabak-palubnaya-doska',
  },
  {
    title: 'Дуб Темный Шоколад',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/18_palub_TemniyShokolad.webp',
    type: 'Палубная доска',
    id: 'dub-temniy-shokolad-palubnaya-doska',
  },
  {
    title: 'Дуб Шелк',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/19_palub_Shelk.webp',
    type: 'Палубная доска',
    id: 'dub-shelk-palubnaya-doska',
  },

  // --- Французская елка ---
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/1_fr_Burbon.webp',
    type: 'Французская елка',
    id: 'dub-burbon-francuzskaya-elka',
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/3_fr_Dymchatyi.webp',
    type: 'Французская елка',
    id: 'dub-dymchatyi-francuzskaya-elka',
  },
  {
    title: 'Дуб Карамель',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/4_fr_Karamel.webp',
    type: 'Французская елка',
    id: 'dub-karamel-francuzskaya-elka',
  },
  {
    title: 'Дуб Мичиган',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/5_fr_Michigan.webp',
    type: 'Французская елка',
    id: 'dub-michigan-francuzskaya-elka',
  },
  {
    title: 'Дуб Рома',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/6_fr_Roma.webp',
    type: 'Французская елка',
    id: 'dub-roma-francuzskaya-elka',
  },
  {
    title: 'Дуб Тавор',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/7_fr_Tavor.webp',
    type: 'Французская елка',
    id: 'dub-tavor-francuzskaya-elka',
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/8_fr_ExtraGreiy.webp',
    type: 'Французская елка',
    id: 'dub-pepel-francuzskaya-elka',
  },
  {
    title: 'Дуб Экстра Лава',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/9_fr_ExtraLava.webp',
    type: 'Французская елка',
    id: 'dub-ekstra-lava-francuzskaya-elka',
  },

  // --- Венгерская елка ---
  {
    title: 'Дуб Арава',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/1_vengr_Arava.webp',
    type: 'Венгерская елка',
    id: 'dub-arava-vengerskaya-elka',
  },
  {
    title: 'Дуб Блек Винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/2_vengr_BlackVintage.webp',
    type: 'Венгерская елка',
    id: 'dub-black-vintage-vengerskaya-elka',
  },
  {
    title: 'Дуб Дерби',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/3_vengr_Derbi.webp',
    type: 'Венгерская елка',
    id: 'dub-derbi-vengerskaya-elka',
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/4_vengr_Kolonial.webp',
    type: 'Венгерская елка',
    id: 'dub-kolonial-vengerskaya-elka',
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/5_vengr_Korsika.webp',
    type: 'Венгерская елка',
    id: 'dub-korsika-vengerskaya-elka',
  },
  {
    title: 'Дуб Лайвори',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/6_vengr_Layvori.webp',
    type: 'Венгерская елка',
    id: 'dub-layvori-vengerskaya-elka',
  },
  {
    title: 'Дуб Морган',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/7_vengr_Morgan.webp',
    type: 'Венгерская елка',
    id: 'dub-morgan-vengerskaya-elka',
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/8_vengr_Opera.webp',
    type: 'Венгерская елка',
    id: 'dub-opera-vengerskaya-elka',
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/10_vengr_Provans.webp',
    type: 'Венгерская елка',
    id: 'dub-provans-vengerskaya-elka',
  },
  {
    title: 'Дуб Ретро',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/11_vengr_Retro.webp',
    type: 'Венгерская елка',
    id: 'dub-retro-vengerskaya-elka',
  },
  {
    title: 'Дуб Рок',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/12_vengr_Rok.webp',
    type: 'Венгерская елка',
    id: 'dub-rok-vengerskaya-elka',
  },
  {
    title: 'Дуб Серый Винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/13_vengr_SeriyVintage.webp',
    type: 'Венгерская елка',
    id: 'dub-seriy-vintage-vengerskaya-elka',
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/15_vengr_UrbanGreiy.webp',
    type: 'Венгерская елка',
    id: 'dub-stary-vengerskaya-elka',
  },
  {
    title: 'Дуб Фредди',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/16_vengr_Fredi.webp',
    type: 'Венгерская елка',
    id: 'dub-fredan-vengerskaya-elka',
  },
  {
    title: 'Дуб Шамплен',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/17_vengr_Shamplen.webp',
    type: 'Венгерская елка',
    id: 'dub-shamplen-vengerskaya-elka',
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/18_vengr_ExtraBelyi.webp',
    type: 'Венгерская елка',
    id: 'dub-zhemchug-vengerskaya-elka',
  },
  {
    title: 'Дуб Экстра Роза',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/19_vengr_ExtraRoza.webp',
    type: 'Венгерская елка',
    id: 'dub-ekstra-roza-vengerskaya-elka',
  },
  {
    title: 'Дуб Шале',
    img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/20_vengr_Shale.webp',
    type: 'Венгерская елка',
    id: 'dub-shale-vengerskaya-elka',
  },
])

const productConfigurations = [
  {
    title: 'Палубная доска',
    list: [
      { thickness: 11, width: 140, length: '600-2200', m2: 2.46 },
      { thickness: 14, width: 140, length: '600-2200', m2: 2.46 },
      { thickness: 14, width: 185, length: '600-2200', m2: 2.44 },
    ],
  },
  {
    title: 'Венгерская елка',
    list: [
      { thickness: 14, width: 100, length: 600, m2: 1.08 },
      { thickness: 14, width: 140, length: 600, m2: 1.34 },
    ],
  },
  {
    title: 'Французская елка',
    list: [
      { thickness: 14, width: 120, length: 585, m2: 0.98 },
      { thickness: 14, width: 120, length: 500, m2: 0.98 },
    ],
  },
]

const currentItem = computed(
  () => items.value.find((item) => item.id === route.params.slug) || items.value[0],
)
</script>

<style scoped>
/* Анимация появления модального окна */
.fixed {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Адаптивные стили для мобильных устройств */
@media (max-width: 640px) {
  .max-h-\[400px\] {
    max-height: 300px;
  }

  /* Уменьшаем кнопки на мобильных */
  button {
    padding: 0.5rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}

/* Улучшение читаемости таблицы на маленьких экранах */
@media (max-width: 640px) {
  table {
    font-size: 0.75rem;
  }

  th,
  td {
    padding: 0.25rem 0.5rem;
  }
}

/* Эффекты hover для интерактивных элементов */

.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.transition-colors {
  transition: background-color 0.2s ease-in-out;
}
</style>
