<template>
  <footer class="bg-[#4A4A4A] text-white py-10 px-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      <div class="sm:col-span-2 max-w-lg">
        <h2 class="mb-2 font-semibold text-3xl md:text-4xl">Tarwood</h2>
        <p class="text-sm sm:text-base">
          Мы специализируемся на производстве высококачественной инженерной доски, сочетающей
          красоту натурального дерева с современными технологиями. Наша продукция отличается
          долговечностью, экологичностью и безупречным качеством.
        </p>
      </div>

      <div>
        <h3 class="font-semibold text-lg mb-1.5">Навигация</h3>
        <ul class="space-y-1 text-sm sm:text-base">
          <li v-for="(item, idx) in routerMenu" :key="idx">
            <router-link :to="item.to">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-lg mb-1.5">Контакты</h3>
        <ul class="space-y-1 text-sm sm:text-base">
          <li><a href="#"> 📞 +7 (495) 661-66-86</a></li>
          <li><a href="#"> ✉️ info@тарвуд.рф</a></li>
          <li>
            <a href="#">
              📍 Москва, Волгоградский <br />
              пр-т, д. 32, корп. 25, офис 14
            </a>
          </li>
        </ul>
      </div>

      <div
        class="col-span-1 sm:col-span-2 lg:col-span-4 border-t border-tar-secondary pt-5 mt-5 text-sm text-[#A9A9A9] text-center"
      >
        © 2025 Tarwood. Все права защищены.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const routerMenu: { name: string; to: string }[] = [
  { name: 'Главная', to: '/' },
  { name: 'Продукция', to: '/products' },
  { name: 'Галерея', to: '/galary' },
  { name: 'О компании', to: '/about' },
  { name: 'Уход', to: '/operation' },
  { name: 'Укладка', to: '/laying' },
  { name: 'Характеристики', to: '/characteristics' },
]
</script>
