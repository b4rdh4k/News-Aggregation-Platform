import './assets/style/main.css'
import { initTheme } from './utils/theme'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import Scroll2TopButton from './components/shared/ScrollToTopButton.vue'
import { VueStripe } from '@vue-stripe/vue-stripe';

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

app.use(VueStripe, {
  pk: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
});

app.component('ScrollToTopButton', Scroll2TopButton)

const pinia = createPinia()
app.use(pinia)

const userStore = useUserStore(pinia)
if (localStorage.getItem('token')) {
  userStore.token = localStorage.getItem('token')
}

app.use(router)

app.mount('#app')

initTheme()
