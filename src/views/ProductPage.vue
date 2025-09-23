<template>
  <div class="flex flex-col md:flex-row gap-8 items-start max-w-7xl mx-auto my-4 p-4">
    <div class="w-full md:w-1/2 max-w-2xl flex-1">
      <img
        :src="currentItem.img"
        alt="Инженерная доска Балтик из дуба"
        class="rounded-lg shadow-md w-full object-cover"
      />
    </div>

    <div class="w-full md:w-1/2 flex-1">
      <h2 class="text-2xl font-semibold mb-6">{{ currentItem.title }}</h2>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Материал</span>
          <span class="font-semibold text-gray-800">Дуб</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Покрытие</span>
          <span class="font-semibold text-gray-800">UF масло</span>
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
import { useRoute } from 'vue-router'

const route = useRoute()

// --- DATA ---
// All product items are defined here

const items = ref([
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/1_palub_Baltic.jpg',
    type: 'Палубная доска',
    id: 'dub-baltik-palubnaya-doska',
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/2_palub_Barni.jpg',
    type: 'Палубная доска',
    id: 'dub-barni-palubnaya-doska',
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/3_palub_Bronze.jpg',
    type: 'Палубная доска',
    id: 'dub-bronza-palubnaya-doska',
  },
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/4_palub_Burbon.jpg',
    type: 'Палубная доска',
    id: 'dub-burbon-palubnaya-doska',
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/5_palub_Canela.jpg',
    type: 'Палубная доска',
    id: 'dub-korica-palubnaya-doska',
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/6_palub_Colonial.jpg',
    type: 'Палубная доска',
    id: 'dub-kolonial-palubnaya-doska',
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/7_palub_Copper.jpg',
    type: 'Палубная доска',
    id: 'dub-mednyy-palubnaya-doska',
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/8_palub_Corsica.jpg',
    type: 'Палубная доска',
    id: 'dub-korsika-palubnaya-doska',
  },
  {
    title: 'Дуб Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/9_palub_Grey_Vintage.jpg',
    type: 'Палубная доска',
    id: 'dub-seryy-vintazh-palubnaya-doska',
  },
  {
    title: 'Дуб Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/10_palub_Ivory.jpg',
    type: 'Палубная доска',
    id: 'dub-slonovaya-kost-palubnaya-doska',
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/11_palub_Mendal.jpg',
    type: 'Палубная доска',
    id: 'dub-mindal-palubnaya-doska',
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/12_palub_Mercury.jpg',
    type: 'Палубная доска',
    id: 'dub-merkuriy-palubnaya-doska',
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/13_palub_Old.jpg',
    type: 'Палубная доска',
    id: 'dub-staryy-palubnaya-doska',
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/14_palub_Opera.jpg',
    type: 'Палубная доска',
    id: 'dub-opera-palubnaya-doska',
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/15_palub_Origial.jpg',
    type: 'Палубная доска',
    id: 'dub-originalnyy-palubnaya-doska',
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/16_palub_Pepel.jpg',
    type: 'Палубная доска',
    id: 'dub-pepel-palubnaya-doska',
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/17_palub_Perl.jpg',
    type: 'Палубная доска',
    id: 'dub-zhemchug-palubnaya-doska',
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/18_palub_Provence.jpg',
    type: 'Палубная доска',
    id: 'dub-provans-palubnaya-doska',
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/19_palub_Satin.jpg',
    type: 'Палубная доска',
    id: 'dub-satin-palubnaya-doska',
  },
  {
    title: 'Дуб Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/20_palub_Silk.jpg',
    type: 'Палубная доска',
    id: 'dub-shelk-palubnaya-doska',
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/21_palub_Smoked.jpg',
    type: 'Палубная доска',
    id: 'dub-kopchenyy-palubnaya-doska',
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/22_palub_Smoky.jpg',
    type: 'Палубная доска',
    id: 'dub-dymchatyy-palubnaya-doska',
  },
  {
    title: 'Дуб Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/23_palub_Soft_Sand.jpg',
    type: 'Палубная доска',
    id: 'dub-nezhnyy-pesok-palubnaya-doska',
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/24_palub_Walnut.jpg',
    type: 'Палубная доска',
    id: 'dub-orekh-palubnaya-doska',
  },

  // 🔽 дальше идут "Венгерская елка" (25–48)
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/1_vengr_Baltic.jpg',
    type: 'Венгерская елка',
    id: 'dub-baltik-vengerskaya-elka',
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/2_vengr_Barni.jpg',
    type: 'Венгерская елка',
    id: 'dub-barni-vengerskaya-elka',
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/3_vengr_Bronze.jpg',
    type: 'Венгерская елка',
    id: 'dub-bronza-vengerskaya-elka',
  },
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/4_vengr_Burbon.jpg',
    type: 'Венгерская елка',
    id: 'dub-burbon-vengerskaya-elka',
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/5_vengr_Canela.jpg',
    type: 'Венгерская елка',
    id: 'dub-korica-vengerskaya-elka',
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/6_vengr_Colonial.jpg',
    type: 'Венгерская елка',
    id: 'dub-kolonial-vengerskaya-elka',
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/7_vengr_Coppe.jpg',
    type: 'Венгерская елка',
    id: 'dub-mednyy-vengerskaya-elka',
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/8_vengr_Corsica.jpg',
    type: 'Венгерская елка',
    id: 'dub-korsika-vengerskaya-elka',
  },
  {
    title: 'Дуб Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/9_vengr_Grey_Vintage.jpg',
    type: 'Венгерская елка',
    id: 'dub-seryy-vintazh-vengerskaya-elka',
  },
  {
    title: 'Дуб Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/10_vengr_Ivory.jpg',
    type: 'Венгерская елка',
    id: 'dub-slonovaya-kost-vengerskaya-elka',
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/11_vengr_Mendal.jpg',
    type: 'Венгерская елка',
    id: 'dub-mindal-vengerskaya-elka',
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/12_vengr_Mercury.jpg',
    type: 'Венгерская елка',
    id: 'dub-merkuriy-vengerskaya-elka',
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/13_vengr_Old.jpg',
    type: 'Венгерская елка',
    id: 'dub-staryy-vengerskaya-elka',
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/14_vengr_Opera.jpg',
    type: 'Венгерская елка',
    id: 'dub-opera-vengerskaya-elka',
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/15_vengr_Origial.jpg',
    type: 'Венгерская елка',
    id: 'dub-originalnyy-vengerskaya-elka',
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/16_vengr_Pepel.jpg',
    type: 'Венгерская елка',
    id: 'dub-pepel-vengerskaya-elka',
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/17_vengr_Perl.jpg',
    type: 'Венгерская елка',
    id: 'dub-zhemchug-vengerskaya-elka',
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/18_vengr_Provence.jpg',
    type: 'Венгерская елка',
    id: 'dub-provans-vengerskaya-elka',
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/19_vengr_Satin.jpg',
    type: 'Венгерская елка',
    id: 'dub-satin-vengerskaya-elka',
  },
  {
    title: 'Дуб Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/20_vengr_Silk.jpg',
    type: 'Венгерская елка',
    id: 'dub-shelk-vengerskaya-elka',
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/21_vengr_Smoked.jpg',
    type: 'Венгерская елка',
    id: 'dub-kopchenyy-vengerskaya-elka',
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/22_vengr_Smoky.jpg',
    type: 'Венгерская елка',
    id: 'dub-dymchatyy-vengerskaya-elka',
  },
  {
    title: 'Дуб Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/23_vengr_Soft_Sand.jpg',
    type: 'Венгерская елка',
    id: 'dub-nezhnyy-pesok-vengerskaya-elka',
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/24_vengr_Walnut.jpg',
    type: 'Венгерская елка',
    id: 'dub-orekh-vengerskaya-elka',
  },

  // 🔽 дальше идут "Французская елка" (49–72)
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/1_fr_Baltic.jpg',
    type: 'Французская елка',
    id: 'dub-baltik-francuzskaya-elka',
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/2_fr_Barni.jpg',
    type: 'Французская елка',
    id: 'dub-barni-francuzskaya-elka',
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/3_fr_Bronze.jpg',
    type: 'Французская елка',
    id: 'dub-bronza-francuzskaya-elka',
  },
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/4_fr_Burbon.jpg',
    type: 'Французская елка',
    id: 'dub-burbon-francuzskaya-elka',
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/5_fr_Canela.jpg',
    type: 'Французская елка',
    id: 'dub-korica-francuzskaya-elka',
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/6_fr_Colonial.jpg',
    type: 'Французская елка',
    id: 'dub-kolonial-francuzskaya-elka',
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/7_fr_Copper.jpg',
    type: 'Французская елка',
    id: 'dub-mednyy-francuzskaya-elka',
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/8_fr_Corsica.jpg',
    type: 'Французская елка',
    id: 'dub-korsika-francuzskaya-elka',
  },
  {
    title: 'Дуб Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/9_fr_Grey_Vintage.jpg',
    type: 'Французская елка',
    id: 'dub-seryy-vintazh-francuzskaya-elka',
  },
  {
    title: 'Дуб Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/10_fr_Ivory.jpg',
    type: 'Французская елка',
    id: 'dub-slonovaya-kost-francuzskaya-elka',
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/11_fr_Mendal.jpg',
    type: 'Французская елка',
    id: 'dub-mindal-francuzskaya-elka',
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/12_fr_Mercury.jpg',
    type: 'Французская елка',
    id: 'dub-merkuriy-francuzskaya-elka',
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/13_fr_Old.jpg',
    type: 'Французская елка',
    id: 'dub-staryy-francuzskaya-elka',
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/14_fr_Opera.jpg',
    type: 'Французская елка',
    id: 'dub-opera-francuzskaya-elka',
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/15_fr_Origial.jpg',
    type: 'Французская елка',
    id: 'dub-originalnyy-francuzskaya-elka',
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/16_fr_Pepel.jpg',
    type: 'Французская елка',
    id: 'dub-pepel-francuzskaya-elka',
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/17_fr_Perl.jpg',
    type: 'Французская елка',
    id: 'dub-zhemchug-francuzskaya-elka',
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/18_fr_Provence.jpg',
    type: 'Французская елка',
    id: 'dub-provans-francuzskaya-elka',
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/19_fr_Satin.jpg',
    type: 'Французская елка',
    id: 'dub-satin-francuzskaya-elka',
  },
  {
    title: 'Дуб Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/20_fr_Silk.jpg',
    type: 'Французская елка',
    id: 'dub-shelk-francuzskaya-elka',
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/21_fr_Smoked.jpg',
    type: 'Французская елка',
    id: 'dub-kopchenyy-francuzskaya-elka',
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/22_fr_Smoky.jpg',
    type: 'Французская елка',
    id: 'dub-dymchatyy-francuzskaya-elka',
  },
  {
    title: 'Дуб Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/23_fr_Soft_Sand.jpg',
    type: 'Французская елка',
    id: 'dub-nezhnyy-pesok-francuzskaya-elka',
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/24_fr_Walnut.jpg',
    type: 'Французская елка',
    id: 'dub-orekh-francuzskaya-elka',
  },
])

