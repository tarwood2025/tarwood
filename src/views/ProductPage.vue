<template>
  <div class="flex flex-col md:flex-row gap-8 items-start max-w-7xl mx-auto my-4 p-4">
    <div class="w-full md:w-1/2 max-w-2xl">
      <img
        :src="currentItem.img"
        alt="Инженерная доска Балтик из дуба"
        class="rounded-lg shadow-md w-full object-cover"
      />
    </div>

    <div class="w-full md:w-1/2">
      <h2 class="text-2xl font-semibold mb-6">{{ currentItem.title }}</h2>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Материал</span>
          <span class="font-semibold text-gray-800">Дуб</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Поверхность</span>
          <span class="font-semibold text-gray-800">Шлифованная</span>
        </div>

        <div class="flex justify-between items-center">
          <label for="grade" class="font-medium text-gray-600">Селекция</label>
          <div class="relative w-48">
            <select
              id="grade"
              v-model="formState.grade"
              class="peer block w-full appearance-none rounded-md px-3 pr-10 border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            >
              <option disabled value="">Выберите</option>
              <option v-for="g in availableGrades" :key="g" :value="g">{{ g }}</option>
            </select>
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 text-gray-500 peer-focus:rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <label for="thickness" class="font-medium text-gray-600">Толщина, мм</label>
          <div class="relative w-48">
            <select
              id="thickness"
              v-model="formState.thickness"
              :disabled="!availableThickness.length"
              class="peer block w-full appearance-none rounded-md px-3 pr-10 border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option disabled value="">Выберите</option>
              <option v-for="t in availableThickness" :key="t" :value="t">{{ t }}</option>
            </select>
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 text-gray-500 peer-focus:rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <label for="width" class="font-medium text-gray-600">Ширина, мм</label>
          <div class="relative w-48">
            <select
              id="width"
              v-model="formState.width"
              :disabled="!availableWidths.length"
              class="peer block w-full appearance-none rounded-md px-3 pr-10 border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option disabled value="">Выберите</option>
              <option v-for="w in availableWidths" :key="w" :value="w">{{ w }}</option>
            </select>
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 text-gray-500 peer-focus:rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <label for="length" class="font-medium text-gray-600">Длина, мм</label>
          <div class="relative w-48">
            <select
              id="length"
              v-model="formState.length"
              :disabled="!availableLengths.length"
              class="peer block w-full appearance-none rounded-md px-3 pr-10 border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option disabled value="">Выберите</option>
              <option v-for="l in availableLengths" :key="l" :value="l">{{ l }}</option>
            </select>
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 text-gray-500 peer-focus:rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="selectedProduct"
        class="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-sm"
      >
        <h3 class="text-lg font-bold text-slate-800 mb-4">Ваша конфигурация</h3>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Селекция</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.grade }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Толщина</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.thickness }} мм</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Ширина</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.width }} мм</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Длина</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.length }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Площадь упаковки</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.m2 }} м²</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Все возможные комбинации продукта
const productOptions = [
  { thickness: 11, width: 120, length: '400-1600', grade: 'Рустик', m2: 1.73 },
  { thickness: 11, width: 140, length: '600-2200', grade: 'Рустик', m2: 2.46 },
  { thickness: 14, width: 140, length: '600-2200', grade: 'Рустик', m2: 2.46 },
  { thickness: 14, width: 185, length: '600-2200', grade: 'Рустик', m2: 2.44 },
  { thickness: 16, width: 185, length: '600-2200', grade: 'Рустик', m2: 2.44 },

  { thickness: 11, width: 120, length: '400-1600', grade: 'Натур', m2: 1.73 },
  { thickness: 11, width: 140, length: '600-2200', grade: 'Натур', m2: 2.46 },
  { thickness: 14, width: 140, length: '600-2200', grade: 'Натур', m2: 2.46 },
  { thickness: 14, width: 185, length: '600-2200', grade: 'Натур', m2: 2.44 },
  { thickness: 16, width: 185, length: '600-2200', grade: 'Натур', m2: 2.44 },

  { thickness: 11, width: 140, length: '600-2200', grade: 'Селект', m2: 2.46 },
  { thickness: 14, width: 140, length: '600-2200', grade: 'Селект', m2: 2.46 },
  { thickness: 14, width: 185, length: '600-2200', grade: 'Селект', m2: 2.44 },
  { thickness: 16, width: 185, length: '600-2200', grade: 'Селект', m2: 2.44 },
]

const currentItem = computed(() => {
  return items.value.find((item) => item.id == router.currentRoute.value.params.id)
})

