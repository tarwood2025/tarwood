<template>
  <div class="bg-white p-4 rounded-2xl shadow-lg max-w-max">
    <div class="flex gap-4 mb-4">
      <div>
        <img
          src="../assets/icons/file-document.svg"
          alt="img"
          class="bg-tar-green p-2 rounded-md"
        />
      </div>
      <div class="max-w-80 text-start">
        <h3 class="font-semibold text-lg">{{ info.title }}</h3>
        <p class="text-tar-secondary text-sm">
          {{ info.description }}
        </p>
      </div>
    </div>
    <div class="flex gap-4">
      <TButton class="w-full flex justify-center items-center gap-2" color="white">
        <img src="../assets/icons/eye-outline.svg" alt="img" />
        Смотреть
      </TButton>
      <TButton class="w-full flex justify-center items-center gap-2" color="green">
        <img src="../assets/icons/download.svg" alt="img" />
        Скачать
      </TButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import TButton from './TButton.vue'

defineProps<{
  info: {
    title: string
    description: string
  }
}>()
</script>
