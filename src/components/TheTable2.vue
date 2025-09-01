<script setup lang="ts">
import CalculatorIcon from '../assets/images/calculator.svg'
import ChartBarIcon from '../assets/images/chart-tree.svg'
import ArrowsRightLeftIcon from '../assets/images/slope-downhill.svg'

const boardParams = {
  title: 'Параметры доски',
  icon: CalculatorIcon,
  items: [
    { label: 'Толщина', value: '11, 14, 16', tolerance: '±0,2' },
    { label: 'Ширина', value: '140, 185', tolerance: '±0,2' },
    { label: 'Длина', value: '400-2000 с шагом 100', tolerance: '±0,2' },
  ],
}

// Данные для правой колонки
const lamellaParams = {
  title: 'Ламель',
  icon: ChartBarIcon,
  items: [{ label: 'Толщина', value: '2,6 - 4', tolerance: '±0,1' }],
}

const bevelParams = {
  title: 'Фаска',
  icon: ArrowsRightLeftIcon,
  items: [{ label: 'Глубина', value: '0,8 - 1,2', tolerance: '±0,2' }],
}
</script>

<template>
  <div>
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <div class="flex items-center mb-4">
            <img :src="boardParams.icon" class="h-6 w-6 mr-3" />
            <h3 class="font-semibold text-gray-900">{{ boardParams.title }}</h3>
          </div>
          <div class="space-y-2">
            <div
              v-for="item in boardParams.items"
              :key="item.label"
              class="flex justify-between items-center py-3 bg-[#FCFBF9] rounded-xl px-3"
            >
              <span class="text-gray-600">{{ item.label }}</span>
              <span class="font-semibold text-gray-800 text-right">
                {{ item.value }}
                <span class="text-gray-400 font-normal ml-2">{{ item.tolerance }}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-8">
          <div>
            <div class="flex items-center mb-4">
              <img :src="lamellaParams.icon" class="h-6 w-6 mr-3" />
              <h3 class="font-semibold text-gray-900">{{ lamellaParams.title }}</h3>
            </div>
            <div
              v-for="item in lamellaParams.items"
              :key="item.label"
              class="flex justify-between items-center py-3 bg-[#FCFBF9] rounded-xl px-3"
            >
              <span class="text-gray-600">{{ item.label }}</span>
              <span class="font-semibold text-gray-800 text-right">
                {{ item.value }}
                <span class="text-gray-400 font-normal ml-2">{{ item.tolerance }}</span>
              </span>
            </div>
          </div>

          <div>
            <div class="flex items-center mb-4">
              <img :src="bevelParams.icon" class="h-6 w-6 mr-3" />
              <h3 class="font-semibold text-gray-900">{{ bevelParams.title }}</h3>
            </div>
            <div
              v-for="item in bevelParams.items"
              :key="item.label"
              class="flex justify-between items-center py-3 bg-[#FCFBF9] rounded-xl px-3"
            >
              <span class="text-gray-600">{{ item.label }}</span>
              <span class="font-semibold text-gray-800 text-right">
                {{ item.value }}
                <span class="text-gray-400 font-normal ml-2">{{ item.tolerance }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
