import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Деревянные изделия ручной работы',
    },
    children: [
      {
        path: '',
        name: 'main',
        component: () => import('@/views/MainPage.vue'),
        meta: {
          title: 'Деревянные изделия ручной работы',
        },
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('@/views/CatalogPage.vue'),
        meta: {
          title: 'Каталог продукции',
        },
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutPage.vue'),
        meta: {
          title: 'О нашей компании',
        },
      },
      {
        path: '/operation',
        name: 'operation',
        component: () => import('@/views/OperationPage.vue'),
        meta: {
          title: 'Эксплуатация',
        },
      },
      {
        path: '/laying',
        name: 'laying',
        component: () => import('@/views/LayingPage.vue'),
        meta: {
          title: 'Инструкция по укладке',
        },
      },
      {
        path: '/characteristics',
        name: 'characteristics',
        component: () => import('@/views/CharacteristicsPage.vue'),
        meta: {
          title: 'Характеристики',
        },
      },
      {
        path: '/galary',
        name: 'galary',
        component: () => import('@/views/GalaryPage.vue'),
        meta: {
          title: 'Галерея',
        },
      },
    ],
  },

  //   {
  //     path: '/product/:id',
  //     name: 'product',
  //     component: () => import('@/views/Product/ProductView.vue'),
  //     props: true,
  //     meta: {
  //       title: 'Информация о товаре',
  //     },
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     component: () => import('@/views/AboutView.vue'),
  //     meta: {
  //       title: 'О нашей компании',
  //     },
  //   },
  //   {
  //     path: '/contacts',
  //     name: 'contacts',
  //     component: () => import('@/views/ContactsView.vue'),
  //     meta: {
  //       title: 'Контакты',
  //     },
  //   },
  //   {
  //     path: '/cart',
  //     name: 'cart',
  //     component: () => import('@/views/CartView.vue'),
  //     meta: {
  //       title: 'Корзина',
  //     },
  //   },
  //   {
  //     path: '/:pathMatch(.*)*',
  //     name: 'not-found',
  //     component: () => import('@/views/NotFoundView.vue'),
  //     meta: {
  //       title: 'Страница не найдена',
  //     },
  //   },
]
