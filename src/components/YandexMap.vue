<template>
  <div class="w-full max-w-6xl mx-auto p-4 md:p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="w-full aspect-square rounded-lg overflow-hidden shadow-md">
        <YandexMap
          v-model="map"
          :settings="{
            location: {
              center: mapCenter,
              zoom: mapZoom,
            },
          }"
          width="100%"
          height="100%"
        >
          <YandexMapDefaultSchemeLayer />
          <YandexMapDefaultFeaturesLayer />

          <template v-for="city in cities" :key="city.id">
            <template v-for="dealer in city.dealers" :key="dealer.id">
              <YandexMapMarker
                :settings="{ coordinates: [dealer.coordinates[1], dealer.coordinates[0]] }"
              >
                <div
                  @click="selectDealer(dealer)"
                  class="relative p-2 cursor-pointer flex justify-center items-start"
                >
                  <div
                    class="rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                    :class="{
                      'bg-blue-600 text-white scale-70 shadow-lg':
                        selectedDealer && selectedDealer.id === dealer.id,
                      'bg-gray-700 text-white bg-opacity-80':
                        !selectedDealer || selectedDealer.id !== dealer.id,
                    }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div
                    v-if="selectedDealer && selectedDealer.id === dealer.id"
                    class="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-56 bg-white p-3 rounded-lg shadow-xl text-center"
                  >
                    <p class="font-bold text-sm text-gray-800">{{ dealer.name }}</p>
                    <p class="text-xs text-gray-600 mt-1">{{ dealer.address }}</p>
                  </div>
                </div>
              </YandexMapMarker>
            </template>
          </template>
        </YandexMap>
      </div>

      <div class="bg-white rounded-lg shadow-md">
        <div class="flex items-center gap-3 px-2 pb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          <h2 class="text-lg font-semibold text-gray-800">Список городов</h2>
        </div>

        <div class="flex flex-col">
          <div v-for="city in cities" :key="city.id" class="border-b border-gray-200">
            <button
              @click="toggleCity(city.id)"
              class="w-full flex justify-between cursor-pointer items-center px-4 py-2 text-left hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div class="flex items-center gap-4">
                <span class="w-2.5 h-2.5 bg-tar-green rounded-full"></span>
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
              <div v-if="activeCityId === city.id" class="bg-white max-h-64 overflow-y-auto">
                <div
                  v-for="dealer in city.dealers"
                  :key="dealer.id"
                  @click="selectDealer(dealer)"
                  class="px-4 py-2 border-t border-gray-100 cursor-pointer hover:bg-blue-50"
                  :class="{ 'bg-blue-100/25': selectedDealer && selectedDealer.id === dealer.id }"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
} from 'vue-yandex-maps'
import type { YMap } from '@yandex/ymaps3-types'

// --- TYPES ---
interface Dealer {
  id: number
  name: string
  address: string
  phone: string
  workingHours: string
  coordinates: [number, number] // [latitude, longitude]
}

interface City {
  id: number
  name: string
  dealers: Dealer[]
}

// --- REACTIVE STATE ---
const map = ref<any>(null)
const activeCityId = ref<number | null>(null)
const selectedDealer = ref<Dealer | null>(null)
const mapZoom = ref<number>(9)
const mapCenter = ref<[number, number]>([37.617644, 55.755819]) // Initial center (Moscow)

