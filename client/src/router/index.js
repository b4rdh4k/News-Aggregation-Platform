import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
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
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: 'news/:id',
        name: 'News',
        component: () => import('../components/NewsPage/NewsView.vue'),
      },
      {
        path: 'category/:id',
        name: 'Category',
        component: () => import('../views/Category/CategoryView.vue'),
      },
      {
        path: 'source/:id',
        name: 'Source',
        component: () => import('../views/Source/SourceView.vue'),
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
