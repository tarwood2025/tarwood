<template>
  <div class="flex flex-col gap-8 p-6">
    <div>
      <img :src="desk.img" alt="img" />
    </div>
    <div class="space-y-4 w-full">
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
</template>
<script setup lang="ts">
import CalculatorIcon from '../assets/images/calculator.svg'
import ChartBarIcon from '../assets/images/chart-tree.svg'
import ArrowsRightLeftIcon from '../assets/images/slope-downhill.svg'

const props = defineProps<{
  desk: any
}>()

const boardParams = {
  title: 'Параметры доски',
  icon: CalculatorIcon,
  items: [
    { label: 'Толщина', value: '14', tolerance: '±0,2' },
    { label: 'Ширина', value: props.desk.franc ? '120' : '100', tolerance: '±0,2' },
    { label: 'Длина', value: props.desk.franc ? ' 585' : '600', tolerance: '±0,2' },
  ],
}

// Данные для правой колонки
const lamellaParams = {
  title: 'Ламель',
  icon: ChartBarIcon,
  items: [{ label: 'Толщина', value: '2,6', tolerance: '±0,1' }],
}

const bevelParams = {
  title: 'Фаска',
  icon: ArrowsRightLeftIcon,
  items: [{ label: 'Глубина', value: '0,8 - 1,2', tolerance: '±0,2' }],
}
</script>
