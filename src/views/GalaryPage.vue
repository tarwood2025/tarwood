<script setup lang="ts">
import ImageViewer from '../components/ImageViewer.vue'
import fontImg from '@/assets/images/font.jpg'
</script>

<template>
  <div>
    <section class="bg-[#F5F1EB] py-10 md:py-18 px-4">
      <div class="mx-auto text-center space-y-4 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Галерея проектов</h2>
        <p class="text-sm sm:text-base text-gray-700">
          Посмотрите, как наша инженерная доска TARWOOD™ преображает <br class="hidden sm:block" />
          пространства в различных проектах
        </p>
      </div>
    </section>

    <section class="relative">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url(fontImg)"></div>
      <div class="absolute inset-0 bg-black opacity-20"></div>

      <div class="relative z-10 p-4">
        <ImageViewer />
      </div>
    </section>
  </div>
</template>
