import AdminLayout from '@/admin/AdminLayout.vue'
import Home from '@/admin/AdminViews/AdminHome.vue'

export const adminRoutes = [
  {
    path: '/',
    redirect: '/admin', 
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: Home,
      },
      {
        path: 'users',
        name: 'UserModeration',
        component: () => import('@/admin/AdminViews/UserModeration.vue')
      },
      {
        path: 'comments',
        name: 'CommentModeration',
        component: () => import('@/admin/AdminViews/CommentModeration.vue')
      }
    ]
  }
];