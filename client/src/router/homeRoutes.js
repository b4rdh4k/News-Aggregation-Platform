import HomeView from '@/views/general/HomeView.vue';
import HomeLayout from '@/layouts/HomeLayout.vue';

export const homeRoutes = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
    ],
  },
];
