<template>
  <header class="flex justify-between items-center py-2 mx-auto w-full max-w-7xl">
    <div>
      <img src="../assets/images/tarwood-logo.png" alt="logo" class="w-28 sm:w-36" />
    </div>

    <!-- Десктопное меню -->
    <nav class="hidden md:block">
      <ul class="flex font-semibold text-base lg:text-lg space-x-6 lg:space-x-12">
        <li v-for="(item, idx) in routerMenu" :key="idx" class="cursor-pointer">
          <router-link :to="item.to">{{ item.name }}</router-link>
        </li>
      </ul>
    </nav>

    <!-- Кнопка (десктоп) -->
    <div class="hidden md:block">
      <TButton>Связаться с нами</TButton>
    </div>

    <!-- Мобильный бургер -->
    <button class="md:hidden text-2xl">☰</button>
  </header>
</template>

<script setup lang="ts">
import TButton from '@/ui/TButton.vue'

defineProps<{
  routerMenu: {
    name: string
    to: string
  }[]
}>()
</script>
