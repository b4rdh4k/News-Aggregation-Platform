import { createRouter, createWebHistory } from 'vue-router';
import { homeRoutes } from '@/router/homeRoutes';
import { mainRoutes } from '@/router/mainRoutes';
import { basicsRoutes } from '@/router/basicRoutes';
import { requireAuth } from './guards';

const routes = [
  ...homeRoutes,
  ...mainRoutes,
  ...basicsRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(requireAuth);

export default router;
