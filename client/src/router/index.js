import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import MainLayout from '../layouts/MainLayout.vue';
import BasicsLayout from '../layouts/BasicsLayout.vue';
import SigninView from '@/views/SigninView.vue';
import SignupView from '@/views/SignupView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'about',
        name: 'About',
        component: AboutView,
      }
    ],
  },
  {
    path: '/',
    component: BasicsLayout,
    children: [
      {
        path: 'sign-in',
        name: 'Signin',
        component: SigninView,
      },
      {
        path: 'sign-up',
        name: 'Signup',
        component: SignupView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
