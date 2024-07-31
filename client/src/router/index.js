import { createRouter, createWebHistory } from 'vue-router';
import { homeRoutes } from '@/router/homeRoutes';
import { mainRoutes } from '@/router/mainRoutes';
import { basicsRoutes } from '@/router/basicRoutes';
import {adminRoutes} from '@/router/adminRoutes';
import { requireAuth } from './guards';
import UserProfile from '@/views/Account/UserProfile.vue';

const routes = [
  ...homeRoutes,
  ...mainRoutes,
  ...basicsRoutes,
  ...adminRoutes,
  { path: '/profile',
    name: 'UserProfile', 
    component: UserProfile, 
    meta: { requiresAuth: true } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(requireAuth);

export default router
