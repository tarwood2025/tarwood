<script setup lang="ts">
const tableData = [
  {
    feature: 'Здоровые сучки расколотые частично отставшиеся, в том числе частично сросшиеся',
    select: 'Допускается ø до 10 мм, без ограничений по количеству',
    natur: 'Допускается ø до 18 мм, без ограничений по количеству',
    rustic: 'Допускается ø до 50 мм, без ограничений по количеству',
  },
  {
    feature: 'Полностью отставшиеся сучки (выпавшие)',
    select: 'Не допускается',
    natur: 'Допускается ø до 15 мм, без ограничений по количеству',
    rustic: 'Допускается ø до 35 мм, без ограничений по количеству',
  },
  {
    feature: 'Трещины пластевые, кромочные и торцовочные',
    select: 'Не допускается',
    natur: 'Шириной до 0,5 мм, длиной до 30 мм',
    rustic: 'Допускаются отставшиеся шириной до 5 мм, длиной до 30% планки без ограничений',
  },
  {
    feature: 'Заболонь',
    select: 'Допускается до 10% от площади планки',
    natur: 'Допускается до 20% от площади планки',
    rustic: 'Не ограничивается',
  },
  {
    feature: 'Желизна пятна и полосы/разноцветная химическая окраска',
    select: 'Не допускается',
    natur: 'Не допускается',
    rustic: 'Не допускается',
  },
  {
    feature: 'Синева (глубокая)',
    select: 'Не допускается',
    natur: 'Не допускается',
    rustic: 'Не допускается',
  },
  {
    feature: 'Червоточина',
    select: 'Не допускается',
    natur: 'Допускается до 3 шт. на 1 м.п. диаметром не более 3 мм',
    rustic: 'Допускается до 10 шт. диаметром не более 3 мм на 40 см длины планки',
  },
  {
    feature: 'Гниль',
    select: 'Не допускается',
    natur: 'Не допускается',
    rustic: 'Не допускается',
  },
  {
    feature: 'Вмятин, механические повреждения на пласти',
    select: 'Единичные глубиной до 0,2 мм',
    natur: 'Единичные глубиной до 0,5 мм',
    rustic: 'Единичные глубиной до 1,5 мм',
  },
  {
    feature: 'Механические повреждения, отщеп, скол, вмятина на кромках и торцах',
    select: 'Единичные глубиной до 0,2 мм',
    natur: 'Единичные шириной до 2 мм и глубиной до 1,0 мм',
    rustic: 'Единичные шириной до 3 мм и глубиной до 1,5 мм',
  },
  {
    feature: 'Непрофрезированный (непрострог)',
    select: 'Не допускается',
    natur: 'Не допускается',
    rustic: 'Не допускается',
  },
]

// Заголовки для data-атрибутов
const headers = {
  feature: 'Пороки',
  select: 'Сорт "Селект"',
  natur: 'Сорт "Натур"',
  rustic: 'Сорт "Рустик"',
}
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8 font-sans">
    <div class="overflow-x-auto rounded-lg md:shadow-lg">
      <table class="min-w-full">
        <thead class="bg-tar-green hidden md:table-header-group">
          <tr>
            <th
              scope="col"
              class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider w-1/4"
            >
              {{ headers.feature }}
            </th>
            <th
              scope="col"
              class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
            >
              {{ headers.select }}
            </th>
            <th
              scope="col"
              class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
            >
              {{ headers.natur }}
            </th>
            <th
              scope="col"
              class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
            >
              {{ headers.rustic }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in tableData"
            :key="index"
            class="block md:table-row border-b md:border-b-0 border-gray-200 last:border-b-0 shadow-md md:shadow-none rounded-lg md:rounded-none mb-4 md:mb-0 odd:bg-[#FAF7F5] even:bg-[#F5F1EB]"
          >
            <td
              class="px-6 py-4 whitespace-normal text-sm font-bold md:font-medium md:text-gray-800 align-top block md:table-cell text-center md:text-left bg-tar-green text-white md:bg-transparent rounded-t-lg md:rounded-none"
              :data-label="headers.feature"
            >
              {{ row.feature }}
            </td>
            <td
              class="px-6 py-4 whitespace-normal text-sm text-gray-600 align-top block md:table-cell"
              :data-label="headers.select"
            >
              {{ row.select }}
            </td>
            <td
              class="px-6 py-4 whitespace-normal text-sm text-gray-600 align-top block md:table-cell"
              :data-label="headers.natur"
            >
              {{ row.natur }}
            </td>
            <td
              class="px-6 py-4 whitespace-normal text-sm text-gray-600 align-top block md:table-cell rounded-b-lg md:rounded-none"
              :data-label="headers.rustic"
            >
              {{ row.rustic }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Этот блок стилей нужен для создания адаптивного вида.
  Мы используем медиа-запрос, чтобы применить стили только на экранах
  меньше чем 768px (стандартный breakpoint 'md' в Tailwind).
*/
@media (max-width: 767px) {
  /* Скрываем полноценный заголовок таблицы */
  thead {
    display: none;
  }

  /* Каждая ячейка, кроме первой, будет иметь псевдо-элемент ::before,
     который будет играть роль заголовка столбца. */
  td:not(:first-child)::before {
    content: attr(data-label); /* Берем текст из data-атрибута */
    font-weight: 600; /* Делаем текст жирным */
    display: block; /* Отображаем как блок */
    margin-bottom: 0.5rem; /* Отступ снизу (mb-2) */
    font-size: 0.75rem; /* Размер шрифта (text-xs) */
    text-transform: uppercase; /* Все буквы заглавные */
    color: #4b5563; /* Цвет текста (gray-600) */
  }

  /* Центрируем текст в ячейках на мобильных */
  td {
    text-align: center;
  }

  /* Выравниваем первую ячейку (заголовок) по центру */
  td:first-child {
    text-align: center;
  }

  /* Возвращаем выравнивание по центру для текста внутри псевдо-элемента */
  td::before {
    text-align: center;
  }
}
</style>
