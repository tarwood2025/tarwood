<!-- <template>
  <div class="w-full max-w-6xl mx-auto p-4 md:p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold mb-4">Список дилеров</h2>
        <div v-for="city in cities" :key="city.id" class="border rounded-lg overflow-hidden">
          <button
            @click="toggleCity(city.id)"
            class="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span class="font-semibold text-lg">{{ city.name }}</span>
            <span class="text-gray-500"
              >({{ city.dealers.length }} дилер{{ city.dealers.length > 1 ? 'а' : '' }})</span
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 transition-transform duration-300"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'leaflet/dist/leaflet.css'
// --- РЕАКТИВНОЕ СОСТОЯНИЕ ---
// src/types/dealers.ts
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

const activeCityId = ref<number | null>(null)
const selectedDealer = ref<Dealer | null>(null)

const mapZoom = ref(5)
const mapCenter = ref<[number, number]>([55.751244, 37.618423]) // Начальный центр (Москва)

// --- ДАННЫЕ (замените на данные с вашего API) ---

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
        name: "Дилер 'Нева'",
        address: 'Невский пр., 100',
        phone: '+7 (812) 111-22-33',
        workingHours: '10:00 - 22:00',
        coordinates: [59.9323, 30.342],
      },
    ],
  },
])

// --- МЕТОДЫ ---

const toggleCity = (cityId: number) => {
  if (activeCityId.value === cityId) {
    activeCityId.value = null // Закрыть, если уже открыт
  } else {
    activeCityId.value = cityId // Открыть новый
  }
}

const selectDealer = (dealer: Dealer) => {
  selectedDealer.value = dealer
  mapCenter.value = dealer.coordinates
  mapZoom.value = 15 // Приближаем карту при выборе
}

// --- АНИМАЦИЯ АККОРДЕОНА ---

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
/* Стили для плавной анимации аккордеона */
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}
.leaflet-container .leaflet-control-attribution a {
  display: none !important;
  background: #af0909 !important;
}
</style> -->
