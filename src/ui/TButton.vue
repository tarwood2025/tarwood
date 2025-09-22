<template>
  <button :class="['px-4 py-2 rounded-md font-bold cursor-pointer transition-colors', colorClass]">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  color?: 'green' | 'white'
}>()

const colorClass = computed(() => {
  if (props.color === 'white') {
    return 'bg-white text-tar-green border border-tar-green hover:bg-gray-200'
  }
  return 'bg-tar-green text-[#F9F6F2] hover:bg-tar-green-hover'
})
</script>
