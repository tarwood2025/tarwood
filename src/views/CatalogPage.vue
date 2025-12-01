<template>
  <div>
    <section class="bg-[#F5F1EB] py-6 md:py-8 px-4">
      <div class="mx-auto text-center space-y-4 mb-6 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Каталог продукции</h2>
        <p class="text-sm sm:text-base">
          Широкий выбор инженерной доски из различных пород древесины <br />
          Каждый продукт сочетает в себе красоту, качество и долговечность <br />
          <span class="font-semibold">Ниже приведены примеры укладок</span>
        </p>
      </div>

      <div class="flex justify-between mb-4 gap-2 sm:gap-4 max-w-5xl mx-auto relative">
        <div class="text-center p-2 rounded-lg flex flex-col w-full h-full">
          <h3 class="mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Палубная доска</h3>
          <img
            title="Палубная доска"
            src="../assets/images/paluba.jpg"
            alt="Палубная доска"
            class="rounded-lg shadow-md object-cover w-full max-w-[120px] sm:max-w-[150px] lg:max-w-[180px] mx-auto"
          />
        </div>

        <div class="text-center p-2 rounded-lg flex flex-col w-full h-full">
          <h3 class="mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Венгерская елка</h3>
          <img
            title="Венгерская елка"
            src="../assets/images/ven.jpg"
            alt="Венгерская елка"
            class="rounded-lg shadow-md object-cover w-full max-w-[120px] sm:max-w-[150px] lg:max-w-[180px] mx-auto"
          />
        </div>

        <div class="text-center p-2 rounded-lg flex flex-col w-full h-full">
          <h3 class="mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Французская елка</h3>
          <img
            title="Французская елка"
            src="../assets/images/fr.jpg"
            alt="Французская елка"
            class="rounded-lg shadow-md object-cover w-full max-w-[120px] sm:max-w-[150px] lg:max-w-[180px] mx-auto"
          />
        </div>
      </div>

      <div class="text-center">
        <a
          href="https://disk.yandex.ru/d/ALq43jUURlfuMA"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full"
        >
          <TButton>
            Смотреть каталог
            <img src="../assets/images/download.svg" alt="download" class="inline ml-2" />
          </TButton>
        </a>
      </div>
    </section>

    <section class="bg-white min-h-screen py-10">
      <div
        class="px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
      >
        <DeskCardDesktop
          @click="$router.push(`/product/${item.route}`)"
          v-for="(item, idx) in items"
          :key="idx"
          :item="item"
          class="cursor-pointer"
        />
      </div>
    </section>

    <TheChouse />
  </div>
</template>

<script setup>
import DeskCard from '@/components/DeskCard.vue'
import DeskCardDesktop from '@/components/DeskCardDesktop.vue'
import TheChouse from '@/components/TheChouse.vue'
import TButton from '@/ui/TButton.vue'
import { ref, computed, watch } from 'vue'

