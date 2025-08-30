<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-[#F5F1EB] py-10 md:py-18 px-4">
      <div class="mx-auto text-center space-y-4 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">О компании</h2>
        <p class="text-sm sm:text-base text-gray-700">
          Производство инженерной паркетной доски в соответствии с международными<br
            class="hidden sm:block"
          />
          стандартами качества и современными трендами строительной моды
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="bg-[#FAF7F5] py-12 md:py-16">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          <!-- Text Content -->
          <div class="text-left flex-1 order-2 lg:order-1">
            <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-10">
              Наша миссия
            </h3>
            <div class="flex flex-col gap-4 text-sm sm:text-base leading-relaxed text-gray-700">
              <p>
                Компания «ВолатТрейд» была создана в 2008 году в г. Бресте для работы в сфере
                дистрибуции профессиональных лакокрасочных материалов и клеев для
                деревообрабатывающей промышленности
              </p>
              <p>
                Сегодня ООО «ВолатТрейд» под торговой маркой TARWOOD™ производит инженерную
                двухслойную и трёхслойную паркетную доску, используя самое современное оборудование
                ведущих европейских производителей
              </p>
              <p>
                Наша задача — производство инженерной паркетной доски высочайшего качества,
                соответствующей международным стандартам и современным трендам строительной моды
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="flex-1 w-full order-1 lg:order-2">
            <img
              class="w-full rounded-2xl max-w-md lg:max-w-lg xl:max-w-xl h-64 sm:h-80 md:h-96 object-cover border border-gray-200 mx-auto"
              src="../assets/images/unknown.png"
              alt="Производство паркетной доски TARWOOD"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="bg-[#FAF7F5] py-12 md:py-16 px-4">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8 md:mb-12">
          История развития
        </h2>

        <div class="relative">
          <!-- Vertical Line - Desktop -->
          <div
            class="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-tar-green hidden md:block"
          ></div>

          <div class="space-y-2 md:space-y-2">
            <div
              v-for="(event, index) in timeline"
              :key="index"
              class="relative flex flex-col md:flex-row md:items-stretch"
            >
              <!-- Left/Right Content (Alternating) -->
              <div
                class="md:w-1/2 mb-4 md:mb-0"
                :class="{
                  'md:pr-8 md:text-right': index % 2 === 0,
                  'md:pl-8 md:text-left md:order-2': index % 2 === 1,
                }"
              >
                <div
                  class="bg-white rounded-lg shadow-sm px-3 py-2 md:px-4 max-w-md"
                  :class="index % 2 === 0 ? 'mx-auto md:ml-auto' : 'mx-auto md:mr-auto'"
                >
                  <h3 class="text-lg font-semibold mb-2 text-green-800">{{ event.year }}</h3>
                  <h4 class="font-medium mb-2 text-gray-900">{{ event.title }}</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">{{ event.description }}</p>
                </div>
              </div>

              <!-- Center Dot - Desktop -->
              <div
                class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2"
              >
                <div class="w-4 h-4 bg-tar-green rounded-full border-4 border-[#F5F1EB]"></div>
              </div>

              <!-- Empty spacer for alternating layout -->
              <div
                class="md:w-1/2 hidden md:block"
                :class="{ 'md:order-1': index % 2 === 1 }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="mt-16 md:mt-20">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8 md:mb-12">
            Наши достижения
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div
              v-for="(stat, idx) in stats"
              :key="idx"
              class="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center"
            >
              <img :src="stat.icon" alt="icon" class="w-14 h-14 mx-auto mb-2 sm:mb-4" />
              <div class="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-1 sm:mb-2">
                {{ stat.value }}
              </div>
              <div class="text-xs sm:text-sm text-gray-700">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TheChouse />
  </div>
</template>

<script setup lang="ts">
import TheChouse from '@/components/TheChouse.vue'
import icon1 from '@/assets/images/progress-upload.svg'
import icon2 from '@/assets/images/home-lightbulb-outline.svg'
import icon3 from '@/assets/images/check-decagram.svg'
import icon4 from '@/assets/images/account-group.svg'

const timeline = [
  {
    year: '2008',
    title: 'Основание компании',
    description:
      'Создание компании в г. Бресте для дистрибуции профессиональных лакокрасочных материалов',
  },
  {
    year: '2012',
    title: 'Инвестиционный проект',
    description: 'Начало реализации проекта по созданию производства паркетной доски',
  },
  {
    year: '2013',
    title: 'Запуск производства',
    description: 'Построены производственные помещения с современным европейским оборудованием',
  },
  {
    year: '2014',
    title: 'Первая продукция',
    description: 'Отгружена первая партия инженерной паркетной доски TARWOOD™',
  },
  {
    year: '2015',
    title: 'Выход на российский рынок',
    description: 'Компания начала поставки продукции в Россию',
  },
]

const stats = [
  { value: '10+', label: 'лет опыта', icon: icon1 },
  { value: 'N+', label: 'проектов', icon: icon2 },
  { value: '100%', label: 'качество', icon: icon3 },
  { value: 'N+', label: 'партнеров', icon: icon4 },
]
</script>

<style scoped>
/* Smooth transitions for better UX */
.transition-all {
  transition: all 0.3s ease;
}

/* Responsive text sizes */
@media (max-width: 640px) {
  .text-responsive {
    font-size: 0.875rem;
  }
}
</style>
