import { createRouter, createWebHistory } from 'vue-router';
import { homeRoutes } from '@/router/homeRoutes';
import { mainRoutes } from '@/router/mainRoutes';
import { basicsRoutes } from '@/router/basicRoutes';
import {adminRoutes} from '@/router/adminRoutes';
import { requireAuth } from './guards';

const routes = [
  ...homeRoutes,
  ...mainRoutes,
  ...basicsRoutes,
  ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(requireAuth);

export default router;
