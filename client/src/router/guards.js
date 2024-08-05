import { useUserStore } from '../store/user';

export function requireAuth(to, from, next) {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.token;
  
  const isAdminOrSuperadmin = userStore.hasRole('admin') || userStore.hasRole('superadmin');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdminOrSuperadmin) {
    next({ name: 'Home' });
  } else if (to.matched.some(record => record.meta.requiresAdmin) && !userStore.hasRole('admin')) {
    next({ name: 'Home' });
  } else {
    next();
  }
}
