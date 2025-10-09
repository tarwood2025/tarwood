<template>
  <div
    class="flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl"
  >
    <div class="w-full md:w-[30%] relative h-48 md:h-auto overflow-hidden">
      <img
        :src="item.content.img"
        :alt="item.title"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />

      <h3 class="absolute bottom-2 left-2 text-sm text-white bg-black/50 px-2 py-1 rounded">
        {{ item.content.text }}
      </h3>
    </div>

    <div class="py-4 px-6 md:flex-1">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">{{ item.title }}</h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div class="col-span-2 sm:col-span-3">
          <label for="boardType" class="block text-sm font-medium text-gray-700">Тип доски:</label>
          <select
            id="boardType"
            v-model="selectedTitle"
            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-base"
          >
            <option value="" disabled>Выберите тип доски</option>
            <option v-for="d in allList" :key="d.title" :value="d.title">
              {{ d.title }}
            </option>
          </select>
        </div>

        <div v-if="selectedTitle">
          <label for="thickness" class="block text-sm font-medium text-gray-700"
            >Толщина (мм):</label
          >
          <select
            id="thickness"
            v-model="selectedThickness"
            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm"
          >
            <option value="" disabled>Толщина</option>
            <option v-for="t in availableThicknesses" :key="t" :value="t">
              {{ t }}
            </option>
          </select>
        </div>

        <div v-if="selectedThickness">
          <label for="width" class="block text-sm font-medium text-gray-700">Ширина (мм):</label>
          <select
            id="width"
            v-model="selectedWidth"
            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm"
          >
            <option value="" disabled>Ширина</option>
            <option v-for="w in availableWidths" :key="w" :value="w">
              {{ w }}
            </option>
          </select>
        </div>

        <div v-if="selectedWidth">
          <label for="length" class="block text-sm font-medium text-gray-700">Длина (мм):</label>
          <select
            id="length"
            v-model="selectedLength"
            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm"
          >
            <option value="" disabled>Длина</option>
            <option v-for="l in availableLengths" :key="l" :value="l">
              {{ l }}
            </option>
          </select>
        </div>

        <div class="col-span-2 sm:col-span-1" v-if="selectedLength">
          <label for="grade" class="block text-sm font-medium text-gray-700">Сорт:</label>
          <select
            id="grade"
            v-model="selectedGrade"
            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm"
          >
            <option value="" disabled>Сорт</option>
            <option v-for="g in availableGrades" :key="g" :value="g">
              {{ g }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="w-full md:w-[30%] md:border-l p-6 bg-amber-50/50 flex flex-col justify-center">
      <p class="font-bold text-xl text-gray-800 mb-3 border-b border-amber-200 pb-2">
        Итоговая конфигурация:
      </p>

      <template v-if="finalConfig">
        <div class="space-y-1 text-gray-700">
          <p class="text-sm">
            <span class="font-semibold text-amber-700">Тип:</span>
            <span class="ml-2">{{ selectedTitle }}</span>
          </p>
          <p class="text-sm">
            <span class="font-semibold text-amber-700">Толщина:</span>
            <span class="ml-2">{{ finalConfig.thickness }} мм</span>
          </p>
          <p class="text-sm">
            <span class="font-semibold text-amber-700">Ширина:</span>
            <span class="ml-2">{{ finalConfig.width }} мм</span>
          </p>
          <p class="text-sm">
            <span class="font-semibold text-amber-700">Длина:</span>
            <span class="ml-2">{{ finalConfig.length }} мм</span>
          </p>
          <p class="text-sm">
            <span class="font-semibold text-amber-700">Сорт:</span>
            <span class="ml-2">{{ finalConfig.grade }}</span>
          </p>
        </div>

        <div class="mt-4 pt-4 border-t border-amber-200">
          <p class="text-sm font-semibold text-gray-900">
            M² в упаковке:
            <span class="text-2xl font-bold text-red-600 ml-2">{{ finalConfig.m2 }} м²</span>
          </p>
        </div>
      </template>

      <p
        v-else
        class="text-sm text-gray-500 italic p-4 bg-white rounded-lg border border-dashed border-amber-300"
      >
        Пожалуйста, выберите все параметры, чтобы увидеть полную конфигурацию доски и площадь в
        упаковке.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

defineProps({
  item: {
    type: Object,
  },
})

// The data structure you provided
const allList = [
  {
    title: 'Палубная доска',
    list: [
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
    ],
  },
  {
    title: 'Венгерская елка',
    list: [
      { thickness: 14, width: 100, length: 600, grade: 'Рустик', m2: 1.08 },
      { thickness: 14, width: 100, length: 600, grade: 'Натур', m2: 1.08 },
      { thickness: 14, width: 100, length: 600, grade: 'Селект', m2: 1.08 },
      { thickness: 14, width: 140, length: 600, grade: 'Рустик', m2: 1.344 },
      { thickness: 14, width: 140, length: 600, grade: 'Натур', m2: 1.344 },
      { thickness: 14, width: 140, length: 600, grade: 'Селект', m2: 1.344 },
    ],
  },
  {
    title: 'Французская елка',
    list: [
      { thickness: 14, width: 120, length: 585, grade: 'Рустик', m2: 0.98 },
      { thickness: 14, width: 120, length: 585, grade: 'Натур', m2: 0.98 },
      { thickness: 14, width: 120, length: 585, grade: 'Селект', m2: 0.98 },
    ],
  },
]

// Reactive state for user selections
const selectedTitle = ref('')
const selectedThickness = ref('')
const selectedWidth = ref('')
const selectedLength = ref('')
const selectedGrade = ref('')

// --- COMPUTED PROPERTIES (CASCADING FILTERING) ---

// 1. Get the list of items for the currently selected product type
const currentList = computed(() => {
  return allList.find((item) => item.title === selectedTitle.value)?.list || []
})

// 2. Get unique thicknesses based on the selected title
const availableThicknesses = computed(() => {
  return [...new Set(currentList.value.map((item) => item.thickness))]
})

// 3. Get unique widths based on selected title and thickness
const availableWidths = computed(() => {
  return [
    ...new Set(
      currentList.value
        .filter((item) => item.thickness === selectedThickness.value)
        .map((item) => item.width),
    ),
  ]
})

// 4. Get unique lengths based on selected title, thickness, and width
const availableLengths = computed(() => {
  return [
    ...new Set(
      currentList.value
        .filter((item) => item.thickness === selectedThickness.value)
        .filter((item) => item.width === selectedWidth.value)
        .map((item) => item.length),
    ),
  ]
})

// 5. Get unique grades based on all preceding selections
const availableGrades = computed(() => {
  return [
    ...new Set(
      currentList.value
        .filter((item) => item.thickness === selectedThickness.value)
        .filter((item) => item.width === selectedWidth.value)
        .filter((item) => item.length === selectedLength.value)
        .map((item) => item.grade),
    ),
  ]
})

// 6. Find the final configuration object when all parameters are selected
const finalConfig = computed(() => {
  const { value: title } = selectedTitle
  const { value: thickness } = selectedThickness
  const { value: width } = selectedWidth
  const { value: length } = selectedLength
  const { value: grade } = selectedGrade

  if (title && thickness && width && length && grade) {
    return (
      currentList.value.find(
        (item) =>
          item.thickness === thickness &&
          item.width === width &&
          item.length === length &&
          item.grade === grade,
      ) || null
    )
  }
  return null
})

// --- WATCHERS (RESET DEPENDENT SELECTIONS) ---

// Reset dependent fields when the main type changes
watch(selectedTitle, () => {
  selectedThickness.value = ''
  selectedWidth.value = ''
  selectedLength.value = ''
  selectedGrade.value = ''
})

// Reset when thickness changes
watch(selectedThickness, () => {
  selectedWidth.value = ''
  selectedLength.value = ''
  selectedGrade.value = ''
})

// Reset when width changes
watch(selectedWidth, () => {
  selectedLength.value = ''
  selectedGrade.value = ''
})

// Reset when length changes
watch(selectedLength, () => {
  selectedGrade.value = ''
})
</script>
