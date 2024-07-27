export const adminRoutes = [
    {
      path: '/',
      component: () => import('@/admin/AdminLayout.vue'),
      children: [
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('@/admin/AdminViews/AdminHome.vue'),
          },
      ],
    },
  ];
  