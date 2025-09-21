<template>
  <div class="flex flex-col md:flex-row gap-8 items-start max-w-7xl mx-auto my-4 p-4">
    <div class="w-full md:w-1/2">
      <img
        src="https://placehold.co/600x400"
        alt="Инженерная доска Балтик из дуба"
        class="rounded-lg shadow-md w-full object-cover"
      />
    </div>

    <div class="w-full md:w-1/2">
      <h2 class="text-2xl font-semibold mb-6">Инженерная доска Балтик</h2>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Материал</span>
          <span class="font-semibold text-gray-800">Дуб</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Поверхность</span>
          <span class="font-semibold text-gray-800">Шлифованная</span>
        </div>

        <div class="flex justify-between items-center">
          <label for="grade" class="font-medium text-gray-600">Селекция</label>
          <div class="relative w-48">
            <select
              id="grade"
              v-model="formState.grade"
              class="peer block w-full appearance-none rounded-md px-3 pr-10 border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            >
              <option disabled value="">Выберите</option>
              <option v-for="g in availableGrades" :key="g" :value="g">{{ g }}</option>
            </select>
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 text-gray-500 peer-focus:rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
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
            </span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <label for="thickness" class="font-medium text-gray-600">Толщина, мм</label>
          <div class="relative w-48">
            <select
              id="thickness"
              v-model="formState.thickness"
              :disabled="!availableThickness.length"
              class="peer block w-full appearance-none rounded-md px-3 pr-10 border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option disabled value="">Выберите</option>
              <option v-for="t in availableThickness" :key="t" :value="t">{{ t }}</option>
            </select>
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 text-gray-500 peer-focus:rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
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
            </span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <label for="width" class="font-medium text-gray-600">Ширина, мм</label>
          <div class="relative w-48">
            <select
              id="width"
              v-model="formState.width"
              :disabled="!availableWidths.length"
              class="peer block w-full appearance-none rounded-md px-3 pr-10 border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option disabled value="">Выберите</option>
              <option v-for="w in availableWidths" :key="w" :value="w">{{ w }}</option>
            </select>
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 text-gray-500 peer-focus:rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
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
            </span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <label for="length" class="font-medium text-gray-600">Длина, мм</label>
          <div class="relative w-48">
            <select
              id="length"
              v-model="formState.length"
              :disabled="!availableLengths.length"
              class="peer block w-full appearance-none rounded-md px-3 pr-10 border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option disabled value="">Выберите</option>
              <option v-for="l in availableLengths" :key="l" :value="l">{{ l }}</option>
            </select>
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 text-gray-500 peer-focus:rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
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
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="selectedProduct"
        class="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-sm"
      >
        <h3 class="text-lg font-bold text-slate-800 mb-4">Ваша конфигурация</h3>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Селекция</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.grade }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Толщина</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.thickness }} мм</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Ширина</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.width }} мм</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Длина</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.length }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600">Площадь упаковки</span>
            <span class="font-bold text-slate-800">{{ selectedProduct.m2 }} м²</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

// Все возможные комбинации продукта
const productOptions = [
  { thickness: 11, width: 120, length: '400-1600', grade: 'Рустик', m2: 1.73 },
  { thickness: 11, width: 140, length: '600-2200', grade: 'Рустик', m2: 2.46 },
  { thickness: 14, width: 140, length: '600-2200', grade: 'Рустик', m2: 2.46 },
  { thickness: 14, width: 185, length: '600-2200', grade: 'Рустик', m2: 2.44 },
  { thickness: 16, width: 185, length: '600-2200', grade: 'Рустик', m2: 2.44 },

  { thickness: 11, width: 120, length: '400-1600', grade: 'Натур', m2: 1.73 },
  { thickness: 11, width: 140, length: '600-2200', grade: 'Натур', m2: 2.46 },
  { thickness: 14, width: 140, length: '600-2200', grade: 'Натур', m2: 2.46 },
  { thickness: 14, width: 185, length: '600-2200', grade: 'Натур', m2: 2.44 },
  { thickness: 16, width: 185, length: '600-2200', grade: 'Натур', m2: 2.44 },

  { thickness: 11, width: 140, length: '600-2200', grade: 'Селект', m2: 2.46 },
  { thickness: 14, width: 140, length: '600-2200', grade: 'Селект', m2: 2.46 },
  { thickness: 14, width: 185, length: '600-2200', grade: 'Селект', m2: 2.44 },
  { thickness: 16, width: 185, length: '600-2200', grade: 'Селект', m2: 2.44 },
]

// Состояние формы
const formState = reactive({
  grade: '',
  thickness: '',
  width: '',
  length: '',
})

// --- Наблюдатели для сброса зависимых полей ---
watch(
  () => formState.grade,
  () => {
    formState.thickness = ''
    formState.width = ''
    formState.length = ''
  },
)

watch(
  () => formState.thickness,
  () => {
    formState.width = ''
    formState.length = ''
  },
)

watch(
  () => formState.width,
  () => {
    formState.length = ''
  },
)

// --- Вычисляемые свойства для доступных опций ---
const availableGrades = computed(() => [...new Set(productOptions.map((p) => p.grade))])

const availableThickness = computed(() => {
  if (!formState.grade) return []
  return [
    ...new Set(productOptions.filter((p) => p.grade === formState.grade).map((p) => p.thickness)),
  ]
})

const availableWidths = computed(() => {
  if (!formState.thickness) return []
  return [
    ...new Set(
      productOptions
        .filter((p) => p.grade === formState.grade && p.thickness === formState.thickness)
        .map((p) => p.width),
    ),
  ]
})

const availableLengths = computed(() => {
  if (!formState.width) return []
  return [
    ...new Set(
      productOptions
        .filter(
          (p) =>
            p.grade === formState.grade &&
            p.thickness === formState.thickness &&
            p.width === formState.width,
        )
        .map((p) => p.length),
    ),
  ]
})

// --- Итоговый выбранный продукт и его цена ---
const selectedProduct = computed(() =>
  productOptions.find(
    (p) =>
      p.grade === formState.grade &&
      p.thickness === formState.thickness &&
      p.width === formState.width &&
      p.length === formState.length,
  ),
)

const calculatedPrice = computed(() => {
  if (!selectedProduct.value) return null
  let basePrice = 4150

  if (selectedProduct.value.grade === 'Натур') basePrice += 400
  if (selectedProduct.value.grade === 'Селект') basePrice += 1100
  if (selectedProduct.value.width === 185) basePrice += 700
  if (selectedProduct.value.width === 140) basePrice += 350
  if (selectedProduct.value.thickness === 16) basePrice += 500

  return new Intl.NumberFormat('kk-KZ', {
    style: 'currency',
    currency: 'KZT',
    minimumFractionDigits: 0,
  }).format(basePrice)
})
</script>
