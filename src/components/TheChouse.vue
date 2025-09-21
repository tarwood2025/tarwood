<template>
  <section class="bg-[#3A6757]">
    <div class="text-center max-w-7xl mx-auto py-10 md:py-20 text-white px-4">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
        Готовы выбрать идеальное покрытие?
      </h2>
      <p class="text-sm sm:text-base md:text-lg mb-8 md:mb-10">
        Мы поможем подобрать оптимальный вариант для вашего проекта и ответим на все вопросы
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <TButton @click="$router.push('/products')" color="white">Смотреть каталог</TButton>
        <TButton @click="$router.push('/contacts')" color="white">Связаться с нами</TButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TButton from '@/ui/TButton.vue'
</script>
