<template>
  <div>
    <section class="bg-[#F5F1EB] py-10 md:py-18 px-4">
      <div class="mx-auto text-center space-y-4 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">Инструкция по укладке</h2>
        <p class="text-sm sm:text-base text-gray-700">
          Подробное руководство по профессиональной укладке <br class="hidden sm:block" />
          паркетной и инженерной доски
        </p>
      </div>
    </section>

    <section class="py-10 md:py-18 px-4 bg-[#FAF7F5]">
      <div
        class="mx-auto text-center space-y-1 max-w-7xl bg-[#FFF7ED] border rounded-lg border-[#FFDAAF] text-red-800 py-2 px-4"
      >
        <h3 class="text-2xl sm:text-3xl md:text-xl font-semibold">Внимание!</h3>
        <p>
          При оформлении заказа необходимо добавить на обрезки (подрезку) 5-10% к фактической
          площади помещения. К моменту укладки в помещении должны быть закончены все
          строительно-отделочные работы и включены системы отопления, кондиционирования, увлажнения
        </p>
      </div>

      <div
        class="bg-[#F5F1EB] flex items-center gap-4 py-4 px-4 rounded-lg max-w-7xl mx-auto mt-8 border border-[#6A8C5D]"
      >
        <div class="bg-tar-green rounded-lg p-2">
          <img
            src="../assets/images/vector.svg"
            class="w-6 h-6 min-w-6 flex items-center justify-center"
            alt="img"
          />
        </div>
        <div class="flex flex-col items-start">
          <h3 class="font-semibold text-[#4A4A4A]">Профессиональная укладка</h3>
          <span class="text-[16px] text-tar-secondary"
            >Паркетная/инженерная доска предназначена для укладки во всех видах жилых помещений. Все
            работы по укладке должны производиться квалифицированными специалистами</span
          >
        </div>
      </div>

      <div class="mx-auto text-center space-y-4 max-w-7xl">
        <div class="shadow-sm rounded-lg mt-8" v-for="(item, idx) in menu" :key="idx">
          <div>
            <div class="bg-[#F5F1EB] flex items-center gap-4 py-4 px-4 rounded-lg rounded-b-none">
              <div class="bg-tar-green rounded-lg p-2">
                <img :src="item.icon" class="w-6 h-6 flex items-center justify-center" alt="img" />
              </div>
              <div class="flex flex-col items-start">
                <span class="text-[16px] text-tar-secondary">Этап {{ idx + 1 }}</span>
                <h3 class="font-semibold text-[#4A4A4A]">{{ item.title }}</h3>
              </div>
            </div>
          </div>

          <ul class="text-start py-4 px-4 bg-white rounded-lg rounded-t-none">
            <li v-for="(text, i) in item.desc" :key="i" class="flex gap-2 items-baseline mb-2">
              <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
              <p>{{ text }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mx-auto text-center space-y-1 max-w-7xl bg-[#FEFCE8] border rounded-lg border-[#FEF191] text-yellow-800 py-2 px-4 mt-8"
      >
        <h3 class="text-2xl sm:text-3xl md:text-xl font-semibold">Внимание!</h3>
        <p>
          При оформлении заказа необходимо добавить на обрезки (подрезку) 5-10% к фактической
          площади помещения. К моменту укладки в помещении должны быть закончены все
          строительно-отделочные работы и включены системы отопления, кондиционирования, увлажнения
        </p>
      </div>
    </section>

    <section class="bg-[#F5F1EB] py-10 md:py-18 px-4">
      <div class="mx-auto text-center space-y-4 max-w-7xl flex flex-col gap-4">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Правила возврата и обмена товара
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
          <div class="bg-white rounded-lg p-4 max-w-lg">
            <div class="flex items-center gap-2 mb-3">
              <img src="../assets/images/clock.svg" alt="clock" />
              <p>Сроки принятия решения по возврату</p>
            </div>
            <div class="roudned-lg bg-[#F5F1EB] p-4 text-start rounded-xl mb-2">
              <h3 class="font-semibold">По внешнему виду упаковок:</h3>
              <p>В течение 24 часов с момента получения товара</p>
            </div>
            <div class="roudned-lg bg-[#F5F1EB] p-4 text-start rounded-xl">
              <h3 class="font-semibold">По прочим характеристикам:</h3>
              <p>В течение 14 дней с момента получения товара</p>
            </div>
          </div>

          <div class="bg-white rounded-lg p-4 max-w-lg">
            <div class="flex items-center gap-2 mb-4">
              <img src="../assets/images/box.svg" alt="clock" />
              <p>Сроки принятия решения по возврату</p>
            </div>
            <ul>
              <li class="flex gap-2 items-baseline mb-2">
                <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
                <p>Товар принимается только в заводских упаковках</p>
              </li>
              <li class="flex gap-2 items-baseline mb-2">
                <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
                <p>Без нарушения целостности упаковки</p>
              </li>
              <li class="flex gap-2 items-baseline mb-2">
                <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
                <p>Не бывший в употреблении</p>
              </li>
              <li class="flex gap-2 items-baseline mb-2">
                <div class="w-1.5 min-w-1.5 h-1.5 rounded-full bg-tar-green mr-2" />
                <p>При условии правильного хранения</p>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mx-auto text-center space-y-1 max-w-7xl bg-[#FEF2F2] border rounded-lg border-[#FFC9C9] text-red-800 py-2 px-4"
        >
          <h3 class="text-2xl sm:text-3xl md:text-xl font-semibold">Важно!</h3>
          <p>
            Претензии к качеству товара принимаются исключительно до момента монтажа. В случае
            укладки некачественного товара претензии по нему не принимаются
          </p>
        </div>
      </div>
    </section>

    <TheChouse />
  </div>
</template>

<script setup lang="ts">
import TheChouse from '@/components/TheChouse.vue'
import svg1 from '@/assets/images/y1.svg'
import svg2 from '@/assets/images/y2.svg'
import svg3 from '@/assets/images/y3.svg'
import svg4 from '@/assets/images/y4.svg'
import svg5 from '@/assets/images/y5.svg'
import svg6 from '@/assets/images/y6.svg'

const menu = [
  {
    title: 'Прием по качеству',
    desc: [
      'Паркетная/инженерная доска производится в соответствии с самыми высокими стандартами качества. Каждая планка проходит тщательную и многоступенчатую проверку по качеству',
      'Окончательная проверка непосредственно перед установкой является ответственностью паркетчика и/или владельца',
      'Убедитесь, что паркетная/инженерная доска соответствует цвету, сорту, конструкции и качеству отделки',
      'Не устанавливайте планки при обнаружении на них дефектов или если качество планки вызывает сомнения. Используйте такие планки только для подрезки',
      'Паркетная/инженерная планка считается принятой укладчиком/покупателем по качеству при первом её закреплении',
    ],
    icon: svg1,
  },
  {
    title: 'Устройство основания',
    desc: [
      'Паркетная/инженерная доска укладывается непосредственно на стяжку с помощью клея, на фанеру, закрепленную на основание (стяжку)',
      'Допускается укладка на подложку «мультимоль», приклеенный к стяжке; на другое деревянное основание (дощатые полы, OSB и т.п.)',
      'Возможна укладка плавающим способом с проклеиванием пазов-гребней или шпонок, а также плавающим способом на Эластилон',
      'Укладка плавающим способом имеет ограничения по размеру помещения и предъявляет более строгие требования к условиям эксплуатации',
    ],
    icon: svg2,
  },
  {
    title: 'Контроль условий',
    desc: [
      'Укладка деревянного пола возможна только в помещениях выше уровня земли',
      'Основание должно быть выровнено в соответствии со СНиП 3.04.01-87 (максимальное отклонение от плоскости не более 2 мм на 2 м)',
      'Влажность деревянного основания не должна превышать 8%, влажность стяжки не должна превышать 2%',
      'Влажность воздуха в помещении должна составлять 40-60%, температура: 18-22°C',
      'До начала укладки паркетная/инженерная доска должна быть адаптирована (пройти акклиматизацию) к температуре помещения в течение 4-5 дней',
    ],
    icon: svg3,
  },
  {
    title: 'Подбор досок, разметка помещения',
    desc: [
      'Обратите внимание, что дерево — это натуральный продукт, поэтому некоторые вариации в цвете и текстуре неизбежны',
      'Паркетные/инженерные планки необходимо подбирать по цвету и рисунку — чтобы сочетание планок составляло единую картину',
      'Рекомендуется подбирать доски по длинам таким образом, чтобы количество отходов было минимальным',
      'Разбежка между стыками должна быть не менее 15 см',
      'При диагональной укладке необходимо добавить на обрезки 10% к фактической площади помещения',
    ],
    icon: svg4,
  },
  {
    title: 'Укладка доски на основание',
    desc: [
      'Укладка производится на клей (клей наносится на основание зубчатым шпателем, толщина слоя 3 мм)',
      'Перед укладкой на цементную стяжку необходимо нанести грунт',
      'Сначала необходимо собрать первые 2-3 ряда доски, приклеить их и дать время для полимеризации клея',
      'При монтаже для наиболее надёжной фиксации необходимо использовать нагрузку',
      'Между покрытием и стенами по всему периметру следует оставлять зазор 15 мм',
      'При укладке необходимо плотно состыковывать доски в поперечном и продольном направлениях',
      'В помещениях шире 15 м рекомендуется делать компенсационные швы',
      'Между доской и дверными проемами, порогами, колоннами необходимо оставлять компенсационные швы 10-15 мм',
    ],
    icon: svg5,
  },
  {
    title: 'Крепление плинтусов',
    desc: [
      'Плинтус крепится только к стене, но не к паркетной/инженерной доске',
      'Крепление плинтуса осуществляется на клей, на саморезы или на специальные крепления',
    ],
    icon: svg6,
  },
]
</script>
