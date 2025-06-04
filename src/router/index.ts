import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/auth",
    component: () =>
      import("@/views/AuthPage.vue") as Promise<typeof import("*.vue")>,
  },
  {
    path: "/profile",
    component: () =>
      import("@/views/ProfilePage.vue") as Promise<typeof import("*.vue")>,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/edit",
    component: () => import("@/views/EditProfilePage.vue") as Promise<typeof import("*.vue")>,
    meta: { requiresAuth: true },
  },
  {
    path: "/tabs",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },
      {
        path: "home",
        component: () => import("@/views/HomePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "jobs",
        component: () => import("@/views/JobsPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "posts",
        component: () => import("@/views/PostsPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: '/job-posts/:id',
        name: 'JobPostDetail',
        component: () => import('@/views/JobPostDetailPage.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/company/register",
        component: () => import("@/views/CompanyRegisterPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "notifications",
        component: () => import("@/views/NotificationsPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "messages",
        component: () => import("@/views/MessagesPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "chat/:id",
        component: () => import("@/views/ChatPage.vue"),
      },
      {
        path: "/jobs/:id/apply",
        component: () => import("@/views/ApplyToJobPage.vue") as Promise<typeof import("*.vue")>,
        meta: { requiresAuth: true },
      },
      {
        path: "my-applications",
        component: () => import("@/views/AplicationPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/company/applications",
        component: () => import("@/views/CompanyApplicationsPage.vue") as Promise<typeof import("*.vue")>,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

import { useAuthStore } from "@/stores/authStore";

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
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

    if (to.path === '/auth' && authStore.isAuthenticated) {
      next('/tabs/home'); // Redirige al home si ya está logueado
    } else {
      next();
    }
  }
});

export default router;
