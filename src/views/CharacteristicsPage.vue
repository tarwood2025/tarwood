<template>
  <div>
    <section class="bg-[#F5F1EB] py-10 md:py-18 px-4">
      <div class="mx-auto text-center space-y-4 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Технические характеристики</h2>
        <p class="text-sm sm:text-base">
          Подробные технические параметры и размеры нашей продукции. Выбирайте подходящий сорт и
          размеры для вашего проекта
        </p>
      </div>
    </section>

    <section class="bg-white">
      <div class="max-w-7xl mx-auto py-10 md:py-12 px-4">
        <div class="relative w-full max-w-3xl mx-auto bg-gray-100 rounded-full p-1 flex">
          <!-- Ползунок -->
          <div
            class="absolute top-1 bottom-1 ml-1 bg-white rounded-full shadow-md transition-all duration-300"
            :style="{
              left: `${activeIndex * (100 / tabs.length)}%`,
              width: `${97 / tabs.length}%`,
            }"
          ></div>

          <!-- Кнопки -->
          <button
            v-for="(tab, index) in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="relative flex-1 text-center z-10 py-2 text-sm font-medium transition-colors duration-300"
            :class="activeTab === tab.key ? 'text-gray-900' : 'text-gray-500'"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Контент -->
        <div class="mt-6">
          <Transition name="fade" mode="out-in">
            <div v-if="activeTab === 'wood'" class="text-center">
              <h2 class="text-2xl font-semibold mb-4">Сорта паркетной доски</h2>
              <p>Для заказа доступны 3 сорта паркетной доски — селект, натур и рустик</p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div v-for="item in menuItem" class="rounded-lg shadow-lg">
                  <div class="relative overflow-hidden rounded-t-lg group">
                    <img
                      :src="item.img"
                      alt="img"
                      class="w-full h-full max-h-40 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <h3 class="absolute z-20 bottom-2 left-2 text-white font-semibold">
                      {{ item.title }}
                    </h3>
                    <div class="absolute top-0 left-0 w-full h-full bg-black/20 rounded-t-lg"></div>
                  </div>

                  <div class="p-4 text-start flex flex-col gap-2">
                    <ul class="py-2">
                      <h3 class="text-lg font-semibold mb-1">Допускается:</h3>
                      <li v-for="li in item.ul" :key="li" class="flex gap-2 items-baseline mb-2">
                        <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
                        <p class="text-sm">{{ li }}</p>
                      </li>
                    </ul>

                    <ul class="py-2">
                      <h3 class="text-lg font-semibold mb-1">Не допускается:</h3>
                      <li v-for="li in item.ul2" :key="li" class="flex gap-2 items-baseline mb-2">
                        <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-[#830901] mr-2" />
                        <p class="text-sm">{{ li }}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'defects'">
              <div class="text-center">
                <h2 class="text-2xl font-semibold mb-4">Допустимые параметры пороков по сортам</h2>
                <p>Подробная таблица допустимых дефектов для каждого сорта древесины</p>
              </div>

              <TheTable />
            </div>

            <div v-else-if="activeTab === 'sizes'">
              <div class="text-center mb-4">
                <h2 class="text-2xl font-semibold mb-4">Размеры и технические параметры</h2>
                <p>
                  Основные параметры однополосной двухслойной паркетной
                  <br class="hidden sm:block" />
                  доски и специальных конфигураций
                </p>
              </div>

              <div
                class="mx-auto space-y-1 max-w-7xl bg-[#EFF6FF] border text-blue-700 rounded-lg border-[#BEDBFF] py-2 px-4"
              >
                <h3 class="text-2xl sm:text-3xl md:text-xl font-semibold">Внимание!</h3>
                <ul>
                  <li class="flex gap-2 items-baseline mb-2">
                    <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
                    <p class="text-sm">Все размеры в таблицах указаны в миллиметрах</p>
                  </li>
                  <li class="flex gap-2 items-baseline mb-2">
                    <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-blue-700 mr-2" />
                    <p class="text-sm">
                      Символ ± обозначает допустимое отклонение от номинального размера
                    </p>
                  </li>
                </ul>
              </div>

              <div class="rounded-lg shadow-lg mt-6">
                <h3
                  class="text-2xl sm:text-3xl md:text-xl font-semibold px-4 py-2 rounded-t-2xl bg-[#F5F1EB]"
                >
                  Инженерная двухслойная доска
                </h3>

                <TheTable2 />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="item in chItems" class="rounded-lg shadow-lg mt-6">
                  <h3
                    class="text-2xl sm:text-3xl md:text-xl font-semibold px-4 py-2 rounded-t-2xl bg-[#F5F1EB]"
                  >
                    {{ item.title }}
                  </h3>

                  <TheXCard :desk="item" />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <TheChouse />
  </div>
</template>

<script setup lang="ts">
import TheChouse from '@/components/TheChouse.vue'
import TheTable from '../components/TheTable.vue'
import { ref, computed, Transition } from 'vue'
import TheTable2 from '@/components/TheTable2.vue'
import TheXCard from '@/components/TheXCard.vue'
import ch1 from '@/assets/images/ch1.png'
import ch2 from '@/assets/images/ch2.png'

import p1 from '@/assets/images/selekt_p.jpg'
import p2 from '@/assets/images/natur_p.jpg'
import p3 from '@/assets/images/rustik_p.jpg'

const tabs = [
  { key: 'wood', label: 'Сорта древесины' },
  { key: 'defects', label: 'Параметры пороков' },
  { key: 'sizes', label: 'Размеры и параметры' },
]

const activeTab = ref('wood')

const menuItem = [
  {
    title: 'СЕЛЕКТ',
    ul: [
      'Здоровые сучки, расколотые, частично отреставрированные, в том числе частично сросшиеся. Допускаются от Ø до 10 мм',
      'Заболонь допускается до 10% от площади планки',
    ],
    ul2: [
      'Полностью отреставрированные сучки (зашпаклеванные)',
      'Трещины пластевые, кромочные и торцовочные',
      'Заболонь (исключение: использование укрывистых цветов на отделке)',
      'Желтизна (пятна и полосы), приобретенная химической окраской',
      'Синева (глубокая)',
      'Червоточина',
      'Гниль',
      'Непрофрезеровка (непрострог)',
    ],
    img: p1,
  },
  {
    title: 'НАТУР',
    ul: [
      'Здоровые сучки, расколотые, частично отреставрированные, в том числе частично сросшиеся. Допускаются от Ø до 18 мм, без ограничений по количеству',
      'Полностью отреставрированные сучки (зашпаклеванные), допускаются от Ø до 13 мм, без ограничений по количеству',
      'Трещины пластевые, кромочные и торцовочные шириной до 0,5 мм, длиной до 30 мм',
      'Заболонь допускается до 20% от площади планки',
      'Червоточина допускается до 9 шт. на 1 м.п. диаметром не более 3 мм',
      'Вырыв, единичные механические повреждения на пластине до 0,3 мм',
      'Единичные механические повреждения, отщеп, скол, вмятина на кромках и торцах единичные шириной до 2 мм и глубиной до 1,0 мм',
    ],
    ul2: [
      'Желтизна (пятна и полосы), приобретённая химическая окраска',
      'Синева (глубокая)',
      'Гниль',
      'Непрофрезеровка (непрострог)',
    ],
    img: p2,
  },
  {
    title: 'РУСТИК',
    ul: [
      'Здоровые сучки, расколотые, частично отреставрированные, в том числе частично сросшиеся. Допускаются от Ø до 50 мм, без ограничений по количеству',
      'Полностью отреставрированные сучки (зашпаклеванные). Допускаются от Ø до 35 мм, без ограничений по количеству',
      'Трещины пластевые, кромочные и торцовочные допускаются отреставрированные шириной до 5 мм, длиной до 30% длины планки, без ограничений',
      'Заболонь (без ограничений)',
      'Червоточина допускается до 10 шт. диаметром не более 3 мм на 40 см длины',
      'Вырыв, единичные механические повреждения на пласти до 1,5 мм',
      'Единичные механические повреждения, отщеп, скол, вмятина на кромках и торцах шириной до 3 мм и глубиной до 1,5 мм',
    ],
    ul2: [
      'Желтизна (пятна и полосы), приобретённая химическая окраска не допускается',
      'Синева (глубокая)',
      'Гниль',
      'Непрофрезеровка (непрострог)',
    ],
    img: p3,
  },
]

const chItems = [
  {
    img: ch1,
    title: 'Венгерская ёлка',
  },
  {
    img: ch2,
    title: 'Французская ёлка',
    franc: true,
  },
]

// индекс текущего таба
const activeIndex = computed(() => tabs.findIndex((t) => t.key === activeTab.value))
</script>