// Group all product configurations by type for easy lookup
const productConfigurations = {
  'Палубная доска': [
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
  ],
  'Венгерская елка': [
    { thickness: 14, width: 100, length: 600, grade: 'Рустик', m2: 1.08 },
    { thickness: 14, width: 100, length: 600, grade: 'Натур', m2: 1.08 },
    { thickness: 14, width: 100, length: 600, grade: 'Селект', m2: 1.08 },
    { thickness: 14, width: 140, length: 600, grade: 'Рустик', m2: 1.344 },
    { thickness: 14, width: 140, length: 600, grade: 'Натур', m2: 1.344 },
    { thickness: 14, width: 140, length: 600, grade: 'Селект', m2: 1.344 },
  ],
  'Французская елка': [
    { thickness: 14, width: 120, length: 585, grade: 'Рустик', m2: 0.98 },
    { thickness: 14, width: 120, length: 585, grade: 'Натур', m2: 0.98 },
    { thickness: 14, width: 120, length: 585, grade: 'Селект', m2: 0.98 },
  ],
}

// Group pricing logic by product type. This makes it easy to add new rules.
// NOTE: Pricing for new types is an example. Adjust the base price and increments as needed.
const pricingCalculators = {
  'Палубная доска': (product) => {
    let basePrice = 4150
    if (product.grade === 'Натур') basePrice += 400
    if (product.grade === 'Селект') basePrice += 1100
    if (product.width === 185) basePrice += 700
    if (product.width === 140) basePrice += 350
    if (product.thickness === 16) basePrice += 500
    return basePrice
  },
  'Венгерская елка': (product) => {
    let basePrice = 5200 // Example base price
    if (product.grade === 'Натур') basePrice += 500
    if (product.grade === 'Селект') basePrice += 1200
    if (product.width === 140) basePrice += 400
    return basePrice
  },
  'Французская елка': (product) => {
    let basePrice = 5800 // Example base price
    if (product.grade === 'Натур') basePrice += 600
    if (product.grade === 'Селект') basePrice += 1400
    return basePrice
  },
}

