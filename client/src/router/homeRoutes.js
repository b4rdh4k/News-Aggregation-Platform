import HomeView from '@/views/general/HomeView.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
export const homeRoutes = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/Category/CategoriesView.vue')
      },
      {
        path: 'for-you',
        name: 'ForYou',
        component: () => import('@/views/PersonalizedFeed/ForYouView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'news/:id',
        name: 'News',
        component: () => import('@/components/NewsPage/NewsView.vue')
      },
      {
        path: 'articles',
        name: 'LatestNews',
        component: () => import('@/views/Articles/AllArticles.vue')
      },
      {
        path: '/category/:id',
        name: 'Category',
        component: () => import('@/views/Category/CategoryView.vue'),
        props: true
      },
      {
        path: 'source/:id',
        name: 'Source',
        component: () => import('@/views/Source/SourceView.vue')
      }
    ]
  }
]
