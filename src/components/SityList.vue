<template>
  <div class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
    <div class="flex items-center gap-3 px-2 pb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
      <h2 class="text-lg font-semibold text-gray-800">Список городов</h2>
    </div>

    <div class="flex flex-col">
      <div v-for="city in cities" :key="city.id" class="border-t border-gray-200 last:border-b-0">
        <button
          @click="toggleCity(city.id)"
          class="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors focus:outline-none"
        >
          <div class="flex items-center gap-4">
            <span class="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            <span class="font-medium text-gray-900">{{ city.name }}</span>
          </div>

          <div class="flex items-center gap-4">
            <span class="text-gray-500 text-sm">
              ({{ city.dealers.length }} {{ pluralizeDealer(city.dealers.length) }})
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400 transition-transform duration-300"
              :class="{ 'rotate-180': activeCityId === city.id }"
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
          </div>
        </button>

        <transition name="expand" @enter="enter" @leave="leave">
          <div v-if="activeCityId === city.id" class="bg-white">
            <div
              v-for="dealer in city.dealers"
              :key="dealer.id"
              @click="selectDealer(dealer)"
              class="p-4 border-t cursor-pointer hover:bg-blue-50"
              :class="{
                'bg-blue-100 ring-2 ring-blue-400':
                  selectedDealer && selectedDealer.id === dealer.id,
              }"
            >
              <p class="font-bold text-md">{{ dealer.name }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ dealer.address }}</p>
              <p class="text-sm text-gray-600">{{ dealer.phone }}</p>
              <p class="text-xs text-gray-500 mt-2">{{ dealer.workingHours }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCityId: null,
      selectedDealer: null,
      // Пример данных. Замените на свои.
      cities: [
        {
          id: 1,
          name: 'Москва',
          dealers: new Array(18).fill({ id: 1, name: 'Дилер', address: 'Адрес' }),
        },
        {
          id: 2,
          name: 'Санкт-Петербург',
          dealers: new Array(4).fill({ id: 1, name: 'Дилер', address: 'Адрес' }),
        },
        {
          id: 3,
          name: 'Екатеринбург',
          dealers: new Array(1).fill({ id: 1, name: 'Дилер', address: 'Адрес' }),
        },
        {
          id: 4,
          name: 'Ростов-на-дону',
          dealers: new Array(3).fill({ id: 1, name: 'Дилер', address: 'Адрес' }),
        },
        {
          id: 5,
          name: 'Новосибирск',
          dealers: new Array(2).fill({ id: 1, name: 'Дилер', address: 'Адрес' }),
        },
        {
          id: 6,
          name: 'Красноярск',
          dealers: new Array(1).fill({ id: 1, name: 'Дилер', address: 'Адрес' }),
        },
      ],
    }
  },
  methods: {
    toggleCity(cityId) {
      this.activeCityId = this.activeCityId === cityId ? null : cityId
    },
    selectDealer(dealer) {
      this.selectedDealer = dealer
      // Здесь может быть ваша логика по выбору дилера
    },
    // Правильное склонение слова "дилер"
    pluralizeDealer(count) {
      const cases = [2, 0, 1, 1, 1, 2]
      const titles = ['дилер', 'дилера', 'дилеров']
      return titles[
        count % 100 > 4 && count % 100 < 20 ? 2 : cases[count % 10 < 5 ? count % 10 : 5]
      ]
    },

    // Методы для анимации (оставьте без изменений)
    enter(el) {
      el.style.height = 'auto'
      const height = getComputedStyle(el).height
      el.style.height = '0'
      getComputedStyle(el)
      setTimeout(() => {
        el.style.height = height
      })
    },
    leave(el) {
      el.style.height = getComputedStyle(el).height
      getComputedStyle(el)
      setTimeout(() => {
        el.style.height = '0'
      })
    },
  },
}
</script>

<style>
/* Стили для анимации раскрытия (оставьте без изменений) */
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease;
  overflow: hidden;
}
</style>
