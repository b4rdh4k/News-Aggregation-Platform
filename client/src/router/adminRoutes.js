import { useUserStore } from '@/store/user';
import AdminLayout from '@/admin/AdminLayout.vue';
import Home from '@/admin/AdminViews/AdminHome.vue';

const checkAdminOrPremium = (to, from, next) => {
  const userStore = useUserStore();
  const userRole = userStore.decodedToken?.role?.toLowerCase();
  
  console.log('Decoded Token:', userStore.decodedToken); 
  console.log('User Role:', userRole); 

  const isAdminOrSuperAdmin = userRole === 'admin' || userRole === 'superadmin';
  console.log('Is Admin or Premium:', isAdminOrSuperAdmin); 

  if (isAdminOrSuperAdmin) {
    next();
  } else {
    console.log('Redirecting to Home'); 
    next({ name: 'Home' });
  }
};

export const adminRoutes = [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: checkAdminOrPremium,
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: Home,
      },
      {
        path: 'users',
        name: 'UserModeration',
        component: () => import('@/admin/AdminViews/UserModeration.vue'),
        beforeEnter: checkAdminOrPremium,
      },
      {
        path: 'comments',
        name: 'CommentModeration',
        component: () => import('@/admin/AdminViews/CommentModeration.vue'),
        beforeEnter: checkAdminOrPremium,
      }
    ]
  }
];
