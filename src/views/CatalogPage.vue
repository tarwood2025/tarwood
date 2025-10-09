<template>
  <div>
    <section class="bg-[#F5F1EB] py-10 md:py-14 px-4">
      <div class="mx-auto text-center space-y-4 mb-6 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Каталог продукции</h2>
        <p class="text-sm sm:text-base">
          Широкий выбор инженерной доски из различных пород древесины <br />
          Каждый продукт сочетает в себе красоту, качество и долговечность <br />
          <span class="font-semibold">Ниже приведены примеры укладок</span>
        </p>
      </div>

      <div class="flex justify-between gap-2 sm:gap-4 max-w-5xl mx-auto relative">
        <div class="text-center cursor-pointer p-2 rounded-lg flex flex-col w-full h-full">
          <h3 class="mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Палубная доска</h3>
          <img
            title="Палубная доска"
            src="../assets/images/paluba.jpg"
            alt="Палубная доска"
            class="rounded-lg shadow-md object-cover w-full max-w-[120px] sm:max-w-[150px] lg:max-w-[180px] mx-auto"
          />
        </div>

        <div class="text-center cursor-pointer p-2 rounded-lg flex flex-col w-full h-full">
          <h3 class="mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Венгерская елка</h3>
          <img
            title="Венгерская елка"
            src="../assets/images/ven.jpg"
            alt="Венгерская елка"
            class="rounded-lg shadow-md object-cover w-full max-w-[120px] sm:max-w-[150px] lg:max-w-[180px] mx-auto"
          />
        </div>

        <div class="text-center cursor-pointer p-2 rounded-lg flex flex-col w-full h-full">
          <h3 class="mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Французская елка</h3>
          <img
            title="Французская елка"
            src="../assets/images/fr.jpg"
            alt="Французская елка"
            class="rounded-lg shadow-md object-cover w-full max-w-[120px] sm:max-w-[150px] lg:max-w-[180px] mx-auto"
          />
        </div>
      </div>
    </section>

    <section class="bg-white min-h-screen py-10">
      <div class="px-4 grid grid-cols-1 gap-6 max-w-7xl mx-auto">
        <DeskCard v-for="(item, idx) in items" :key="idx" :item="item" />
      </div>
    </section>

    <TheChouse />
  </div>
</template>

<script setup>
import DeskCard from '@/components/DeskCard.vue'
import TheChouse from '@/components/TheChouse.vue'
import { ref, computed, watch } from 'vue'

