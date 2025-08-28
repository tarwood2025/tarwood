<template>
  <div>
    <section class="bg-[#F5F1EB] py-10 md:py-18 px-4">
      <div class="mx-auto text-center space-y-4 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Уход и эксплуатация</h2>
        <p class="text-sm sm:text-base">
          Грамотный уход за паркетной доской позволит сохранить эстетичный внешний вид <br />
          и существенно увеличить срок эксплуатации покрытия
        </p>
      </div>
    </section>

    <section>
      <div class="text-center max-w-7xl mx-auto py-10 md:py-20 px-4">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Общие рекомендации по уходу</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="shadow-sm rounded-lg mt-8" v-for="(item, idx) in menu" :key="idx">
            <div>
              <div class="bg-[#F5F1EB] flex items-center gap-4 py-4 px-4 rounded-lg rounded-b-none">
                <div class="bg-tar-green rounded-lg p-2">
                  <img
                    :src="item.icon"
                    class="w-6 h-6 flex items-center justify-center"
                    alt="img"
                  />
                </div>
                <h3 class="font-semibold text-[#4A4A4A]">{{ item.title }}</h3>
              </div>
            </div>

            <div class="text-start py-4 px-4">
              <ul>
                <li v-for="(text, i) in item.desc" :key="i" class="flex gap-2 items-baseline mb-2">
                  <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
                  <p>{{ text }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#FAF7F5]">
      <div class="max-w-7xl mx-auto py-10 md:py-10 px-4">
        <div class="shadow-lg rounded-xl">
          <div
            class="flex items-center justify-center gap-4 bg-gradient-to-tr from-[#FB2C36] to-[#FF6900] rounded-lg rounded-b-none p-4"
          >
            <img
              src="/tarwood/src/assets/images/warning.svg"
              alt="warning"
              width="24"
              height="24"
            />
            <h2 class="font-semibold text-white text-2xl">Обратите внимание</h2>
          </div>

          <div
            class="bg-white py-4 pt-0 px-6 rounded-lg rounded-t-none text-tar-secondary text-center"
          >
            <h3 class="py-6 text-xl">Никогда не используйте для очистки следующие средства:</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4">
              <div
                v-for="(text, index) in menu2"
                :key="index"
                class="flex items-center gap-4 rounded-lg py-2 px-4 border border-[#FFC9C9] bg-[#FEF2F2]"
              >
                <img src="/tarwood/src/assets/images/x.svg" alt="img" />
                <p>{{ text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="text-center max-w-7xl mx-auto py-10 md:py-12 px-4">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Оптимальные условия эксплуатации
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(item, id) in menu3"
            :key="id"
            class="flex flex-col items-center gap-4 mt-8 shadow-md rounded-2xl py-2"
          >
            <div :class="`rounded-full max-w-max p-4 bg-${item.color}`">
              <img :src="item.icon" alt="cloud" />
            </div>
            <h3>{{ item.title }}</h3>
            <p :class="`font-bold text-${item.color}`">{{ item.temp }}</p>
          </div>
        </div>
      </div>
    </section>

    <TheChouse />
  </div>
</template>

<script setup lang="ts">
import TheChouse from '@/components/TheChouse.vue'

const menu = [
  {
    title: 'Защита от мебели',
    desc: [
      'Используйте для ножек мебели мягкие набойки из войлока или фетра',
      'При перемещении тяжелой мебели подкладывайте коврики лицевой стороной вниз',
      'Используйте другие средства на мягкой основе для защиты покрытия',
    ],
    icon: '/tarwood/src/assets/images/1.svg',
  },
  {
    title: 'Правильная обувь',
    desc: [
      'Используйте только мягкую и безопасную для покрытия обувь',
      'Ни в коем случае не ходите на высоких каблуках (шпильках)',
      'Используйте коврики в местах интенсивного использования (прихожая, кухня)',
      'Избегайте обуви с металлическими набойками',
    ],
    icon: '/tarwood/src/assets/images/2.svg',
  },
  {
    title: 'Домашние животные',
    desc: [
      'Следите за тем, чтобы когти у домашних животных были аккуратно подстрижены',
      'Регулярно мойте лапы животных, убирайте следы грязи и песка',
    ],
    icon: '/tarwood/src/assets/images/3.svg',
  },
  {
    title: 'Защита от солнца',
    desc: [
      'Под воздействием солнечных лучей оттенок паркетной доски со временем может слегка измениться',
      'Периодически перемещайте мебель и ковры для равномерного изменения цвета',
      'Используйте защитные шторы или жалюзи в солнечные дни',
    ],
    icon: '/tarwood/src/assets/images/4.svg',
  },
  {
    title: 'Температурно-влажностный режим',
    desc: [
      'Поддерживайте влажность воздуха 40-60%',
      'Поддерживайте температуру воздуха 18-22°C',
      'В отопительный сезон используйте увлажнитель воздуха',
      'Летом используйте кондиционер или осушитель при повышенной влажности',
    ],
    icon: '/tarwood/src/assets/images/5.svg',
  },
  {
    title: 'Правильная уборка',
    desc: [
      'Используйте только мягкую и безопасную для покрытия обувь',
      'Ни в коем случае не ходите на высоких каблуках (шпильках)',
      'Используйте коврики в местах интенсивного использования (прихожая, кухня)',
      'Избегайте обуви с металлическими набойками',
    ],
    icon: '/tarwood/src/assets/images/6.svg',
  },
  {
    title: 'Ежедневный уход',
    desc: [
      'Постоянно очищайте пол от грязи, пыли и песка с помощью пылесоса или мягкой щетки',
      'Регулярно очищайте коврики, под которыми скапливается пыль и грязь',
      'Убедитесь, что насадка пылесоса не повредит покрытие',
    ],
    icon: '/tarwood/src/assets/images/7.svg',
  },
  {
    title: 'Правильная уборка',
    desc: [
      'При попадании воды, вина, кофе, спирта, масла немедленно удалите их',
      'Используйте чистую воду, тряпку и рекомендованные средства по уходу',
      'Особенно опасны маслянистые жидкости (растительное масло, животные жиры)',
    ],
    icon: '/tarwood/src/assets/images/8.svg',
  },
]

const menu2 = [
  'Моющие средства для посуды',
  'Разбавители и растворители',
  'Спирт и бензин',
  'Обычные средства для пола',
]

const menu3 = [
  {
    title: 'Влажность',
    temp: '40-60%',
    icon: '/tarwood/src/assets/images/cloud.svg',
    color: '[#3A6757]',
  },
  {
    title: 'Температура',
    temp: '18-22°C',
    icon: '/tarwood/src/assets/images/cloud.svg',
    color: '[#6A8C5D]',
  },
  {
    title: 'Теплый пол',
    temp: '≤27°C',
    icon: '/tarwood/src/assets/images/lightning.svg',
    color: '[#D88B3B]',
  },
]
</script>
