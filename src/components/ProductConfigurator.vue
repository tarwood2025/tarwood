<template>
  <div class="font-sans">
    <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
      <div v-for="filter in filtersConfig" :key="filter.key">
        <label :for="filter.key" class="block text-sm font-medium text-gray-700">{{
          filter.label
        }}</label>
        <select
          :id="filter.key"
          v-model="selections[filter.key]"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option :value="null" disabled>{{ filter.placeholder }}</option>
          <option v-for="option in availableOptions[filter.key]" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>

    <div class="mt-6 flex justify-between items-center">
      <button
        @click="resetSelections"
        class="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition"
      >
        Сбросить выбор
      </button>

      <div
        v-if="selectedProduct"
        class="bg-blue-100 p-3 rounded-md text-sm text-blue-800 font-semibold"
      >
        М² в упаковке: {{ selectedProduct.sqmPerPackage }}
      </div>
    </div>

    <div v-if="selectedProduct" class="mt-4 pt-4 border-t border-gray-100">
      <h3 class="text-md font-semibold text-gray-800">Выбрано:</h3>
      <ul class="text-sm text-gray-600 space-y-1 mt-2">
        <li v-for="filter in filtersConfig" :key="filter.key">
          {{ filter.label }}:
          <span class="font-medium"
            >{{ selections[filter.key]
            }}<span v-if="filter.key === 'thickness' || filter.key === 'width'"> мм</span></span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits } from 'vue'

// --- ТИПЫ ДАННЫХ ---
interface Product {
  id: number
  construction: string
  species: string
  finish: string
  thickness: number
  width: number
  length: string
  grade: string
  sqmPerPackage: number
}

// --- ИСХОДНЫЕ ДАННЫЕ (ВАША ТАБЛИЦА) ---
const products: Product[] = [
  {
    id: 1,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 11,
    width: 120,
    length: '400-1600',
    grade: 'Рустик',
    sqmPerPackage: 1.73,
  },
  {
    id: 2,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 11,
    width: 140,
    length: '600-2200',
    grade: 'Рустик',
    sqmPerPackage: 2.46,
  },
  {
    id: 3,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 14,
    width: 140,
    length: '600-2200',
    grade: 'Рустик',
    sqmPerPackage: 2.46,
  },
  {
    id: 4,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 14,
    width: 185,
    length: '600-2200',
    grade: 'Рустик',
    sqmPerPackage: 2.44,
  },
  {
    id: 5,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 16,
    width: 185,
    length: '600-2200',
    grade: 'Рустик',
    sqmPerPackage: 2.44,
  },
  {
    id: 6,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 11,
    width: 120,
    length: '400-1600',
    grade: 'Натур',
    sqmPerPackage: 1.73,
  },
  {
    id: 7,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 11,
    width: 140,
    length: '600-2200',
    grade: 'Натур',
    sqmPerPackage: 2.46,
  },
  {
    id: 8,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 14,
    width: 140,
    length: '600-2200',
    grade: 'Натур',
    sqmPerPackage: 2.46,
  },
  {
    id: 9,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 14,
    width: 185,
    length: '600-2200',
    grade: 'Натур',
    sqmPerPackage: 2.44,
  },
  {
    id: 10,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 16,
    width: 185,
    length: '600-2200',
    grade: 'Натур',
    sqmPerPackage: 2.44,
  },
  {
    id: 11,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 11,
    width: 140,
    length: '600-2200',
    grade: 'Селект',
    sqmPerPackage: 2.46,
  },
  {
    id: 12,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 14,
    width: 140,
    length: '600-2200',
    grade: 'Селект',
    sqmPerPackage: 2.46,
  },
  {
    id: 13,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 14,
    width: 185,
    length: '600-2200',
    grade: 'Селект',
    sqmPerPackage: 2.44,
  },
  {
    id: 14,
    construction: 'Двухслойная доска',
    species: 'Дуб',
    finish: 'Масло',
    thickness: 16,
    width: 185,
    length: '600-2200',
    grade: 'Селект',
    sqmPerPackage: 2.44,
  },
]

// --- КОНФИГУРАЦИЯ ФИЛЬТРОВ ---
// Определяем, какие фильтры мы хотим видеть и в каком порядке
const filtersConfig = [
  { key: 'grade', label: 'Сорт', placeholder: 'Выберите сорт' },
  { key: 'thickness', label: 'Толщина', placeholder: 'Выберите толщину' },
  { key: 'width', label: 'Ширина', placeholder: 'Выберите ширину' },
  { key: 'length', label: 'Длина', placeholder: 'Выберите длину' },
] as const // `as const` для строгой типизации

// --- РЕАКТИВНОЕ СОСТОЯНИЕ ---
// Хранилище для выбранных пользователем значений
const selections = ref<Record<string, string | number | null>>({
  grade: null,
  thickness: null,
  width: null,
  length: null,
})

// --- ЛОГИКА ФИЛЬТРАЦИИ ---
const availableOptions = computed(() => {
  let filteredProducts = [...products]
  const options: Record<string, (string | number)[]> = {}

  for (const filter of filtersConfig) {
    // Получаем уникальные опции для ТЕКУЩЕГО фильтра
    options[filter.key] = [...new Set(filteredProducts.map((p) => p[filter.key]))].sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') return a - b
      return String(a).localeCompare(String(b))
    })

    // Фильтруем продукты для СЛЕДУЮЩЕГО шага, если текущий фильтр выбран
    const currentSelection = selections.value[filter.key]
    if (currentSelection) {
      filteredProducts = filteredProducts.filter((p) => p[filter.key] === currentSelection)
    }
  }

  return options
})

// --- СБРОС ЗАВИСИМЫХ ФИЛЬТРОВ ---
filtersConfig.forEach((filter, index) => {
  watch(
    () => selections.value[filter.key],
    (newVal, oldVal) => {
      // Если выбор изменился или стал null, сбросить последующие фильтры
      if (newVal !== oldVal) {
        for (let i = index + 1; i < filtersConfig.length; i++) {
          const subsequentFilterKey = filtersConfig[i].key
          selections.value[subsequentFilterKey] = null
        }
      }
    },
  )
})

// --- ВЫЧИСЛЕНИЕ ИТОГОВОГО ПРОДУКТА ---
const selectedProduct = computed<Product | null>(() => {
  const allSelected = filtersConfig.every((filter) => selections.value[filter.key] !== null)
  if (!allSelected) {
    return null
  }

  const found = products.find((p) => {
    return filtersConfig.every((filter) => p[filter.key] === selections.value[filter.key])
  })

  return found || null
})

// --- EMIT СОБЫТИЯ РОДИТЕЛЬСКОМУ КОМПОНЕНТУ ---
const emit = defineEmits(['product-selected'])

watch(selectedProduct, (newProduct) => {
  emit('product-selected', newProduct)
})

// --- МЕТОД ДЛЯ СБРОСА ВСЕХ ВЫБОРОВ ---
const resetSelections = () => {
  for (const key in selections.value) {
    selections.value[key] = null
  }
}
</script>
