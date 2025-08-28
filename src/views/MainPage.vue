<template>
  <main>
    <!-- HERO -->
    <TheTitle />
    <!-- Преимущества -->
    <TheAdvantages :info-list="infoList" />
    <!-- Двухслойная конструкция -->
    <TheDoubleConstruction :tehno-list="tehnoList" />

    <!-- Сертификаты -->
    <TheSertificats :cert-list="certList" />

    <!-- CTA -->
    <TheChouse />
  </main>
</template>

<script setup lang="ts">
import TheAdvantages from '@/components/TheAdvantages.vue'
import TheChouse from '@/components/TheChouse.vue'
import TheDoubleConstruction from '@/components/TheDoubleConstruction.vue'
import TheSertificats from '@/components/TheSertificats.vue'
import TheTitle from '@/components/TheTitle.vue'

const infoList = [
  {
    title: 'Экологичность',
    description: 'Натуральное дерево с минимальной обработкой, безопасно для здоровья',
    icon: '/src/assets/icons/sprout.svg',
  },
  {
    title: 'Прочность',
    description: 'Двухслойная конструкция обеспечивает стабильность и долговечность',
    icon: '/src/assets/icons/all-inclusive.svg',
  },
  {
    title: 'Простой монтаж',
    description: 'Замковое соединение позволяет быстро и легко укладывать покрытие',
    icon: '/src/assets/icons/home-edit.svg',
  },
  {
    title: 'Экономичность',
    description: 'Оптимальное соотношение цены и качества по сравнению с массивом',
    icon: '/src/assets/icons/chart-areaspline.svg',
  },
  {
    title: 'Дизайн',
    description: 'Широкий выбор текстур и оттенков для любого интерьера',
    icon: '/src/assets/icons/material-design.svg',
  },
  {
    title: 'Стабильность',
    description: 'Устойчивость к температурным колебаниям и влажности',
    icon: '/src/assets/icons/thermometer-lines.svg',
  },
]

const tehnoList = [
  'Оптимальное соотношение цена/качество',
  'Высокие эстетические формы',
  'Простой и надёжный монтаж',
  'Совместимость с тёплым полом',
]

const certList = [
  {
    title: 'Свидетельство о технической компетентности',
    description: 'Подтверждает техническую компетентность в области производства инженерной доски',
  },
  {
    title: 'Техническое свидетельство пригодности материалов',
    description: 'Подтверждает пригодность материалов и изделий для применения в строительстве',
  },
]
</script>
