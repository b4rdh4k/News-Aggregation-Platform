import { useUserStore } from '../store/user';

export function requireAuth(to, from, next) {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.token;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
}