// --- STATE ---
// A single reactive object to hold the user's selections
const formState = reactive({
  grade: '',
  thickness: '',
  width: '',
  length: '',
})

// --- COMPUTED PROPERTIES ---

// Find the current product based on the URL slug
const currentItem = computed(() => items.value.find((item) => item.id === route.params.slug))

// Dynamically select the correct configuration based on the current product's type
const currentOptions = computed(() => {
  if (!currentItem.value) return []
  return productConfigurations[currentItem.value.type] || []
})

// Get available grades from the current configuration
const availableGrades = computed(() => [...new Set(currentOptions.value.map((p) => p.grade))])

// Get available thicknesses based on the selected grade
const availableThickness = computed(() => {
  if (!formState.grade) return []
  const filtered = currentOptions.value.filter((p) => p.grade === formState.grade)
  return [...new Set(filtered.map((p) => p.thickness))]
})

// Get available widths based on grade and thickness
const availableWidths = computed(() => {
  if (!formState.thickness) return []
  const filtered = currentOptions.value.filter(
    (p) => p.grade === formState.grade && p.thickness === formState.thickness,
  )
  return [...new Set(filtered.map((p) => p.width))]
})

// Get available lengths based on grade, thickness, and width
const availableLengths = computed(() => {
  if (!formState.width) return []
  const filtered = currentOptions.value.filter(
    (p) =>
      p.grade === formState.grade &&
      p.thickness === formState.thickness &&
      p.width === formState.width,
  )
  return [...new Set(filtered.map((p) => p.length))]
})

