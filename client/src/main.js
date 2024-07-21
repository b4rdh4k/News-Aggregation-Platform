import './assets/main.css'
import { initTheme } from './utils/theme'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueCookies } from 'vue-cookies'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000
})

app.use(createPinia())

app.use(VueCookies)

app.use(router)

app.mount('#app')

initTheme()
