<template>
  <div class="flex flex-col max-w-88 bg-white text-center px-4 py-3 rounded-2xl shadow-lg">
    <img :src="info.icon" alt="sprout" width="44" height="44" class="mx-auto" />
    <h3 class="font-semibold text-lg">{{ info.title }}</h3>
    <p class="text-tar-secondary">
      {{ info.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  info: {
    title: string
    description: string
    icon: string
  }
}>()
</script>
