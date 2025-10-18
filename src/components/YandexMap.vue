<template>
  <div class="w-full max-w-6xl mx-auto p-4 md:p-8">
    <!-- Десктоп: сетка -->
    <div class="hidden md:grid md:grid-cols-2 gap-8">
      <!-- Карта для десктопа -->
      <div class="w-full aspect-square rounded-lg overflow-hidden shadow-md">
        <YandexMap
          v-model="map"
          :settings="{
            location: { center: mapCenter, zoom: mapZoom },
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
                    class="w-8 h-8 transition-transform duration-200"
                    :class="{
                      'scale-110': selectedDealer && selectedDealer.id === dealer.id,
                      'scale-100': !selectedDealer || selectedDealer.id !== dealer.id,
                    }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-6 h-6 transition-transform duration-200"
                      :class="{
                        'scale-110': selectedDealer && selectedDealer.id === dealer.id,
                        'scale-100': !selectedDealer || selectedDealer.id !== dealer.id,
                      }"
                    >
                      <circle cx="12" cy="12" r="11" fill="white" />
                      <circle
                        cx="12"
                        cy="12"
                        r="8"
                        :class="{
                          'fill-green-800': selectedDealer && selectedDealer.id === dealer.id,
                          'fill-green-700': !selectedDealer || selectedDealer.id !== dealer.id,
                        }"
                      />
                    </svg>
                  </div>
                </div>
              </YandexMapMarker>
            </template>
          </template>
        </YandexMap>
      </div>

      <!-- Список -->
      <div class="bg-white max-h-max rounded-lg drop-shadow-lg pt-2 overflow-hidden">
        <CityList
          :cities="cities"
          :activeCityId="activeCityId"
          :selectedDealer="selectedDealer"
          @toggleCity="toggleCity"
          @selectDealer="selectDealer"
        />
      </div>
    </div>

    <!-- Мобильный список (карта в селекте) -->
    <div class="md:hidden">
      <CityList
        :cities="cities"
        :activeCityId="activeCityId"
        :selectedDealer="selectedDealer"
        @toggleCity="toggleCity"
        @selectDealer="selectDealer"
      >
        <template #map="{ dealer }">
          <div class="mt-2 h-56 w-full rounded-lg overflow-hidden shadow">
            <YandexMap
              :settings="{
                location: { center: [dealer.coordinates[1], dealer.coordinates[0]], zoom: 14 },
              }"
              width="100%"
              height="100%"
            >
              <YandexMapDefaultSchemeLayer />
              <YandexMapDefaultFeaturesLayer />
              <YandexMapMarker
                :settings="{ coordinates: [dealer.coordinates[1], dealer.coordinates[0]] }"
              >
                <div class="w-6 h-6 bg-green-700 border-2 border-white rounded-full"></div>
              </YandexMapMarker>
            </YandexMap>
          </div>
        </template>
      </CityList>
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
import CityList from './CityList.vue'

// --- TYPES ---
interface Dealer {
  id: number
  name: string
  address: string
  phone: string
  coordinates: [number, number] // [latitude, longitude]
}

interface City {
  id: number
  center: [number, number]
  name: string
  dealers: Dealer[]
}

// --- REACTIVE STATE ---
const map = ref<any>(null)
const activeCityId = ref<number | null>(null)
const selectedDealer = ref<Dealer | null>(null)
const mapZoom = ref<number>(8)
const mapCenter = ref<[number, number]>([37.617644, 55.755819]) // Initial center (Moscow)

