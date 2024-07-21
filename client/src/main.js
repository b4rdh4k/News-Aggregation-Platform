import './assets/main.css'
import { initTheme } from './utils/theme'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueCookies } from 'vue-cookies'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(VueCookies)

app.use(router)

app.mount('#app')

initTheme()
