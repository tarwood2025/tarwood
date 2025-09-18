<script setup lang="ts">
import YandexMap from '@/components/YandexMap.vue'
</script>

<template>
  <div>
    <section class="bg-[#F5F1EB] py-10 md:py-18 px-4">
      <div class="mx-auto text-center space-y-4 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Наши дилеры</h2>
        <p class="text-sm sm:text-base text-gray-700">
          Найдите ближайшего дилера инженерной доски TARWOOD™ в вашем городе
        </p>
      </div>
    </section>

    <section>
      <YandexMap />
    </section>
  </div>
</template>
