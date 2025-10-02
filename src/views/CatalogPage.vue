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

      <div class="grid gap-2 grid-cols-3 max-w-5xl mx-auto">
        <div
          @click="() => (activeFilter = 'Палубная доска')"
          class="text-center cursor-pointer hover:shadow-lg p-4 rounded-lg flex flex-col max-w-max"
          :class="activeFilter === 'Палубная доска' ? 'bg-tar-secondary/30 text-white' : ''"
        >
          <h3 class="mb-2 text-sm font-medium">Палубная доска</h3>
          <img
            title="Палубная доска"
            src="../assets/images/paluba.jpg"
            alt="Палубная доска"
            class="rounded-lg shadow-md object-cover max-w-52"
          />
        </div>

        <div
          @click="() => (activeFilter = 'Венгерская елка')"
          class="text-center cursor-pointer hover:shadow-md p-4 rounded-lg flex flex-col max-w-max"
          :class="activeFilter === 'Венгерская елка' ? 'bg-tar-secondary/30 text-white' : ''"
        >
          <h3 class="mb-2 text-sm font-medium">Венгерская елка</h3>
          <img
            title="Венгерская елка"
            src="../assets/images/ven.jpg"
            alt="Венгерская елка"
            class="rounded-lg shadow-md object-cover max-w-52"
          />
        </div>

        <div
          @click="() => (activeFilter = 'Французская елка')"
          class="text-center cursor-pointer hover:shadow-md p-4 rounded-lg flex flex-col max-w-max"
          :class="activeFilter === 'Французская елка' ? 'bg-tar-secondary/30 text-white' : ''"
        >
          <h3 class="mb-2 text-sm font-medium">Французская елка</h3>
          <img
            title="Французская елка"
            src="../assets/images/fr.jpg"
            alt="Французская елка"
            class="rounded-lg shadow-md object-cover max-w-52"
          />
        </div>
      </div>
    </section>

    <section>
      <div class="p-6 max-w-7xl text-center mx-auto">
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

const activeFilter = ref('Все')

