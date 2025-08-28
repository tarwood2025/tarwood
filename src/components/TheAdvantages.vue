<template>
  <section class="bg-[#F5F1EB] py-10 md:py-20 px-4">
    <div class="mx-auto text-center space-y-4 mb-10 md:mb-15 max-w-3xl">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Преимущества инженерной доски</h2>
      <p class="text-sm sm:text-base">
        Почему тысячи клиентов выбирают нашу инженерную доску для своих проектов
      </p>
    </div>

    <div class="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
      <TInfoCard v-for="(item, idx) in infoList" :key="idx" :info="item" />
    </div>
  </section>
</template>

<script setup lang="ts">
import TInfoCard from '@/ui/TInfoCard.vue'

defineProps<{
  infoList: any
}>()
</script>