// --- DATA ---
const cities = ref<City[]>([
  {
    id: 1,
    center: [37.617644, 55.755819],
    name: 'Москва',
    dealers: [
      {
        id: 101,
        name: 'Лига пол (ТЦ Каширский Двор)',
        address: 'Каширское ш., 19, корп.1, ТЦ "Каширский Двор", 1 к., 2А-1П7',
        phone: '(977) 864-56-38',
        coordinates: [55.665055, 37.631838],
      },
      {
        id: 102,
        name: 'Лига пол (БП Румянцево)',
        address: 'Киевское ш., 22-й км, БП "Румянцево", корпус В, пав. 153В',
        phone: '(968) 007-46-25, 7(926) 655-44-44',
        coordinates: [55.633744, 37.44299],
      },
      {
        id: 103,
        name: 'Wood Life',
        address: 'ул. Фрунзенская набережная, 16к1',
        phone: '8-926-389-70-89',
        coordinates: [55.730193, 37.592402],
      },
      {
        id: 104,
        name: 'Панорама паркета',
        address: 'ул. Красная Пресня, 29',
        phone: '8-(925) 603-31-91',
        coordinates: [55.762237, 37.56406],
      },
      {
        id: 105,
        name: 'АДВ Паркет',
        address: 'Фурманный переулок, 16 стр.1',
        phone: '8-(495)-669-14-80',
        coordinates: [55.764764, 37.65116],
      },
      {
        id: 106,
        name: 'Паркет Шоп',
        address: 'ул. Павелецкая набережная, д.2 стр.1',
        phone: '8-(499) 649-65-65',
        coordinates: [55.716023, 37.646661],
      },
      {
        id: 107,
        name: 'Pol-shop (ИП Кардаш)',
        address: 'Киевское ш., 22-й км, БП "Румянцево", корпус Г, пав. 152Г',
        phone: '8-985-125-40-40',
        coordinates: [55.634335, 37.437726],
      },
      {
        id: 109,
        name: 'ДА Паркет',
        address: 'Волоколамское ш., 116, стр. 2 (этаж 1)',
        phone: '8-(963)-660-80-29',
        coordinates: [55.829524, 37.413144],
      },
      {
        id: 110,
        name: 'Дом паркета',
        address: 'ул. Панфёрова, д. 12, под. 2',
        phone: '8-495-221-21-76',
        coordinates: [55.681302, 37.543024],
      },
      {
        id: 111,
        name: 'Империя напольных покрытий (ИП Сорокин Д.Б.)',
        address: 'г. Мытищи, ул. Шараповский проезд, вл.2 стр.4, ТЦ Красный кит, -1 этаж',
        phone: '8-(903)-798-43-34, 8-(903)-507-64-77',
        coordinates: [55.916886, 37.755892],
      },
    ],
  },
  {
    id: 2,
    center: [30.314997, 59.938784],
    name: 'Санкт-Петербург',
    dealers: [
      {
        id: 201,
        name: 'ПолВамВДом Настоящие полы',
        address: 'пр. Ю. Гагарина 73, метро "Звездная", "Московская"',
        phone: '8-911-997-08-27',
        coordinates: [59.839122, 30.335892],
      },
      {
        id: 202,
        name: 'Домикс (ИП Кореннов Г.Г.)',
        address: 'ул. Фучика 9, ТЦ Кубатура',
        phone: '8-904-341-15-00',
        coordinates: [59.875477, 30.368992],
      },
      {
        id: 203,
        name: 'Дом паркета СПБ (ТЦ Интерио)',
        address: 'ул. Полевая Сибировская д.54а секц.245,259',
        phone: '',
        coordinates: [59.875363, 30.367983],
      },
      {
        id: 204,
        name: 'Дом паркета СПБ (ТЦ Гранд Каньон)',
        address: 'ул. Шостаковича д.8к1 сек.609',
        phone: '',
        coordinates: [59.875363, 30.367983],
      },
      {
        id: 205,
        name: 'Дом паркета СПБ (ТЦ Кубатура)',
        address: 'ул. Фучика д.9 1в.637',
        phone: '',
        coordinates: [59.875363, 30.367983],
      },
      {
        id: 206,
        name: 'Дом паркета СПБ (ТЦ Василеостровский)',
        address: 'ул. Железноводская д.3 модуль 99 и 101',
        phone: '',
        coordinates: [59.952925, 30.25763],
      },
      {
        id: 207,
        name: 'Дом Паркета СПБ (ТЦ Мебельвуд)',
        address: 'ул. Дальневосточный проспект д.14 сек.51-52',
        phone: '8-950-098-99-03',
        coordinates: [59.909936, 30.446948],
      },
    ],
  },
  {
    id: 3,
    center: [37.827203, 48.001211],
    name: 'Донецк',
    dealers: [
      {
        id: 301,
        name: 'ИП Кабанов С.Б.',
        address: 'ул. Ильича проспект д.17а',
        phone: '8-949-312-21-91',
        coordinates: [48.001211, 37.827203],
      },
    ],
  },
  {
    id: 4,
    center: [39.173143, 51.668907],
    name: 'Воронеж',
    dealers: [
      {
        id: 401,
        name: 'Пол и Стиль',
        address: 'ул. Донбасская д.44',
        phone: '8(473) 202-24-40',
        coordinates: [51.668907, 39.173143],
      },
      {
        id: 402,
        name: 'Лидекор',
        address: 'ул. Фридриха Энгельса 21',
        phone: '8(473) 200-04-75',
        coordinates: [51.671337, 39.206335],
      },
      {
        id: 403,
        name: 'Лидекор',
        address: 'ул. Куколкина д.33',
        phone: '8(473) 200-04-75',
        coordinates: [51.668169, 39.188353],
      },
      {
        id: 404,
        name: 'Априори',
        address: 'ул. Урицкого д.10',
        phone: '8-906-670-6702',
        coordinates: [51.68334, 39.212369],
      },
      {
        id: 405,
        name: 'Винлам',
        address: 'ул. Урицкого д.70 ТЦ ЦДМ',
        phone: '8-991-095-37-07, 8-991-095-37-24',
        coordinates: [51.683291, 39.200231],
      },
    ],
  },
  {
    id: 5,
    center: [50.128291, 53.19723],
    name: 'Самара',
    dealers: [
      {
        id: 501,
        name: 'Точка паркета (ИП Коган)',
        address: 'ул. Чкалова д.100',
        phone: '8-937-201-84-79',
        coordinates: [53.19723, 50.128291],
      },
    ],
  },
  {
    id: 6,
    center: [60.562774, 56.836065],
    name: 'Екатеринбург',
    dealers: [
      {
        id: 601,
        name: 'STAR FLOORS (ИП Беляков К.В.)',
        address: 'ул. Татищева д.20',
        phone: '8-(908) 917-31-09',
        coordinates: [56.836065, 60.562774],
      },
    ],
  },
  {
    id: 7,
    center: [33.520644, 44.603064],
    name: 'Севастополь',
    dealers: [
      {
        id: 701,
        name: 'Добро Пол (ИП Пилипенко)',
        address: 'ул. Адмирала Октябрьского д.9',
        phone: '8-978-786-89-45',
        coordinates: [44.603064, 33.520644],
      },
    ],
  },
  {
    id: 8,
    center: [39.730392, 47.231508],
    name: 'Ростов-на-Дону',
    dealers: [
      {
        id: 801,
        name: 'ИП Тимушев Р.Н.',
        address: 'ул. Красноармейская 236',
        phone: '8-(909) 159-34-76',
        coordinates: [47.231508, 39.730392],
      },
    ],
  },
  {
    id: 9,
    center: [47.507186, 42.963947],
    name: 'Махачкала',
    dealers: [
      {
        id: 901,
        name: 'Паркет-Прайм',
        address: 'ул. Ирчи Казака д.74',
        phone: '8-965-654-44-48',
        coordinates: [42.963947, 47.507186],
      },
    ],
  },
  {
    id: 10,
    center: [61.365408, 55.155638],
    name: 'Челябинск',
    dealers: [
      {
        id: 1001,
        name: 'Антураж ООО Фаворит (ИП Подкаменская Н.С.)',
        address: 'ул. Лесопарковая д.7, оф.219',
        phone: '8-(351)-272-02-71',
        coordinates: [55.155638, 61.365408],
      },
    ],
  },
  {
    id: 11,
    center: [43.032984, 44.040936],
    name: 'Пятигорск',
    dealers: [
      {
        id: 1101,
        name: 'Арт Керамика (ИП Авагимов В.Б.)',
        address: 'ул. Мира д.266, ТЦ Крокус, 1 этаж',
        phone: '8-879-398-04-55',
        coordinates: [44.040936, 43.032984],
      },
    ],
  },
])

// --- METHODS ---
const toggleCity = (cityId: number) => {
  mapZoom.value = 10
  mapCenter.value = cities.value.find((c) => c.id === cityId)!.center
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
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}
</style>
