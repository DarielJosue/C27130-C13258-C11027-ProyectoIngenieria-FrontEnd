import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
//import { useAuthStore } from '@/stores/auth'; // Importar store de autenticación

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    component: () => import('@/views/AuthPage.vue') as Promise<typeof import('*.vue')>,
  },
  {
    path: '/profile',
    component: () => import('@/views/ProfilePage.vue') as Promise<typeof import('*.vue')>,
  },
  {
    path: '/tabs',
    component: TabsPage,
    children: [ 
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'jobs',
        component: () => import('@/views/JobsPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'posts',
        component: () => import('@/views/PostsPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'notifications',
        component: () => import('@/views/NotificationsPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'messages',
        component: () => import('@/views/MessagesPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'chat/:id',
        component: () => import('@/views/ChatPage.vue'),
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

/*/ Guardián de navegación global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Verificar si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({
        path: '/auth',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    // Si el usuario ya está autenticado y trata de acceder al login
    if (to.path === '/auth' && authStore.isAuthenticated) {
      next('/tabs/home'); // Redirige al home si ya está logueado
    } else {
      next();
    }
  }
});*/

export default router;