const items = ref([
  {
    title: 'Дуб Аляска',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/1_palub_Alaska.webp',
    },
  },
  {
    title: 'Дуб Антик',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/2_palub_Antik.webp',
    },
  },
  {
    title: 'Дуб Балтик',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/3_palub_Baltik.webp',
    },
  },
  {
    title: 'Дуб Барин',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/4_palub_Barni.webp',
    },
  },
  {
    title: 'Дуб Болтон',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/5_palub_Bolton.webp',
    },
  },
  {
    title: 'Дуб Копченый',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/6_palub_Kopcheniy.webp',
    },
  },
  {
    title: 'Дуб Корица',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/7_palub_Koritsa.webp',
    },
  },
  {
    title: 'Дуб Маренго',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/8_palub_Marengo.webp',
    },
  },
  {
    title: 'Дуб Медный',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/9_palub_Medniy.webp',
    },
  },
  {
    title: 'Дуб Меркурий',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/10_palub_Merkuriy.webp',
    },
  },
  {
    title: 'Дуб Миндаль',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/11_palub_Mindal.webp',
    },
  },
  {
    title: 'Дуб Мокка',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/12_palub_Mokka.webp',
    },
  },
  {
    title: 'Дуб Натуральный',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/13_palub_Naturalniy.webp',
    },
  },
  {
    title: 'Дуб Нежный Песок',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/14_palub_NezhniyPesok.webp',
    },
  },
  {
    title: 'Дуб Орех',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/15_palub_Orekh.webp',
    },
  },
  {
    title: 'Дуб Сатин',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/16_palub_Satin.webp',
    },
  },
  {
    title: 'Дуб Табак',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/17_palub_Tabak.webp',
    },
  },
  {
    title: 'Дуб Темный Шоколад',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/18_palub_TemniyShokolad.webp',
    },
  },
  {
    title: 'Дуб Шелк',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/palub/19_palub_Shelk.webp',
    },
  },
  {
    title: 'Дуб Бурбон',
    content: {
      text: 'Французская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/1_fr_Burbon.webp',
    },
  },
  {
    title: 'Дуб Домино',
    content: {
      text: 'Французская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/2_fr_Domino.webp',
    },
  },
  {
    title: 'Дуб Дымчатый',
    content: {
      text: 'Французская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/3_fr_Dymchatyi.webp',
    },
  },
  {
    title: 'Дуб Карамель',
    content: {
      text: 'Французская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/4_fr_Karamel.webp',
    },
  },
  {
    title: 'Дуб Мичиган',
    content: {
      text: 'Французская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/5_fr_Michigan.webp',
    },
  },
  {
    title: 'Дуб Рома',
    content: {
      text: 'Французская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/6_fr_Roma.webp',
    },
  },
  {
    title: 'Дуб Тавор',
    content: {
      text: 'Французская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/7_fr_Tavor.webp',
    },
  },
  {
    title: 'Дуб Экстра Грей',
    content: {
      text: 'Французская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/8_fr_ExtraGreiy.webp',
    },
  },
  {
    title: 'Дуб Экстра Лава',
    content: {
      text: 'Французская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/fr/9_fr_ExtraLava.webp',
    },
  },
  {
    title: 'Дуб Арава',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/1_vengr_Arava.webp',
    },
  },
  {
    title: 'Дуб Блек Винтаж',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/2_vengr_BlackVintage.webp',
    },
  },
  {
    title: 'Дуб Дерби',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/3_vengr_Derbi.webp',
    },
  },
  {
    title: 'Дуб Колониал',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/4_vengr_Kolonial.webp',
    },
  },
  {
    title: 'Дуб Корсика',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/5_vengr_Korsika.webp',
    },
  },
  {
    title: 'Дуб Лайвори',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/6_vengr_Layvori.webp',
    },
  },
  {
    title: 'Дуб Морган',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/7_vengr_Morgan.webp',
    },
  },
  {
    title: 'Дуб Опера',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/8_vengr_Opera.webp',
    },
  },
  {
    title: 'Дуб Платина',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/9_vengr_Platina.webp',
    },
  },
  {
    title: 'Дуб Прованс',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/10_vengr_Provans.webp',
    },
  },
  {
    title: 'Дуб Ретро',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/11_vengr_Retro.webp',
    },
  },
  {
    title: 'Дуб Рок',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/12_vengr_Rok.webp',
    },
  },
  {
    title: 'Дуб Серый Винтаж',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/13_vengr_SeriyVintage.webp',
    },
  },
  {
    title: 'Дуб Техас',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/14_vengr_Texas.webp',
    },
  },
  {
    title: 'Дуб Урбан Грей',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/15_vengr_UrbanGreiy.webp',
    },
  },
  {
    title: 'Дуб Фредди',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/16_vengr_Fredi.webp',
    },
  },
  {
    title: 'Дуб Шамплен',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/17_vengr_Shamplen.webp',
    },
  },
  {
    title: 'Дуб Экстра Белый',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/18_vengr_ExtraBelyi.webp',
    },
  },
  {
    title: 'Дуб Экстра Роза',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/19_vengr_ExtraRoza.webp',
    },
  },
  {
    title: 'Дуб Шале',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--e1aybc.xn--80aeg0cij.xn--p1ai/img/vengr/20_vengr_Shale.webp',
    },
  },
])
</script>

<style scoped>
@layer utilities {
  @media (max-width: 460px) {
    .cols-3 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
}
</style>
