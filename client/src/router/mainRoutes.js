export const mainRoutes = [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'news/:id',
          name: 'News',
          component: () => import('@/components/NewsPage/NewsView.vue'),
          props: route => ({ id: route.params.id })
        },
      ],
    },
  ];
  