<template>
  <div class="flex flex-col">
    <!-- HEADER -->
    <TheHeader :router-menu="routerMenu" />

    <Transition name="fade" mode="out-in">
      <RouterView />
    </Transition>

    <!-- FOOTER -->
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'

const routerMenu: { name: string; to: string }[] = [
  { name: 'Главная', to: '/' },
  { name: 'Продукция', to: '/products' },
  { name: 'Галерея', to: '/galary' },
  { name: 'Где купить', to: '/contacts' },
]
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
