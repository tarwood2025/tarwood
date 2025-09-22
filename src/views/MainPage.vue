<template>
  <main>
    <TheTitle />
    <TheAdvantages :info-list="infoList" />
    <TheDoubleConstruction :tehno-list="tehnoList" />
    <TheSertificats :cert-list="certList" />
    <TheChouse />
  </main>
</template>

<script setup lang="ts">
import TheAdvantages from '@/components/TheAdvantages.vue'
import TheChouse from '@/components/TheChouse.vue'
import TheDoubleConstruction from '@/components/TheDoubleConstruction.vue'
import TheSertificats from '@/components/TheSertificats.vue'
import TheTitle from '@/components/TheTitle.vue'
import img1 from '@/assets/images/sprout.svg'
import img2 from '@/assets/images/all-inclusive.svg'
import img3 from '@/assets/images/home-edit.svg'
import img4 from '@/assets/images/chart-areaspline.svg'
import img5 from '@/assets/images/material-design.svg'
import img6 from '@/assets/images/thermometer-lines.svg'

const infoList = [
  {
    title: 'Экологичность',
    description: 'Натуральное дерево с минимальной обработкой, безопасно для здоровья',
    icon: img1,
  },
  {
    title: 'Прочность',
    description: 'Двухслойная конструкция обеспечивает стабильность и долговечность',
    icon: img2,
  },
  {
    title: 'Простой монтаж',
    description: 'Замковое соединение позволяет быстро и легко укладывать покрытие',
    icon: img3,
  },
  {
    title: 'Экономичность',
    description: 'Оптимальное соотношение цены и качества по сравнению с массивом',
    icon: img4,
  },
  {
    title: 'Дизайн',
    description: 'Широкий выбор текстур и оттенков для любого интерьера',
    icon: img5,
  },
  {
    title: 'Стабильность',
    description: 'Устойчивость к температурным колебаниям и влажности',
    icon: img6,
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
    url: 'https://vh296-fm.sweb.ru/files/tarwood/public_html/tarwood/images/docs/certificate-1.pdf',
  },
  {
    title: 'Техническое свидетельство пригодности материалов',
    description: 'Подтверждает пригодность материалов и изделий для применения в строительстве',
    url: 'https://vh296-fm.sweb.ru/files/tarwood/public_html/tarwood/images/docs/certificate-2.pdf',
  },
]
</script>
