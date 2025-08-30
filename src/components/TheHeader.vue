<template>
  <header class="flex justify-between items-center py-2 mx-auto w-full max-w-7xl">
    <!-- Лого -->
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
    <button class="md:hidden text-2xl px-4" @click="isOpen = true">☰</button>
  </header>

  <!-- Мобильное меню (оверлей) -->
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
      @click.self="isOpen = false"
    >
      <div class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 z-50 flex flex-col">
        <!-- Закрыть -->
        <button class="self-end text-2xl mb-6" @click="isOpen = false">✕</button>

        <!-- Навигация -->
        <nav>
          <ul class="space-y-4 font-semibold text-lg">
            <li v-for="(item, idx) in routerMenu" :key="idx" class="cursor-pointer">
              <router-link :to="item.to" class="block" @click="isOpen = false">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- Кнопка -->
        <div class="mt-auto pt-6">
          <TButton class="w-full">Связаться с нами</TButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TButton from '@/ui/TButton.vue'

defineProps<{
  routerMenu: {
    name: string
    to: string
  }[]
}>()

const isOpen = ref(false)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
