import UserLayout from '@/views/UserDashboard/UserLayout.vue';
import UserHome from '@/views/UserDashboard/UserViews/UserHome.vue';


export const userRoutes = [
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: 'profile',
        name: 'UserHome',
        component: UserHome,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'bookmarks',
        name: 'BookmarkView',
        component: () => import('@/views/UserDashboard/UserViews/BookmarkView.vue')
      },
      {
        path: 'mfa',
        name: 'MfaAuth',
        component: () => import('@/views/UserDashboard/UserViews/MfaAuth.vue')
      }
    ]
  }
];