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

const items = ref([
  // --- Палубная доска ---
  {
    title: 'Дуб Аляска',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/1_palub_Alaska.webp',
    type: 'Палубная доска',
    id: 'dub-alyaska-palubnaya-doska',
  },
  {
    title: 'Дуб Антик',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/2_palub_Antik.webp',
    type: 'Палубная доска',
    id: 'dub-antik-palubnaya-doska',
  },
  {
    title: 'Дуб Балтик',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/3_palub_Baltik.webp',
    type: 'Палубная доска',
    id: 'dub-baltik-palubnaya-doska',
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/4_palub_Barni.webp',
    type: 'Палубная доска',
    id: 'dub-barin-palubnaya-doska',
  },
  {
    title: 'Дуб Болтон',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/5_palub_Bolton.webp',
    type: 'Палубная доска',
    id: 'dub-bolton-palubnaya-doska',
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/6_palub_Kopcheniy.webp',
    type: 'Палубная доска',
    id: 'dub-kopcheniy-palubnaya-doska',
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/7_palub_Koritsa.webp',
    type: 'Палубная доска',
    id: 'dub-koritsa-palubnaya-doska',
  },
  {
    title: 'Дуб Маренго',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/8_palub_Marengo.webp',
    type: 'Палубная доска',
    id: 'dub-marengo-palubnaya-doska',
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/9_palub_Medniy.webp',
    type: 'Палубная доска',
    id: 'dub-medniy-palubnaya-doska',
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/10_palub_Merkuriy.webp',
    type: 'Палубная доска',
    id: 'dub-merkuriy-palubnaya-doska',
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/11_palub_Mindal.webp',
    type: 'Палубная доска',
    id: 'dub-mindal-palubnaya-doska',
  },
  {
    title: 'Дуб Мокка',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/12_palub_Mokka.webp',
    type: 'Палубная доска',
    id: 'dub-mokka-palubnaya-doska',
  },
  {
    title: 'Дуб Натуральный',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/13_palub_Naturalniy.webp',
    type: 'Палубная доска',
    id: 'dub-naturalniy-palubnaya-doska',
  },
  {
    title: 'Дуб Нежный Песок',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/14_palub_NezhniyPesok.webp',
    type: 'Палубная доска',
    id: 'dub-nezhniy-pesok-palubnaya-doska',
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/15_palub_Orekh.webp',
    type: 'Палубная доска',
    id: 'dub-orekh-palubnaya-doska',
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/16_palub_Satin.webp',
    type: 'Палубная доска',
    id: 'dub-satin-palubnaya-doska',
  },
  {
    title: 'Дуб Табак',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/17_palub_Tabak.webp',
    type: 'Палубная доска',
    id: 'dub-tabak-palubnaya-doska',
  },
  {
    title: 'Дуб Темный Шоколад',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/18_palub_TemniyShokolad.webp',
    type: 'Палубная доска',
    id: 'dub-temniy-shokolad-palubnaya-doska',
  },
  {
    title: 'Дуб Шелк',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/19_palub_Shelk.webp',
    type: 'Палубная доска',
    id: 'dub-shelk-palubnaya-doska',
  },

  // --- Французская елка ---
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/1_fr_Burbon.webp',
    type: 'Французская елка',
    id: 'dub-burbon-frantsuzskaya-elka',
  },
  {
    title: 'Дуб Домино',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/2_fr_Domino.webp',
    type: 'Французская елка',
    id: 'dub-domino-frantsuzskaya-elka',
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/3_fr_Dymchatyi.webp',
    type: 'Французская елка',
    id: 'dub-dymchatyi-frantsuzskaya-elka',
  },
  {
    title: 'Дуб Карамель',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/4_fr_Karamel.webp',
    type: 'Французская елка',
    id: 'dub-karamel-frantsuzskaya-elka',
  },
  {
    title: 'Дуб Мичиган',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/5_fr_Michigan.webp',
    type: 'Французская елка',
    id: 'dub-michigan-frantsuzskaya-elka',
  },
  {
    title: 'Дуб Рома',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/6_fr_Roma.webp',
    type: 'Французская елка',
    id: 'dub-roma-frantsuzskaya-elka',
  },
  {
    title: 'Дуб Тавор',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/7_fr_Tavor.webp',
    type: 'Французская елка',
    id: 'dub-tavor-frantsuzskaya-elka',
  },
  {
    title: 'Дуб Экстра Грей',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/8_fr_ExtraGreiy.webp',
    type: 'Французская елка',
    id: 'dub-ekstra-greiy-frantsuzskaya-elka',
  },
  {
    title: 'Дуб Экстра Лава',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/9_fr_ExtraLava.webp',
    type: 'Французская елка',
    id: 'dub-ekstra-lava-frantsuzskaya-elka',
  },

  // --- Венгерская елка ---
  {
    title: 'Дуб Арава',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/1_vengr_Arava.webp',
    type: 'Венгерская елка',
    id: 'dub-arava-vengerskaya-elka',
  },
  {
    title: 'Дуб Блек Винтаж',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/2_vengr_BlackVintage.webp',
    type: 'Венгерская елка',
    id: 'dub-black-vintage-vengerskaya-elka',
  },
  {
    title: 'Дуб Дерби',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/3_vengr_Derbi.webp',
    type: 'Венгерская елка',
    id: 'dub-derbi-vengerskaya-elka',
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/4_vengr_Kolonial.webp',
    type: 'Венгерская елка',
    id: 'dub-kolonial-vengerskaya-elka',
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/5_vengr_Korsika.webp',
    type: 'Венгерская елка',
    id: 'dub-korsika-vengerskaya-elka',
  },
  {
    title: 'Дуб Лайвори',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/6_vengr_Layvori.webp',
    type: 'Венгерская елка',
    id: 'dub-layvori-vengerskaya-elka',
  },
  {
    title: 'Дуб Морган',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/7_vengr_Morgan.webp',
    type: 'Венгерская елка',
    id: 'dub-morgan-vengerskaya-elka',
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/8_vengr_Opera.webp',
    type: 'Венгерская елка',
    id: 'dub-opera-vengerskaya-elka',
  },
  {
    title: 'Дуб Платина',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/9_vengr_Platina.webp',
    type: 'Венгерская елка',
    id: 'dub-platina-vengerskaya-elka',
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/10_vengr_Provans.webp',
    type: 'Венгерская елка',
    id: 'dub-provans-vengerskaya-elka',
  },
  {
    title: 'Дуб Ретро',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/11_vengr_Retro.webp',
    type: 'Венгерская елка',
    id: 'dub-retro-vengerskaya-elka',
  },
  {
    title: 'Дуб Рок',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/12_vengr_Rok.webp',
    type: 'Венгерская елка',
    id: 'dub-rok-vengerskaya-elka',
  },
  {
    title: 'Дуб Серый Винтаж',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/13_vengr_SeriyVintage.webp',
    type: 'Венгерская елка',
    id: 'dub-seriy-vintage-vengerskaya-elka',
  },
  {
    title: 'Дуб Техас',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/14_vengr_Texas.webp',
    type: 'Венгерская елка',
    id: 'dub-texas-vengerskaya-elka',
  },
  {
    title: 'Дуб Урбан Грей',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/15_vengr_UrbanGreiy.webp',
    type: 'Венгерская елка',
    id: 'dub-urban-greiy-vengerskaya-elka',
  },
  {
    title: 'Дуб Фредди',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/16_vengr_Fredi.webp',
    type: 'Венгерская елка',
    id: 'dub-fredan-vengerskaya-elka',
  },
  {
    title: 'Дуб Шамплен',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/17_vengr_Shamplen.webp',
    type: 'Венгерская елка',
    id: 'dub-shamplen-vengerskaya-elka',
  },
  {
    title: 'Дуб Экстра Белый',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/18_vengr_ExtraBelyi.webp',
    type: 'Венгерская елка',
    id: 'dub-ekstra-belyi-vengerskaya-elka',
  },
  {
    title: 'Дуб Экстра Роза',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/19_vengr_ExtraRoza.webp',
    type: 'Венгерская елка',
    id: 'dub-ekstra-roza-vengerskaya-elka',
  },
  {
    title: 'Дуб Шале',
    img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/20_vengr_Shale.webp',
    type: 'Венгерская елка',
    id: 'dub-shale-vengerskaya-elka',
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
