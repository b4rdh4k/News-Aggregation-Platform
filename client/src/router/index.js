// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MainLayout from '../layouts/MainLayout.vue';
import BasicsLayout from '../layouts/BasicsLayout.vue';
import { useUserStore } from '../store/user';

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
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Account/LoginView.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Account/RegisterView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.token;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