const items = ref([
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/1_palub_Baltic_s.jpg',
    type: 'Палубная доска',
    id: 'dub-baltik-palubnaya-doska',
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/2_palub_Barni_s.jpg',
    type: 'Палубная доска',
    id: 'dub-barni-palubnaya-doska',
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/3_palub_Bronze_s.jpg',
    type: 'Палубная доска',
    id: 'dub-bronza-palubnaya-doska',
  },
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/4_palub_Burbon_s.jpg',
    type: 'Палубная доска',
    id: 'dub-burbon-palubnaya-doska',
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/5_palub_Canela_s.jpg',
    type: 'Палубная доска',
    id: 'dub-korica-palubnaya-doska',
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/6_palub_Colonial_s.jpg',
    type: 'Палубная доска',
    id: 'dub-kolonial-palubnaya-doska',
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/7_palub_Copper_s.jpg',
    type: 'Палубная доска',
    id: 'dub-mednyy-palubnaya-doska',
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/8_palub_Corsica_s.jpg',
    type: 'Палубная доска',
    id: 'dub-korsika-palubnaya-doska',
  },
  {
    title: 'Дуб Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/9_palub_Grey_Vintage_s.jpg',
    type: 'Палубная доска',
    id: 'dub-seryy-vintazh-palubnaya-doska',
  },
  {
    title: 'Дуб Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/10_palub_Ivory_s.jpg',
    type: 'Палубная доска',
    id: 'dub-slonovaya-kost-palubnaya-doska',
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/11_palub_Mendal_s.jpg',
    type: 'Палубная доска',
    id: 'dub-mindal-palubnaya-doska',
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/12_palub_Mercury_s.jpg',
    type: 'Палубная доска',
    id: 'dub-merkuriy-palubnaya-doska',
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/13_palub_Old_s.jpg',
    type: 'Палубная доска',
    id: 'dub-staryy-palubnaya-doska',
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/14_palub_Opera_s.jpg',
    type: 'Палубная доска',
    id: 'dub-opera-palubnaya-doska',
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/15_palub_Origial_s.jpg',
    type: 'Палубная доска',
    id: 'dub-originalnyy-palubnaya-doska',
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/16_palub_Pepel_s.jpg',
    type: 'Палубная доска',
    id: 'dub-pepel-palubnaya-doska',
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/17_palub_Perl_s.jpg',
    type: 'Палубная доска',
    id: 'dub-zhemchug-palubnaya-doska',
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/18_palub_Provence_s.jpg',
    type: 'Палубная доска',
    id: 'dub-provans-palubnaya-doska',
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/19_palub_Satin_s.jpg',
    type: 'Палубная доска',
    id: 'dub-satin-palubnaya-doska',
  },
  {
    title: 'Дуб Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/20_palub_Silk_s.jpg',
    type: 'Палубная доска',
    id: 'dub-shelk-palubnaya-doska',
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/21_palub_Smoked_s.jpg',
    type: 'Палубная доска',
    id: 'dub-kopchenyy-palubnaya-doska',
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/22_palub_Smoky_s.jpg',
    type: 'Палубная доска',
    id: 'dub-dymchatyy-palubnaya-doska',
  },
  {
    title: 'Дуб Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/23_palub_Soft_Sand_s.jpg',
    type: 'Палубная доска',
    id: 'dub-nezhnyy-pesok-palubnaya-doska',
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/paluba/24_palub_Walnut_s.jpg',
    type: 'Палубная доска',
    id: 'dub-orekh-palubnaya-doska',
  },

  // 🔽 дальше идут "Венгерская елка" (25–48)
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/1_vengr_Baltic_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-baltik-vengerskaya-elka',
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/2_vengr_Barni_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-barni-vengerskaya-elka',
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/3_vengr_Bronze_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-bronza-vengerskaya-elka',
  },
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/4_vengr_Burbon_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-burbon-vengerskaya-elka',
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/5_vengr_Canela_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-korica-vengerskaya-elka',
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/6_vengr_Colonial_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-kolonial-vengerskaya-elka',
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/7_vengr_Coppe_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-mednyy-vengerskaya-elka',
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/8_vengr_Corsica_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-korsika-vengerskaya-elka',
  },
  {
    title: 'Дуб Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/9_vengr_Grey_Vintage_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-seryy-vintazh-vengerskaya-elka',
  },
  {
    title: 'Дуб Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/10_vengr_Ivory_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-slonovaya-kost-vengerskaya-elka',
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/11_vengr_Mendal_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-mindal-vengerskaya-elka',
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/12_vengr_Mercury_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-merkuriy-vengerskaya-elka',
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/13_vengr_Old_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-staryy-vengerskaya-elka',
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/14_vengr_Opera_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-opera-vengerskaya-elka',
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/15_vengr_Origial_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-originalnyy-vengerskaya-elka',
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/16_vengr_Pepel_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-pepel-vengerskaya-elka',
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/17_vengr_Perl_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-zhemchug-vengerskaya-elka',
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/18_vengr_Provence_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-provans-vengerskaya-elka',
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/19_vengr_Satin_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-satin-vengerskaya-elka',
  },
  {
    title: 'Дуб Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/20_vengr_Silk_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-shelk-vengerskaya-elka',
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/21_vengr_Smoked_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-kopchenyy-vengerskaya-elka',
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/22_vengr_Smoky_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-dymchatyy-vengerskaya-elka',
  },
  {
    title: 'Дуб Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/23_vengr_Soft_Sand_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-nezhnyy-pesok-vengerskaya-elka',
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/vengr-elka/24_vengr_Walnut_s.jpg',
    type: 'Венгерская елка',
    id: 'dub-orekh-vengerskaya-elka',
  },

  // 🔽 дальше идут "Французская елка" (49–72)
  {
    title: 'Дуб Балтик',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/1_fr_Baltic_s.jpg',
    type: 'Французская елка',
    id: 'dub-baltik-francuzskaya-elka',
  },
  {
    title: 'Дуб Барни',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/2_fr_Barni_s.jpg',
    type: 'Французская елка',
    id: 'dub-barni-francuzskaya-elka',
  },
  {
    title: 'Дуб Бронза',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/3_fr_Bronze_s.jpg',
    type: 'Французская елка',
    id: 'dub-bronza-francuzskaya-elka',
  },
  {
    title: 'Дуб Бурбон',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/4_fr_Burbon_s.jpg',
    type: 'Французская елка',
    id: 'dub-burbon-francuzskaya-elka',
  },
  {
    title: 'Дуб Корица',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/5_fr_Canela_s.jpg',
    type: 'Французская елка',
    id: 'dub-korica-francuzskaya-elka',
  },
  {
    title: 'Дуб Колониал',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/6_fr_Colonial_s.jpg',
    type: 'Французская елка',
    id: 'dub-kolonial-francuzskaya-elka',
  },
  {
    title: 'Дуб Медный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/7_fr_Copper_s.jpg',
    type: 'Французская елка',
    id: 'dub-mednyy-francuzskaya-elka',
  },
  {
    title: 'Дуб Корсика',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/8_fr_Corsica_s.jpg',
    type: 'Французская елка',
    id: 'dub-korsika-francuzskaya-elka',
  },
  {
    title: 'Дуб Серый винтаж',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/9_fr_Grey_Vintage_s.jpg',
    type: 'Французская елка',
    id: 'dub-seryy-vintazh-francuzskaya-elka',
  },
  {
    title: 'Дуб Слоновая кость',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/10_fr_Ivory_s.jpg',
    type: 'Французская елка',
    id: 'dub-slonovaya-kost-francuzskaya-elka',
  },
  {
    title: 'Дуб Миндаль',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/11_fr_Mendal_s.jpg',
    type: 'Французская елка',
    id: 'dub-mindal-francuzskaya-elka',
  },
  {
    title: 'Дуб Меркурий',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/12_fr_Mercury_s.jpg',
    type: 'Французская елка',
    id: 'dub-merkuriy-francuzskaya-elka',
  },
  {
    title: 'Дуб Старый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/13_fr_Old_s.jpg',
    type: 'Французская елка',
    id: 'dub-staryy-francuzskaya-elka',
  },
  {
    title: 'Дуб Опера',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/14_fr_Opera_s.jpg',
    type: 'Французская елка',
    id: 'dub-opera-francuzskaya-elka',
  },
  {
    title: 'Дуб Оригинальный',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/15_fr_Origial_s.jpg',
    type: 'Французская елка',
    id: 'dub-originalnyy-francuzskaya-elka',
  },
  {
    title: 'Дуб Пепел',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/16_fr_Pepel_s.jpg',
    type: 'Французская елка',
    id: 'dub-pepel-francuzskaya-elka',
  },
  {
    title: 'Дуб Жемчуг',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/17_fr_Perl_s.jpg',
    type: 'Французская елка',
    id: 'dub-zhemchug-francuzskaya-elka',
  },
  {
    title: 'Дуб Прованс',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/18_fr_Provence_s.jpg',
    type: 'Французская елка',
    id: 'dub-provans-francuzskaya-elka',
  },
  {
    title: 'Дуб Сатин',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/19_fr_Satin_s.jpg',
    type: 'Французская елка',
    id: 'dub-satin-francuzskaya-elka',
  },
  {
    title: 'Дуб Шёлк',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/20_fr_Silk_s.jpg',
    type: 'Французская елка',
    id: 'dub-shelk-francuzskaya-elka',
  },
  {
    title: 'Дуб Копченый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/21_fr_Smoked_s.jpg',
    type: 'Французская елка',
    id: 'dub-kopchenyy-francuzskaya-elka',
  },
  {
    title: 'Дуб Дымчатый',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/22_fr_Smoky_s.jpg',
    type: 'Французская елка',
    id: 'dub-dymchatyy-francuzskaya-elka',
  },
  {
    title: 'Дуб Нежный песок',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/23_fr_Soft_Sand_s.jpg',
    type: 'Французская елка',
    id: 'dub-nezhnyy-pesok-francuzskaya-elka',
  },
  {
    title: 'Дуб Орех',
    img: 'https://xn--80aeg0cij.xn--p1ai/tarwood/new/fr-elka/24_fr_Walnut_s.jpg',
    type: 'Французская елка',
    id: 'dub-orekh-francuzskaya-elka',
  },
])

const filteredItems = computed(() => {
  if (activeFilter.value === 'Все') return items.value
  return items.value.filter((i) => i.type === activeFilter.value)
})

function openCard(item) {
  router.push({ name: 'porductCard', params: { slug: item.id } })
}
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
