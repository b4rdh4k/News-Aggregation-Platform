import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import MainLayout from '../layouts/MainLayout.vue';
import BasicsLayout from '../layouts/BasicsLayout.vue';

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
      },
    ],
  },
  {
    path: '/',
    component: BasicsLayout,
    children: [
     
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
