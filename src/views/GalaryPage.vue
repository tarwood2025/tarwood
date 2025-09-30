<script setup lang="ts">
import ImageViewer from '../components/ImageViewer.vue'
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

    <section class="relative bg-black/20 py-8">
      <ImageViewer />
    </section>
  </div>
</template>