const items = ref([
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/1_palub_Baltic.jpg',
    type: 'Палубная доска',
    id: 1,
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/2_palub_Barni.jpg',
    type: 'Палубная доска',
    id: 2,
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/3_palub_Bronze.jpg',
    type: 'Палубная доска',
    id: 3,
  },
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/4_palub_Burbon.jpg',
    type: 'Палубная доска',
    id: 4,
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/5_palub_Canela.jpg',
    type: 'Палубная доска',
    id: 5,
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/6_palub_Colonial.jpg',
    type: 'Палубная доска',
    id: 6,
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/7_palub_Copper.jpg',
    type: 'Палубная доска',
    id: 7,
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/8_palub_Corsica.jpg',
    type: 'Палубная доска',
    id: 8,
  },
  {
    title: 'Дуб Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/9_palub_Grey_Vintage.jpg',
    type: 'Палубная доска',
    id: 9,
  },
  {
    title: 'Дуб Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/10_palub_Ivory.jpg',
    type: 'Палубная доска',
    id: 10,
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/11_palub_Mendal.jpg',
    type: 'Палубная доска',
    id: 11,
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/12_palub_Mercury.jpg',
    type: 'Палубная доска',
    id: 12,
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/13_palub_Old.jpg',
    type: 'Палубная доска',
    id: 13,
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/14_palub_Opera.jpg',
    type: 'Палубная доска',
    id: 14,
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/15_palub_Origial.jpg',
    type: 'Палубная доска',
    id: 15,
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/16_palub_Pepel.jpg',
    type: 'Палубная доска',
    id: 16,
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/17_palub_Perl.jpg',
    type: 'Палубная доска',
    id: 17,
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/18_palub_Provence.jpg',
    type: 'Палубная доска',
    id: 18,
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/19_palub_Satin.jpg',
    type: 'Палубная доска',
    id: 19,
  },
  {
    title: 'Дуб Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/20_palub_Silk.jpg',
    type: 'Палубная доска',
    id: 20,
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/21_palub_Smoked.jpg',
    type: 'Палубная доска',
    id: 21,
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/22_palub_Smoky.jpg',
    type: 'Палубная доска',
    id: 22,
  },
  {
    title: 'Дуб Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/23_palub_Soft_Sand.jpg',
    type: 'Палубная доска',
    id: 23,
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/24_palub_Walnut.jpg',
    type: 'Палубная доска',
    id: 24,
  },
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/1_vengr_Baltic.jpg',
    type: 'Венгерская елка',
    id: 25,
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/2_vengr_Barni.jpg',
    type: 'Венгерская елка',
    id: 26,
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/3_vengr_Bronze.jpg',
    type: 'Венгерская елка',
    id: 27,
  },
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/4_vengr_Burbon.jpg',
    type: 'Венгерская елка',
    id: 28,
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/5_vengr_Canela.jpg',
    type: 'Венгерская елка',
    id: 29,
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/6_vengr_Colonial.jpg',
    type: 'Венгерская елка',
    id: 30,
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/7_vengr_Coppe.jpg',
    type: 'Венгерская елка',
    id: 31,
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/8_vengr_Corsica.jpg',
    type: 'Венгерская елка',
    id: 32,
  },
  {
    title: 'Дуб Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/9_vengr_Grey_Vintage.jpg',
    type: 'Венгерская елка',
    id: 33,
  },
  {
    title: 'Дуб Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/10_vengr_Ivory.jpg',
    type: 'Венгерская елка',
    id: 34,
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/11_vengr_Mendal.jpg',
    type: 'Венгерская елка',
    id: 35,
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/12_vengr_Mercury.jpg',
    type: 'Венгерская елка',
    id: 36,
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/13_vengr_Old.jpg',
    type: 'Венгерская елка',
    id: 37,
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/14_vengr_Opera.jpg',
    type: 'Венгерская елка',
    id: 38,
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/15_vengr_Origial.jpg',
    type: 'Венгерская елка',
    id: 39,
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/16_vengr_Pepel.jpg',
    type: 'Венгерская елка',
    id: 40,
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/17_vengr_Perl.jpg',
    type: 'Венгерская елка',
    id: 41,
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/18_vengr_Provence.jpg',
    type: 'Венгерская елка',
    id: 42,
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/19_vengr_Satin.jpg',
    type: 'Венгерская елка',
    id: 43,
  },
  {
    title: 'Дуб Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/20_vengr_Silk.jpg',
    type: 'Венгерская елка',
    id: 44,
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/21_vengr_Smoked.jpg',
    type: 'Венгерская елка',
    id: 45,
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/22_vengr_Smoky.jpg',
    type: 'Венгерская елка',
    id: 46,
  },
  {
    title: 'Дуб Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/23_vengr_Soft_Sand.jpg',
    type: 'Венгерская елка',
    id: 47,
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/24_vengr_Walnut.jpg',
    type: 'Венгерская елка',
    id: 48,
  },
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/1_fr_Baltic.jpg',
    type: 'Французская елка',
    id: 49,
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/2_fr_Barni.jpg',
    type: 'Французская елка',
    id: 50,
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/3_fr_Bronze.jpg',
    type: 'Французская елка',
    id: 51,
  },
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/4_fr_Burbon.jpg',
    type: 'Французская елка',
    id: 52,
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/5_fr_Canela.jpg',
    type: 'Французская елка',
    id: 53,
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/6_fr_Colonial.jpg',
    type: 'Французская елка',
    id: 54,
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/7_fr_Copper.jpg',
    type: 'Французская елка',
    id: 55,
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/8_fr_Corsica.jpg',
    type: 'Французская елка',
    id: 56,
  },
  {
    title: 'Дуб Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/9_fr_Grey_Vintage.jpg',
    type: 'Французская елка',
    id: 57,
  },
  {
    title: 'Дуб Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/10_fr_Ivory.jpg',
    type: 'Французская елка',
    id: 58,
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/11_fr_Mendal.jpg',
    type: 'Французская елка',
    id: 59,
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/12_fr_Mercury.jpg',
    type: 'Французская елка',
    id: 60,
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/13_fr_Old.jpg',
    type: 'Французская елка',
    id: 61,
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/14_fr_Opera.jpg',
    type: 'Французская елка',
    id: 62,
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/15_fr_Origial.jpg',
    type: 'Французская елка',
    id: 63,
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/16_fr_Pepel.jpg',
    type: 'Французская елка',
    id: 64,
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/17_fr_Perl.jpg',
    type: 'Французская елка',
    id: 65,
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/18_fr_Provence.jpg',
    type: 'Французская елка',
    id: 66,
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/19_fr_Satin.jpg',
    type: 'Французская елка',
    id: 67,
  },
  {
    title: 'Дуб Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/20_fr_Silk.jpg',
    type: 'Французская елка',
    id: 68,
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/21_fr_Smoked.jpg',
    type: 'Французская елка',
    id: 69,
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/22_fr_Smoky.jpg',
    type: 'Французская елка',
    id: 70,
  },
  {
    title: 'Дуб Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/23_fr_Soft_Sand.jpg',
    type: 'Французская елка',
    id: 71,
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/24_fr_Walnut.jpg',
    type: 'Французская елка',
    id: 72,
  },
])