// Find the final, fully configured product object
const selectedProduct = computed(() => {
  // Ensure all options are selected before finding the product
  if (!formState.grade || !formState.thickness || !formState.width || !formState.length) {
    return null
  }
  return currentOptions.value.find(
    (p) =>
      p.grade === formState.grade &&
      p.thickness === formState.thickness &&
      p.width === formState.width &&
      p.length === formState.length,
  )
})

// Calculate the price for the selected product configuration
const calculatedPrice = computed(() => {
  if (!selectedProduct.value || !currentItem.value) return null

  // Get the correct pricing function for the product type
  const calculator = pricingCalculators[currentItem.value.type]
  if (!calculator) return 'Цена не определена' // Fallback

  const price = calculator(selectedProduct.value)

  // Format the price for display
  return new Intl.NumberFormat('kk-KZ', {
    style: 'currency',
    currency: 'KZT',
    minimumFractionDigits: 0,
  }).format(price)
})

// --- WATCHERS ---

// This watcher resets the form whenever the user navigates to a new product page.
watch(currentItem, () => {
  formState.grade = ''
  formState.thickness = ''
  formState.width = ''
  formState.length = ''
})

// These watchers create a cascading reset effect.
// When a parent dropdown changes, its children are reset to prevent invalid combinations.
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
</script>
