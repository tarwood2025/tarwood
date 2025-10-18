<template>
  <div
    class="flex flex-col shadow-xl rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl"
  >
    <div class="w-full relative">
      <img :src="item.content.img" alt="sprout" class="w-full h-full object-cover" />
      <p
        class="absolute bottom-2 left-2 text-xs md:text-sm text-white bg-black/30 px-2 py-0.5 rounded"
      >
        {{ item.content.text }}
      </p>
    </div>

    <div class="w-full flex flex-col">
      <h2 class="text-xl font-bold text-center py-2">{{ item.title }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    title: string
    content: {
      text: string
      img: string
    }
  }
}>()

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
</script>
