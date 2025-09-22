<template>
  <section class="relative bg-[#FAF7F5] overflow-hidden">
    <video autoplay loop muted playsinline class="absolute top-0 left-0 w-full h-full object-cover">
      <source src="../assets/video/main.webm" type="video/webm" />
    </video>

    <div class="absolute inset-0 bg-tar-green/90"></div>

    <div
      class="relative flex flex-col md:flex-row items-center justify-between mx-auto py-10 md:py-44 max-w-7xl px-4 gap-8"
    >
      <div class="max-w-2xl text-center md:text-left text-white">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">Инженерная доска Tarwood</h1>
        <p class="mt-4 text-base sm:text-2xl">
          Натуральное напольное покрытие от белорусского производителя
        </p>

        <div class="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
          <TButton class="border border-white/30" @click="$router.push('/products')">
            Посмотреть каталог
          </TButton>
          <TButton @click="$router.push('/contacts')" color="white">
            Получить консультацию
          </TButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TButton from '@/ui/TButton.vue'
</script>
