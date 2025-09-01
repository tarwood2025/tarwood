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
                  <div class="rounded-t-lg relative">
                    <img
                      src="../assets/images/unknown.png"
                      alt="img"
                      class="rounded-t-lg object-cover w-full h-full max-h-40"
                    />
                    <h3 class="absolute bottom-2 left-2 text-black font-semibold">
                      {{ item.title }}
                    </h3>
                  </div>

                  <div class="p-4 text-start">
                    <h3 class="mb-4">{{ item.descr }}</h3>

                    <ul>
                      <li v-for="li in item.ul" :key="li" class="flex gap-2 items-baseline mb-2">
                        <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
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

const tabs = [
  { key: 'wood', label: 'Сорта древесины' },
  { key: 'defects', label: 'Параметры пороков' },
  { key: 'sizes', label: 'Размеры и параметры' },
]

const activeTab = ref('wood')

const menuItem = [
  {
    title: 'СЕЛЕКТ',
    descr: 'Премиальный сорт с минимальными дефектами',
    ul: [
      'Здоровые сучки до 10 мм без ограничений по количеству',
      'Полностью отстающиеся сучки не допускаются',
      'Трещины не допускаются',
      'Заболонь до 10% от площади планки',
      'Желтизна пятна и полосы/разноцветная химическая окраска не допускается',
    ],
  },
  {
    title: 'НАТУР',
    descr: 'Сбалансированное сочетание натуральности и эстетики',
    ul: [
      'Здоровые сучки до 18 мм без ограничений по количеству',
      'Отстающиеся сучки до 15 мм без ограничений по количеству',
      'Трещины шириной до 0,5 мм, длиной до 30 мм',
      'Заболонь до 20% от площади планки',
      'Червоточина до 3 шт. на 1 м длины планки диаметром не более 3 мм',
    ],
  },
  {
    title: 'РУСТИК',
    descr: 'Естественная красота с характерными чертами древесины',
    ul: [
      'Живые сучки до 50 мм без ограничений по количеству',
      'Отстающиеся сучки до 35 мм без ограничений по количеству',
      'Трещины пластевые, кромочные и торцовые шириной до 5 мм, длиной до 30% планки без ограничений',
      'Заболонь не ограничивается',
      'Червоточина до 10 шт. диаметром не более 3 мм на 40 см длины планки',
    ],
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
