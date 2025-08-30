<template>
  <section class="bg-[#FAF7F5]">
    <div
      class="flex flex-col-reverse lg:flex-row justify-between items-center gap-8 mx-auto py-10 lg:py-20 max-w-7xl px-4"
    >
      <div class="max-w-lg text-center lg:text-left">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5">Двухслойная конструкция</h2>
        <p class="text-tar-secondary mb-10 text-sm sm:text-base">
          Технология, где волокна древесины расположены перпендикулярно друг другу
          <br />
          Это компенсирует внутренние напряжения и обеспечивает исключительную стабильность при
          изменении влажности и температуры
        </p>

        <div class="space-y-4 max-w-sm mx-auto lg:mx-0">
          <div class="flex gap-4">
            <div
              class="bg-amber-500 text-white rounded-full w-7 min-w-7 h-7 flex items-center justify-center"
            >
              1
            </div>
            <div>
              <h3 class="font-bold">Верхний слой - ламель</h3>
              <p class="text-tar-secondary text-sm sm:text-base">
                Пиленый шпон из ценных пород древесины
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div
              class="bg-amber-500 text-white rounded-full w-7 min-w-7 h-7 flex items-center justify-center"
            >
              2
            </div>
            <div>
              <h3 class="font-bold">Нижний слой - фанера ФСФ</h3>
              <p class="text-tar-secondary text-sm sm:text-base">
                Берёзовая фанера, обеспечивающая стабильность конструкции
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative w-full max-w-md lg:max-w-xl">
        <img
          src="../assets/images/fanera.png"
          alt="fanera"
          class="rounded-2xl object-cover w-full"
        />

        <!-- Список -->
        <div
          class="rounded-2xl bg-[#F5F1EB] p-4 shadow-lg w-full max-w-[370px] mx-auto mt-6 relative lg:absolute lg:-bottom-16 lg:-left-56 lg:translate-x-0 lg:mx-0 lg:mt-0"
        >
          <h3 class="font-semibold text-lg md:text-xl">Преимущества технологии</h3>
          <ul>
            <li
              v-for="(item, idx) in tehnoList"
              :key="idx"
              class="flex text-tar-green items-center text-sm sm:text-base"
            >
              <div class="w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Бейдж -->
        <div
          class="absolute top-5 right-5 rounded-md bg-[#6A8C5D] p-2 shadow-lg text-white font-bold text-sm sm:text-base"
        >
          2 слоя надежности
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  tehnoList: string[]
}>()
</script>