// --- DATA ---
const cities = ref<City[]>([
  {
    id: 1,
    name: 'Москва',
    dealers: [
      {
        id: 101,
        name: 'Wood Life',
        address: 'ул. Фрунзенская набережная, 16к1',
        phone: '8-926-389-70-89',
        workingHours: '10:00 - 21:00',
        coordinates: [55.730193, 37.592402],
      },
      {
        id: 102,
        name: 'Панорама паркета',
        address: 'ул. Красная Пресня, 29',
        phone: '8-(925) 603-31-91',
        workingHours: '09:00 - 20:00',
        coordinates: [55.762237, 37.56406],
      },
      {
        id: 103,
        name: 'АДВ Паркет',
        address: 'Фурманный переулок, 16 стр.1',
        phone: '8-(495)-669-14-80',
        workingHours: '09:00 - 20:00',
        coordinates: [55.764764, 37.65116],
      },
      {
        id: 104,
        name: 'Паркет Шоп',
        address: 'ул. Павелецкая набережная, д.2 стр.1',
        phone: '8-(499) 649-65-65',
        workingHours: '10:00 - 21:00',
        coordinates: [55.716023, 37.646661],
      },
      {
        id: 105,
        name: 'Pol-shop (ИП Кардаш)',
        address: 'Киевское ш., 22-й км, БП "Румянцево", корпус Г, пав. 152Г',
        phone: '8-985-125-40-40',
        workingHours: '10:00 - 21:00',
        coordinates: [55.634335, 37.437726],
      },
      {
        id: 106,
        name: 'ООО Глобал',
        address: '41 км МКАД, Строительная ярмарка "Славянский мир", пав. НБ-80',
        phone: '8-916-074-04-07',
        workingHours: '09:00 - 20:00',
        coordinates: [55.606514, 37.486079],
      },
      {
        id: 107,
        name: 'Лига пол (ТЦ Каширский Двор)',
        address: 'Каширское ш., 19, корп.1, ТЦ "Каширский Двор", 1 к., 2А-1П7',
        phone: '(977) 864-56-38',
        workingHours: '09:00 - 20:00',
        coordinates: [55.665055, 37.631838],
      },
      {
        id: 108,
        name: 'Лига пол (БП Румянцево)',
        address: 'Киевское ш., 22-й км, БП "Румянцево", корпус В, пав. 153В',
        phone: '(968) 007-46-25, 7(926) 655-44-44',
        workingHours: '10:00 - 21:00',
        coordinates: [55.633744, 37.44299],
      },
      {
        id: 109,
        name: 'ДА Паркет',
        address: 'Волоколамское ш., 116, стр. 2 (этаж 1)',
        phone: '8-(963)-660-80-29',
        workingHours: '09:00 - 20:00',
        coordinates: [55.829524, 37.413144],
      },
      {
        id: 110,
        name: 'Дом паркета',
        address: 'ул. Панфёрова, д. 12, под. 2',
        phone: '8-495-221-21-76',
        workingHours: '09:00 - 20:00',
        coordinates: [55.681302, 37.543024],
      },
      {
        id: 111,
        name: 'Империя напольных покрытий (ИП Сорокин Д.Б.)',
        address: 'г. Мытищи, ул. Шараповский проезд, вл.2 стр.4, ТЦ Красный кит, -1 этаж',
        phone: '8-(926) 541-20-60',
        workingHours: '10:00 - 21:00',
        coordinates: [55.916886, 37.755892],
      },
    ],
  },
  {
    id: 2,
    name: 'Санкт-Петербург',
    dealers: [
      {
        id: 201,
        name: 'ПолВамВДом Настоящие полы',
        address: 'пр. Ю. Гагарина 73, метро "Звездная", "Московская"',
        phone: '8-911-997-08-27',
        workingHours: '10:00 - 21:00',
        coordinates: [59.839122, 30.335892],
      },
      {
        id: 202,
        name: 'Домикс (ИП Кореннов Г.Г.)',
        address: 'ул. Фучика 9, ТЦ Кубатура',
        phone: '8-904-341-15-00',
        workingHours: '10:00 - 21:00',
        coordinates: [59.875477, 30.368992],
      },
      {
        id: 203,
        name: 'Дом паркета СПБ (ТЦ Интерио)',
        address: 'ул. Полевая Сибировская д.54а секц.245,259',
        phone: '',
        workingHours: '10:00 - 21:00',
        coordinates: [59.875363, 30.367983],
      },
      {
        id: 204,
        name: 'Дом паркета СПБ (ТЦ Гранд Каньон)',
        address: 'ул. Шостаковича д.8к1 сек.609',
        phone: '',
        workingHours: '10:00 - 21:00',
        coordinates: [59.875363, 30.367983],
      },
      {
        id: 205,
        name: 'Дом паркета СПБ (ТЦ Кубатура)',
        address: 'ул. Фучика д.9 1в.637',
        phone: '',
        workingHours: '10:00 - 21:00',
        coordinates: [59.875363, 30.367983],
      },
      {
        id: 206,
        name: 'ТЦ Василеостровский',
        address: 'ул. Железноводская д.3 модуль 99 и 101',
        phone: '',
        workingHours: '10:00 - 21:00',
        coordinates: [59.952925, 30.25763],
      },
      {
        id: 207,
        name: 'ТЦ Мебельвуд',
        address: 'ул. Дальневосточный проспект д.14 сек.51-52',
        phone: '8-950-098-99-03',
        workingHours: '10:00 - 21:00',
        coordinates: [59.909936, 30.446948],
      },
    ],
  },
  {
    id: 3,
    name: 'Донецк',
    dealers: [
      {
        id: 301,
        name: 'ИП Кабанов С.Б.',
        address: 'ул. Ильича проспект д.17а',
        phone: '8-949-312-21-91',
        workingHours: '10:00 - 21:00',
        coordinates: [48.001211, 37.827203],
      },
    ],
  },
  {
    id: 4,
    name: 'Воронеж',
    dealers: [
      {
        id: 401,
        name: 'Пол и Стиль',
        address: 'ул. Донбасская д.44',
        phone: '8(473) 202-24-40',
        workingHours: '10:00 - 21:00',
        coordinates: [51.668907, 39.173143],
      },
      {
        id: 402,
        name: 'Лидекор',
        address: 'ул. Фридриха Энгельса 21',
        phone: '8(473) 200-04-75',
        workingHours: '10:00 - 21:00',
        coordinates: [51.671337, 39.206335],
      },
      {
        id: 403,
        name: 'Лидекор',
        address: 'ул. Куколкина д.33',
        phone: '8(473) 200-04-75',
        workingHours: '10:00 - 21:00',
        coordinates: [51.668169, 39.188353],
      },
      {
        id: 404,
        name: 'Априори',
        address: 'ул. Урицкого д.10',
        phone: '8-906-670-6702',
        workingHours: '10:00 - 21:00',
        coordinates: [51.68334, 39.212369],
      },
      {
        id: 405,
        name: 'Винлам',
        address: 'ул. Урицкого д.70 ТЦ ЦДМ',
        phone: '8-991-095-37-07, 8-991-095-37-24',
        workingHours: '10:00 - 21:00',
        coordinates: [51.683291, 39.200231],
      },
    ],
  },
  {
    id: 5,
    name: 'Самара',
    dealers: [
      {
        id: 501,
        name: 'Точка паркета (ИП Коган)',
        address: 'ул. Чкалова д.100',
        phone: '8-937-201-84-79',
        workingHours: '10:00 - 21:00',
        coordinates: [53.19723, 50.128291],
      },
    ],
  },
  {
    id: 6,
    name: 'Екатеринбург',
    dealers: [
      {
        id: 601,
        name: 'STAR FLOORS (ИП Беляков К.В.)',
        address: 'ул. Татищева д.20',
        phone: '8-(908) 917-31-09',
        workingHours: '10:00 - 21:00',
        coordinates: [56.836065, 60.562774],
      },
    ],
  },
  {
    id: 7,
    name: 'Севастополь',
    dealers: [
      {
        id: 701,
        name: 'Добро Пол (ИП Пилипенко)',
        address: 'ул. Адмирала Октябрьского д.9',
        phone: '8-978-786-89-45',
        workingHours: '10:00 - 21:00',
        coordinates: [44.603064, 33.520644],
      },
    ],
  },
  {
    id: 8,
    name: 'Ростов-на-Дону',
    dealers: [
      {
        id: 801,
        name: 'ИП Тимушев Р.Н.',
        address: 'ул. Красноармейская 236',
        phone: '8-(909) 159-34-76',
        workingHours: '10:00 - 21:00',
        coordinates: [47.231508, 39.730392],
      },
    ],
  },
  {
    id: 9,
    name: 'Махачкала',
    dealers: [
      {
        id: 901,
        name: 'Паркет-Прайм',
        address: 'ул. Ирчи Казака д.14г, 2 этаж',
        phone: '8-965-654-44-48',
        workingHours: '10:00 - 21:00',
        coordinates: [42.966648, 47.497927],
      },
    ],
  },
  {
    id: 10,
    name: 'Челябинск',
    dealers: [
      {
        id: 1001,
        name: 'Антураж ООО Фаворит (ИП Подкаменская Н.С.)',
        address: 'ул. Лесопарковая д.7, оф.219',
        phone: '8-(351)-272-02-71',
        workingHours: '10:00 - 21:00',
        coordinates: [55.155638, 61.365408],
      },
    ],
  },
  {
    id: 11,
    name: 'Пятигорск',
    dealers: [
      {
        id: 1101,
        name: 'Арт Керамика (ИП Авагимов В.Б.)',
        address: 'ул. Мира д.266, ТЦ Крокус, 1 этаж',
        phone: '8-879-398-04-55',
        workingHours: '10:00 - 21:00',
        coordinates: [44.040936, 43.032984],
      },
    ],
  },
])

