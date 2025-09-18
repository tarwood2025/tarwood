import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/main.css'
import { createYmaps } from 'vue-yandex-maps'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(
  createYmaps({
    apikey: '28950681-8056-469c-b028-6245654e3caa',
  }),
)
app.mount('#app')
