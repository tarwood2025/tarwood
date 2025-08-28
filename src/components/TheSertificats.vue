<template>
  <section class="bg-[#F5F1EB]">
    <div class="text-center max-w-7xl mx-auto py-10 md:py-20 px-4">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">Сертификаты качества</h2>
      <p class="max-w-2xl mx-auto mb-10 md:mb-15 text-sm sm:text-base">
        Наша продукция имеет все необходимые сертификаты, подтверждающие высокое качество и
        соответствие строительным стандартам
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <TCertCard v-for="(item, idx) in certList" :key="idx" :info="item" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TCertCard from '@/ui/TCertCard.vue'

defineProps<{
  certList: any
}>()
</script>
