<template>
  <section class="bg-[#FAF7F5]">
    <div
      class="flex flex-col md:flex-row items-center justify-between mx-auto py-10 md:py-20 max-w-7xl px-4 gap-8"
    >
      <div class="max-w-lg text-center md:text-left">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">Инженерная доска Tarwood</h1>
        <p class="mt-4 text-base sm:text-lg">
          Натуральное напольное покрытие от белорусского производителя
        </p>

        <div class="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
          <TButton @click="$router.push('/products')">Посмотреть каталог</TButton>
          <TButton color="white">Получить консультацию</TButton>
        </div>
      </div>

      <div class="relative">
        <img src="../assets/images/main-img.jpg" alt="hero" class="rounded-2xl w-full max-w-md" />

        <div
          class="absolute -bottom-10 left-1/2 -translate-x-1/2 md:-left-4 md:translate-x-0 rounded-2xl bg-[#FAF7F5] p-4 shadow-lg text-center"
        >
          <div class="text-3xl md:text-4xl font-bold text-tar-green">10+</div>
          <span class="text-tar-secondary">лет опыта</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TButton from '@/ui/TButton.vue'
</script>