// --- METHODS ---
const toggleCity = (cityId: number) => {
  activeCityId.value = activeCityId.value === cityId ? null : cityId
}

const selectDealer = (dealer: Dealer) => {
  selectedDealer.value = dealer
  mapCenter.value = [dealer.coordinates[1], dealer.coordinates[0]]
  mapZoom.value = 15
  // Автоматически открываем нужный город в списке
  const city = cities.value.find((c) => c.dealers.some((d) => d.id === dealer.id))
  if (city) {
    activeCityId.value = city.id
  }
}

// Новая функция для правильного склонения
const pluralizeDealer = (count: number) => {
  const cases = [2, 0, 1, 1, 1, 2]
  const titles = ['дилер', 'дилера', 'дилеров']
  return titles[count % 100 > 4 && count % 100 < 20 ? 2 : cases[count % 10 < 5 ? count % 10 : 5]]
}

// --- ACCORDION ANIMATION ---
const enter = (element: Element) => {
  const el = element as HTMLElement
  el.style.height = 'auto'
  const height = getComputedStyle(el).height
  el.style.height = '0'
  requestAnimationFrame(() => {
    el.style.height = height
  })
}

const leave = (element: Element) => {
  const el = element as HTMLElement
  el.style.height = getComputedStyle(el).height
  requestAnimationFrame(() => {
    el.style.height = '0'
  })
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}
</style>
