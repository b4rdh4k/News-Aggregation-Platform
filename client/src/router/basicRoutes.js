export const basicsRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/BasicsLayout.vue'),
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
      },
      {
        path: 'subscription',
        name: 'Subscription',
        component: () => import('@/views/Subscription/SubscriptionView.vue')
      },
      {
        path: 'success',
        name: 'Success',
        component: () => import('@/views/Subscription/SuccessPayment.vue')
      },
      {
        path: 'cancel',
        name: 'Cancel',
        component: () => import('@/views/Subscription/CancelPayment.vue')
      }
    ]
  }
]