// Состояние формы
const formState = reactive({
  grade: '',
  thickness: '',
  width: '',
  length: '',
})

// --- Наблюдатели для сброса зависимых полей ---
watch(
  () => formState.grade,
  () => {
    formState.thickness = ''
    formState.width = ''
    formState.length = ''
  },
)

watch(
  () => formState.thickness,
  () => {
    formState.width = ''
    formState.length = ''
  },
)

watch(
  () => formState.width,
  () => {
    formState.length = ''
  },
)

// --- Вычисляемые свойства для доступных опций ---
const availableGrades = computed(() => [...new Set(productOptions.map((p) => p.grade))])

const availableThickness = computed(() => {
  if (!formState.grade) return []
  return [
    ...new Set(productOptions.filter((p) => p.grade === formState.grade).map((p) => p.thickness)),
  ]
})

const availableWidths = computed(() => {
  if (!formState.thickness) return []
  return [
    ...new Set(
      productOptions
        .filter((p) => p.grade === formState.grade && p.thickness === formState.thickness)
        .map((p) => p.width),
    ),
  ]
})

const availableLengths = computed(() => {
  if (!formState.width) return []
  return [
    ...new Set(
      productOptions
        .filter(
          (p) =>
            p.grade === formState.grade &&
            p.thickness === formState.thickness &&
            p.width === formState.width,
        )
        .map((p) => p.length),
    ),
  ]
})

// --- Итоговый выбранный продукт и его цена ---
const selectedProduct = computed(() =>
  productOptions.find(
    (p) =>
      p.grade === formState.grade &&
      p.thickness === formState.thickness &&
      p.width === formState.width &&
      p.length === formState.length,
  ),
)

const calculatedPrice = computed(() => {
  if (!selectedProduct.value) return null
  let basePrice = 4150

  if (selectedProduct.value.grade === 'Натур') basePrice += 400
  if (selectedProduct.value.grade === 'Селект') basePrice += 1100
  if (selectedProduct.value.width === 185) basePrice += 700
  if (selectedProduct.value.width === 140) basePrice += 350
  if (selectedProduct.value.thickness === 16) basePrice += 500

  return new Intl.NumberFormat('kk-KZ', {
    style: 'currency',
    currency: 'KZT',
    minimumFractionDigits: 0,
  }).format(basePrice)
})
</script>