const items = ref([
  {
    title: 'Дуб Аляска',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/1_palub_Alaska.webp',
    },
    route: 'dub-alyaska-palubnaya-doska',
  },
  {
    title: 'Дуб Бронза',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/2_palub_Antik.webp',
    },
    route: 'dub-bronza-palubnaya-doska',
  },
  {
    title: 'Дуб Балтик',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/3_palub_Baltik.webp',
    },
    route: 'dub-baltik-palubnaya-doska',
  },
  {
    title: 'Дуб Барни',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/4_palub_Barni.webp',
    },
    route: 'dub-barin-palubnaya-doska',
  },
  {
    title: 'Дуб Болтон',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/5_palub_Bolton.webp',
    },
    route: 'dub-bolton-palubnaya-doska',
  },
  {
    title: 'Дуб Копченый',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/6_palub_Kopcheniy.webp',
    },
    route: 'dub-kopcheniy-palubnaya-doska',
  },
  {
    title: 'Дуб Корица',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/7_palub_Koritsa.webp',
    },
    route: 'dub-koritsa-palubnaya-doska',
  },
  {
    title: 'Дуб Маренго',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/8_palub_Marengo.webp',
    },
    route: 'dub-marengo-palubnaya-doska',
  },
  {
    title: 'Дуб Медный',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/9_palub_Medniy.webp',
    },
    route: 'dub-medniy-palubnaya-doska',
  },
  {
    title: 'Дуб Меркурий',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/10_palub_Merkuriy.webp',
    },
    route: 'dub-merkuriy-palubnaya-doska',
  },
  {
    title: 'Дуб Миндаль',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/11_palub_Mindal.webp',
    },
    route: 'dub-mindal-palubnaya-doska',
  },
  {
    title: 'Дуб Мокка',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/12_palub_Mokka.webp',
    },
    route: 'dub-mokka-palubnaya-doska',
  },
  {
    title: 'Дуб Оригинальный',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/13_palub_Naturalniy.webp',
    },
    route: 'dub-originalniy-palubnaya-doska',
  },
  {
    title: 'Дуб Нежный Песок',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/14_palub_NezhniyPesok.webp',
    },
    route: 'dub-nezhniy-pesok-palubnaya-doska',
  },
  {
    title: 'Дуб Орех',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/15_palub_Orekh.webp',
    },
    route: 'dub-orekh-palubnaya-doska',
  },
  {
    title: 'Дуб Сатин',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/16_palub_Satin.webp',
    },
    route: 'dub-satin-palubnaya-doska',
  },
  {
    title: 'Дуб Табак',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/17_palub_Tabak.webp',
    },
    route: 'dub-tabak-palubnaya-doska',
  },
  {
    title: 'Дуб Темный Шоколад',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/18_palub_TemniyShokolad.webp',
    },
    route: 'dub-temniy-shokolad-palubnaya-doska',
  },
  {
    title: 'Дуб Шелк',
    content: {
      text: 'Палубная доска',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/palub/19_palub_Shelk.webp',
    },
    route: 'dub-shelk-palubnaya-doska',
  },
  {
    title: 'Дуб Бурбон',
    content: {
      text: 'Французская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/1_fr_Burbon.webp',
    },
    route: 'dub-burbon-francuzskaya-elka',
  },
  {
    title: 'Дуб Дымчатый',
    content: {
      text: 'Французская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/3_fr_Dymchatyi.webp',
    },
    route: 'dub-dymchatyi-francuzskaya-elka',
  },
  {
    title: 'Дуб Карамель',
    content: {
      text: 'Французская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/4_fr_Karamel.webp',
    },
    route: 'dub-karamel-francuzskaya-elka',
  },
  {
    title: 'Дуб Мичиган',
    content: {
      text: 'Французская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/5_fr_Michigan.webp',
    },
    route: 'dub-michigan-francuzskaya-elka',
  },
  {
    title: 'Дуб Рома',
    content: {
      text: 'Французская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/6_fr_Roma.webp',
    },
    route: 'dub-roma-francuzskaya-elka',
  },
  {
    title: 'Дуб Тавор',
    content: {
      text: 'Французская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/7_fr_Tavor.webp',
    },
    route: 'dub-tavor-francuzskaya-elka',
  },
  {
    title: 'Дуб Пепел',
    content: {
      text: 'Французская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/8_fr_ExtraGreiy.webp',
    },
    route: 'dub-pepel-greiy-francuzskaya-elka',
  },
  {
    title: 'Дуб Экстра Лава',
    content: {
      text: 'Французская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/fr/9_fr_ExtraLava.webp',
    },
    route: 'dub-ekstra-lava-francuzskaya-elka',
  },
  {
    title: 'Дуб Арава',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/1_vengr_Arava.webp',
    },
    route: 'dub-arava-vengerskaya-elka',
  },
  {
    title: 'Дуб Блек Винтаж',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/2_vengr_BlackVintage.webp',
    },
    route: 'dub-black-vintage-vengerskaya-elka',
  },
  {
    title: 'Дуб Дерби',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/3_vengr_Derbi.webp',
    },
    route: 'dub-derbi-vengerskaya-elka',
  },
  {
    title: 'Дуб Колониал',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/4_vengr_Kolonial.webp',
    },
    route: 'dub-kolonial-vengerskaya-elka',
  },
  {
    title: 'Дуб Корсика',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/5_vengr_Korsika.webp',
    },
    route: 'dub-korsika-vengerskaya-elka',
  },
  {
    title: 'Дуб Лайвори',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/6_vengr_Layvori.webp',
    },
    route: 'dub-layvori-vengerskaya-elka',
  },
  {
    title: 'Дуб Морган',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/7_vengr_Morgan.webp',
    },
    route: 'dub-morgan-vengerskaya-elka',
  },
  {
    title: 'Дуб Опера',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/8_vengr_Opera.webp',
    },
    route: 'dub-opera-vengerskaya-elka',
  },
  {
    title: 'Дуб Прованс',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/10_vengr_Provans.webp',
    },
    route: 'dub-provans-vengerskaya-elka',
  },
  {
    title: 'Дуб Ретро',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/11_vengr_Retro.webp',
    },
    route: 'dub-retro-vengerskaya-elka',
  },
  {
    title: 'Дуб Рок',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/12_vengr_Rok.webp',
    },
    route: 'dub-rok-vengerskaya-elka',
  },
  {
    title: 'Дуб Серый Винтаж',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/13_vengr_SeriyVintage.webp',
    },
    route: 'dub-seriy-vintage-vengerskaya-elka',
  },
  {
    title: 'Дуб Старый',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/15_vengr_UrbanGreiy.webp',
    },
    route: 'dub-stary-vengerskaya-elka',
  },
  {
    title: 'Дуб Фредди',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/16_vengr_Fredi.webp',
    },
    route: 'dub-fredan-vengerskaya-elka',
  },
  {
    title: 'Дуб Шамплен',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/17_vengr_Shamplen.webp',
    },
    route: 'dub-shamplen-vengerskaya-elka',
  },
  {
    title: 'Дуб Жемчуг',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/18_vengr_ExtraBelyi.webp',
    },
    route: 'dub-zhemchug-vengerskaya-elka',
  },
  {
    title: 'Дуб Экстра Роза',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/19_vengr_ExtraRoza.webp',
    },
    route: 'dub-ekstra-roza-vengerskaya-elka',
  },
  {
    title: 'Дуб Шале',
    content: {
      text: 'Венгерская елка',
      img: 'https://xn--80aeg0cij.xn--p1ai/img/vengr/20_vengr_Shale.webp',
    },
    route: 'dub-shale-vengerskaya-elka',
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
