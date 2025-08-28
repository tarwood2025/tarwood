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

const filters = ['Все', 'Палубная доска', 'Венгерская елка', 'Французская елка']
const activeFilter = ref('Все')

const items = ref([
  { title: 'Балтик', img: '/tarwood/src/assets/images/1.jpg', type: 'Палубная доска' },
  { title: 'Барни', img: '/tarwood/src/assets/images/2.jpg', type: 'Палубная доска' },
  { title: 'Бронза', img: '/tarwood/src/assets/images/3.jpg', type: 'Венгерская елка' },
  { title: 'Венге', img: '/tarwood/src/assets/images/4.jpg', type: 'Французская елка' },
  { title: 'Береза', img: null, type: 'Французская елка' },
  { title: 'Дуб', img: null, type: 'Палубная доска' },
  { title: 'Иволга', img: null, type: 'Венгерская елка' },
  { title: 'Клён', img: null, type: 'Французская елка' },
  { title: 'Тополь', img: null, type: 'Французская елка' },
  { title: 'Ель', img: null, type: 'Палубная доска' },
  { title: 'Пальма', img: null, type: 'Венгерская елка' },
  { title: 'Яблоня', img: null, type: 'Французская елка' },
])

const filteredItems = computed(() => {
  if (activeFilter.value === 'Все') return items.value
  return items.value.filter((i) => i.type === activeFilter.value)
})
</script>
