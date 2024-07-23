import './assets/main.css'
import { initTheme } from './utils/theme'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { Tabs, Tab } from 'vue3-tabs-component'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from './store/user'

const app = createApp(App)

app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000
})

app.component('TabsComponent', Tabs)
app.component('TabComponent', Tab)

const pinia = createPinia()
app.use(pinia)

const userStore = useUserStore(pinia) 
if (localStorage.getItem('token')) {
  userStore.token = localStorage.getItem('token')
}

app.use(router)

app.mount('#app')

initTheme()
