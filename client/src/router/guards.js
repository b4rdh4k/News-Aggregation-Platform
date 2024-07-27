import { useUserStore } from '../store/user';

export function requireAuth(to, from, next) {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.token;
  const isAdmin = userStore.user?.role === '1';

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
    next({ name: 'Home' });
  } else {
    next();
  }
}
