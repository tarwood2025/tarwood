<template>
  <div>
    <section class="bg-[#F5F1EB] py-10 md:py-18 px-4">
      <div class="mx-auto text-center space-y-4 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Каталог продукции</h2>
        <p class="text-sm sm:text-base">
          Широкий выбор инженерной доски из различных пород древесины <br />
          Каждый продукт сочетает в себе красоту, качество и долговечность
        </p>
      </div>
    </section>

    <section>
      <div class="p-6 max-w-7xl text-center mx-auto">
        <!-- Фильтры -->
        <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            :class="[
              'px-3 sm:px-4 py-1.5 rounded-lg border text-sm sm:text-base transition',
              activeFilter === filter
                ? 'bg-tar-green text-white border-tar-green hover:bg-tar-green-hover'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
            ]"
          >
            {{ filter }}
          </button>
        </div>

        <!-- Сетка товаров -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          <div
            v-for="(item, idx) in filteredItems"
            :key="idx"
            class="flex flex-col items-center rounded-lg overflow-hidden hover:shadow-lg transition-all py-2 cursor-pointer"
            @click="openCard(item)"
          >
            <div
              class="w-full max-w-[165px] h-[165px] flex items-center justify-center bg-gray-100"
            >
              <img
                v-if="item.img"
                :src="item.img"
                alt="img"
                class="object-cover w-full h-full rounded-xl"
              />
              <TheUnknownImg v-else />
            </div>
            <div class="text-center py-2 text-sm sm:text-base">
              {{ item.title }}
            </div>
          </div>
        </div>

        <!-- Пагинация/инфо -->
        <div class="text-center mt-6 text-tar-secondary text-sm sm:text-base">
          Показано {{ filteredItems.length }} из {{ items.length }} товаров
        </div>
      </div>
    </section>

    <TheChouse />
  </div>
</template>

<script setup>
import TheChouse from '@/components/TheChouse.vue'
import TheUnknownImg from '@/ui/TheUnknownImg.vue'
import { ref, computed } from 'vue'
import img1 from '@/assets/images/1.jpg'
import img2 from '@/assets/images/2.jpg'
import img3 from '@/assets/images/3.jpg'
import img4 from '@/assets/images/4.jpg'
import router from '@/router'

const filters = ['Все', 'Палубная доска', 'Венгерская елка', 'Французская елка']
const activeFilter = ref('Все')

const items2 = ref([
  { title: 'Балтик', img: img1, type: 'Палубная доска', id: 1 },
  { title: 'Барни', img: img2, type: 'Палубная доска', id: 2 },
  { title: 'Бронза', img: img3, type: 'Венгерская елка', id: 3 },
  { title: 'Венге', img: img4, type: 'Французская елка', id: 4 },
  { title: 'Береза', img: null, type: 'Французская елка', id: 5 },
  { title: 'Дуб', img: null, type: 'Палубная доска', id: 6 },
  { title: 'Иволга', img: null, type: 'Венгерская елка', id: 7 },
  { title: 'Клён', img: null, type: 'Французская елка', id: 8 },
  { title: 'Тополь', img: null, type: 'Французская елка', id: 9 },
  { title: 'Ель', img: null, type: 'Палубная доска', id: 10 },
  { title: 'Пальма', img: null, type: 'Венгерская елка', id: 11 },
  { title: 'Яблоня', img: null, type: 'Французская елка', id: 12 },
])

const items = ref([
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/1_palub_Baltic.jpg',
    type: 'Палубная доска',
    id: 1,
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/jansenflru/tarwood-v2/public_html/paluba/2_palub_Barni_s.jpg',
    type: 'Палубная доска',
    id: 2,
  },
  { title: 'Дуб Бронза', img: null, type: 'Палубная доска', id: 3 },
  { title: 'Дуб Бурбон', img: null, type: 'Палубная доска', id: 4 },
  { title: 'Дуб Корица', img: null, type: 'Палубная доска', id: 5 },
  { title: 'Дуб Колониал', img: null, type: 'Палубная доска', id: 6 },
  { title: 'Дуб Медный', img: null, type: 'Палубная доска', id: 7 },
  { title: 'Дуб Корсика', img: null, type: 'Палубная доска', id: 8 },
  { title: 'Дуб Серый винтаж', img: null, type: 'Палубная доска', id: 9 },
  { title: 'Дуб Слоновая кость', img: null, type: 'Палубная доска', id: 10 },
  { title: 'Дуб Миндаль', img: null, type: 'Палубная доска', id: 11 },
  { title: 'Дуб Меркурий', img: null, type: 'Палубная доска', id: 12 },
  { title: 'Дуб Старый', img: null, type: 'Палубная доска', id: 13 },
  { title: 'Дуб Опера', img: null, type: 'Палубная доска', id: 14 },
  { title: 'Дуб Оригинальный', img: null, type: 'Палубная доска', id: 15 },
  { title: 'Дуб Пепел', img: null, type: 'Палубная доска', id: 16 },
  { title: 'Дуб Жемчуг', img: null, type: 'Палубная доска', id: 17 },
  { title: 'Дуб Прованс', img: null, type: 'Палубная доска', id: 18 },
  { title: 'Дуб Сатин', img: null, type: 'Палубная доска', id: 19 },
  { title: 'Дуб Шёлк', img: null, type: 'Палубная доска', id: 20 },
  { title: 'Дуб Копченый', img: null, type: 'Палубная доска', id: 21 },
  { title: 'Дуб Дымчатый', img: null, type: 'Палубная доска', id: 22 },
  { title: 'Дуб Нежный песок', img: null, type: 'Палубная доска', id: 23 },
  { title: 'Дуб Орех', img: null, type: 'Палубная доска', id: 24 },
])

const filteredItems = computed(() => {
  if (activeFilter.value === 'Все') return items.value
  return items.value.filter((i) => i.type === activeFilter.value)
})

function openCard(item) {
  router.push({ name: 'porductCard', params: { id: item.id } })
  console.log(item)
}
</script>
