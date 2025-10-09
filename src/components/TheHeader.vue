<template>
  <div class="flex justify-between items-center py-2 mx-auto w-full max-w-7xl">
    <!-- Лого -->
    <div>
      <img
        @click="$router.push('/')"
        src="../assets/images/tarwood-logo.png"
        alt="logo"
        class="w-28 sm:w-36 cursor-pointer"
      />
    </div>

    <nav class="hidden lg:block relative">
      <ul class="flex font-semibold text-base lg:text-lg space-x-6 lg:space-x-12">
        <li
          v-for="(item, idx) in routerMenu"
          :key="idx"
          class="cursor-pointer hover:border-b border-tar-green transition duration-100"
        >
          <router-link :to="item.to">{{ item.name }}</router-link>
        </li>

        <li class="relative group">
          <span class="cursor-pointer flex items-center gap-2">
            Информация
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 mt-1"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>

          <ul
            class="absolute z-20 left-0 mt-2 w-48 bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          >
            <li v-for="(item, idx) in infoMenu" :key="idx">
              <router-link :to="item.to" class="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <div class="hidden lg:block px-4">
      <TButton @click="$router.push('/contacts')">Связаться с нами</TButton>
    </div>

    <button class="lg:hidden text-2xl px-4" @click="isOpen = true">☰</button>
  </div>

  <transition name="fade">
    <aside
      v-if="isOpen"
      class="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
      @click.self="isOpen = false"
    >
      <div class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 z-50 flex flex-col">
        <button class="self-end text-2xl mb-6" @click="isOpen = false">✕</button>

        <nav>
          <ul class="space-y-4 font-semibold text-lg">
            <li v-for="(item, idx) in [...routerMenu, ...infoMenu]" :key="idx">
              <router-link :to="item.to" class="block" @click="isOpen = false">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="mt-auto pt-6">
          <TButton
            @click="
              () => {
                $router.push('/contacts')
                isOpen = false
              }
            "
            class="w-full"
          >
            Связаться с нами
          </TButton>
        </div>
      </div>
    </aside>
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

// Дополнительное меню для "Информация"
const infoMenu = [
  { name: 'О компании', to: '/about' },
  { name: 'Уход', to: '/operation' },
  { name: 'Укладка', to: '/laying' },
  { name: 'Характеристики', to: '/characteristics' },
]

const isOpen = ref(false)
const isInfoOpen = ref(false) // для мобильного dropdown
</script>
