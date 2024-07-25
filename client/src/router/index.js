// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/general/HomeView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import HomeLayout from '../layouts/HomeLayout.vue'
import BasicsLayout from '../layouts/BasicsLayout.vue'
import { useUserStore } from '../store/user'

const routes = [
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
        path: 'subscription',
        name: 'Subscription',
        component: () => import('@/views/general/SubscriptionView.vue')
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('../views/Category/CategoriesView.vue')
      },
      {
        path: 'for-you',
        name: 'ForYou',
        component: () => import('../views/general/ForYouView.vue')
      },
      {
        path: 'news/:id',
        name: 'News',
        component: () => import('../components/NewsPage/NewsView.vue')
      },
      {
        path: 'category/:name',
        name: 'Category',
        component: () => import('../views/Category/CategoryView.vue'),
        props: true
      },
      {
        path: 'source/:id',
        name: 'Source',
        component: () => import('../views/Source/SourceView.vue')
      }
    ]
  },
  {
    path: '/',
    component: BasicsLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Account/LoginView.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Account/RegisterView.vue')
      },
      {
        path: 'setup-mfa',
        name: 'SetupMFA',
        component: () => import('@/components/Account/setup-mfa.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = !!userStore.token

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
