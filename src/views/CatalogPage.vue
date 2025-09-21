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
              'px-3 sm:px-4 py-1.5 rounded-lg border text-sm sm:text-base transition cursor-pointer',
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
            v-for="item in filteredItems"
            :key="item.id"
            class="flex flex-col items-center rounded-lg overflow-hidden hover:shadow-lg transition-all py-2 cursor-pointer"
            @click="openCard(item)"
          >
            <div
              class="w-full max-w-[165px] h-[165px] flex items-center justify-center bg-gray-100"
            >
              <img
                v-if="item.img"
                :src="item.img"
                :alt="item.title"
                class="object-cover w-full h-full rounded-xl"
              />
              <TheUnknownImg v-else />
            </div>
            <div class="text-center py-2 text-sm sm:text-base">
              {{ item.title }} <br />
              ({{ item.type }})
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
import { ref, computed, TransitionGroup } from 'vue'
import router from '@/router'

const filters = ['Все', 'Палубная доска', 'Венгерская елка', 'Французская елка']
const activeFilter = ref('Все')

const items = ref([
  {
    title: 'Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/1_palub_Baltic_s.jpg',
    type: 'Палубная доска',
    id: 1,
  },
  {
    title: 'Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/2_palub_Barni_s.jpg',
    type: 'Палубная доска',
    id: 2,
  },
  {
    title: 'Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/3_palub_Bronze_s.jpg',
    type: 'Палубная доска',
    id: 3,
  },
  {
    title: 'Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/4_palub_Burbon_s.jpg',
    type: 'Палубная доска',
    id: 4,
  },
  {
    title: 'Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/5_palub_Canela_s.jpg',
    type: 'Палубная доска',
    id: 5,
  },
  {
    title: 'Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/6_palub_Colonial_s.jpg',
    type: 'Палубная доска',
    id: 6,
  },
  {
    title: 'Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/7_palub_Copper_s.jpg',
    type: 'Палубная доска',
    id: 7,
  },
  {
    title: 'Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/8_palub_Corsica_s.jpg',
    type: 'Палубная доска',
    id: 8,
  },
  {
    title: 'Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/9_palub_Grey_Vintage_s.jpg',
    type: 'Палубная доска',
    id: 9,
  },
  {
    title: 'Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/10_palub_Ivory_s.jpg',
    type: 'Палубная доска',
    id: 10,
  },
  {
    title: 'Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/11_palub_Mendal_s.jpg',
    type: 'Палубная доска',
    id: 11,
  },
  {
    title: 'Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/12_palub_Mercury_s.jpg',
    type: 'Палубная доска',
    id: 12,
  },
  {
    title: 'Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/13_palub_Old_s.jpg',
    type: 'Палубная доска',
    id: 13,
  },
  {
    title: 'Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/14_palub_Opera_s.jpg',
    type: 'Палубная доска',
    id: 14,
  },
  {
    title: 'Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/15_palub_Origial_s.jpg',
    type: 'Палубная доска',
    id: 15,
  },
  {
    title: 'Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/16_palub_Pepel_s.jpg',
    type: 'Палубная доска',
    id: 16,
  },
  {
    title: 'Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/17_palub_Perl_s.jpg',
    type: 'Палубная доска',
    id: 17,
  },
  {
    title: 'Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/18_palub_Provence_s.jpg',
    type: 'Палубная доска',
    id: 18,
  },
  {
    title: 'Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/19_palub_Satin_s.jpg',
    type: 'Палубная доска',
    id: 19,
  },
  {
    title: 'Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/20_palub_Silk_s.jpg',
    type: 'Палубная доска',
    id: 20,
  },
  {
    title: 'Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/21_palub_Smoked_s.jpg',
    type: 'Палубная доска',
    id: 21,
  },
  {
    title: 'Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/22_palub_Smoky_s.jpg',
    type: 'Палубная доска',
    id: 22,
  },
  {
    title: 'Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/23_palub_Soft_Sand_s.jpg',
    type: 'Палубная доска',
    id: 23,
  },
  {
    title: 'Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/24_palub_Walnut_s.jpg',
    type: 'Палубная доска',
    id: 24,
  },
  {
    title: 'Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/1_vengr_Baltic_s.jpg',
    type: 'Венгерская елка',
    id: 25,
  },
  {
    title: 'Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/2_vengr_Barni_s.jpg',
    type: 'Венгерская елка',
    id: 26,
  },
  {
    title: 'Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/3_vengr_Bronze_s.jpg',
    type: 'Венгерская елка',
    id: 27,
  },
  {
    title: 'Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/4_vengr_Burbon_s.jpg',
    type: 'Венгерская елка',
    id: 28,
  },
  {
    title: 'Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/5_vengr_Canela_s.jpg',
    type: 'Венгерская елка',
    id: 29,
  },
  {
    title: 'Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/6_vengr_Colonial_s.jpg',
    type: 'Венгерская елка',
    id: 30,
  },
  {
    title: 'Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/7_vengr_Coppe_s.jpg',
    type: 'Венгерская елка',
    id: 31,
  },
  {
    title: 'Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/8_vengr_Corsica_s.jpg',
    type: 'Венгерская елка',
    id: 32,
  },
  {
    title: 'Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/9_vengr_Grey_Vintage_s.jpg',
    type: 'Венгерская елка',
    id: 33,
  },
  {
    title: 'Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/10_vengr_Ivory_s.jpg',
    type: 'Венгерская елка',
    id: 34,
  },
  {
    title: 'Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/11_vengr_Mendal_s.jpg',
    type: 'Венгерская елка',
    id: 35,
  },
  {
    title: 'Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/12_vengr_Mercury_s.jpg',
    type: 'Венгерская елка',
    id: 36,
  },
  {
    title: 'Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/13_vengr_Old_s.jpg',
    type: 'Венгерская елка',
    id: 37,
  },
  {
    title: 'Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/14_vengr_Opera_s.jpg',
    type: 'Венгерская елка',
    id: 38,
  },
  {
    title: 'Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/15_vengr_Origial_s.jpg',
    type: 'Венгерская елка',
    id: 39,
  },
  {
    title: 'Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/16_vengr_Pepel_s.jpg',
    type: 'Венгерская елка',
    id: 40,
  },
  {
    title: 'Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/17_vengr_Perl_s.jpg',
    type: 'Венгерская елка',
    id: 41,
  },
  {
    title: 'Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/18_vengr_Provence_s.jpg',
    type: 'Венгерская елка',
    id: 42,
  },
  {
    title: 'Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/19_vengr_Satin_s.jpg',
    type: 'Венгерская елка',
    id: 43,
  },
  {
    title: 'Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/20_vengr_Silk_s.jpg',
    type: 'Венгерская елка',
    id: 44,
  },
  {
    title: 'Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/21_vengr_Smoked_s.jpg',
    type: 'Венгерская елка',
    id: 45,
  },
  {
    title: 'Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/22_vengr_Smoky_s.jpg',
    type: 'Венгерская елка',
    id: 46,
  },
  {
    title: 'Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/23_vengr_Soft_Sand_s.jpg',
    type: 'Венгерская елка',
    id: 47,
  },
  {
    title: 'Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/24_vengr_Walnut_s.jpg',
    type: 'Венгерская елка',
    id: 48,
  },
  {
    title: 'Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/1_fr_Baltic_s.jpg',
    type: 'Французская елка',
    id: 49,
  },
  {
    title: 'Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/2_fr_Barni_s.jpg',
    type: 'Французская елка',
    id: 50,
  },
  {
    title: 'Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/3_fr_Bronze_s.jpg',
    type: 'Французская елка',
    id: 51,
  },
  {
    title: 'Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/4_fr_Burbon_s.jpg',
    type: 'Французская елка',
    id: 52,
  },
  {
    title: 'Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/5_fr_Canela_s.jpg',
    type: 'Французская елка',
    id: 53,
  },
  {
    title: 'Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/6_fr_Colonial_s.jpg',
    type: 'Французская елка',
    id: 54,
  },
  {
    title: 'Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/7_fr_Copper_s.jpg',
    type: 'Французская елка',
    id: 55,
  },
  {
    title: 'Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/8_fr_Corsica_s.jpg',
    type: 'Французская елка',
    id: 56,
  },
  {
    title: 'Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/9_fr_Grey_Vintage_s.jpg',
    type: 'Французская елка',
    id: 57,
  },
  {
    title: 'Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/10_fr_Ivory_s.jpg',
    type: 'Французская елка',
    id: 58,
  },
  {
    title: 'Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/11_fr_Mendal_s.jpg',
    type: 'Французская елка',
    id: 59,
  },
  {
    title: 'Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/12_fr_Mercury_s.jpg',
    type: 'Французская елка',
    id: 60,
  },
  {
    title: 'Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/13_fr_Old_s.jpg',
    type: 'Французская елка',
    id: 61,
  },
  {
    title: 'Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/14_fr_Opera_s.jpg',
    type: 'Французская елка',
    id: 62,
  },
  {
    title: 'Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/15_fr_Origial_s.jpg',
    type: 'Французская елка',
    id: 63,
  },
  {
    title: 'Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/16_fr_Pepel_s.jpg',
    type: 'Французская елка',
    id: 64,
  },
  {
    title: 'Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/17_fr_Perl_s.jpg',
    type: 'Французская елка',
    id: 65,
  },
  {
    title: 'Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/18_fr_Provence_s.jpg',
    type: 'Французская елка',
    id: 66,
  },
  {
    title: 'Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/19_fr_Satin_s.jpg',
    type: 'Французская елка',
    id: 67,
  },
  {
    title: 'Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/20_fr_Silk_s.jpg',
    type: 'Французская елка',
    id: 68,
  },
  {
    title: 'Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/21_fr_Smoked_s.jpg',
    type: 'Французская елка',
    id: 69,
  },
  {
    title: 'Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/22_fr_Smoky_s.jpg',
    type: 'Французская елка',
    id: 70,
  },
  {
    title: 'Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/23_fr_Soft_Sand_s.jpg',
    type: 'Французская елка',
    id: 71,
  },
  {
    title: 'Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/24_fr_Walnut_s.jpg',
    type: 'Французская елка',
    id: 72,
  },
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
