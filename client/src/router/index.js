import { useAuthStore } from '@/stores/AuthStore';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/Posts.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/BlogPostView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    // Protected routes
    {
      path: '/create-post',
      name: 'create-post',
      component: () => import('@/views/CreatePostView.vue'),
      meta: {
        requiresAuth: true,
        roles: [],
      },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountView.vue'),
      meta: {
        requiresAuth: true,
        roles: [],
      },
      children: [
        { path: 'posts', name: 'posts-tab', component: () => import('@/components/organisms/PostsTab.vue'), meta: { requiresAuth: true, roles: [] } },
        {
          path: 'users',
          name: 'users-Tab',
          component: () => import('@/components/organisms/UsersTab.vue'),
          meta: { requiresAuth: true, roles: ['admin'] },
        },
        {
          path: '',
          name: 'default',
          redirect: { name: 'posts-tab' },
        },
      ],
    },
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    const requiredRoles = to.meta.roles;

    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = authStore.userRole;

      if (requiredRoles.includes(userRole)) {
        next();
      } else {
        // Redirect to the home page or another route for unauthorized access
        next('/');
      }
    } else {
      // If no roles are specified for the route, proceed to the route
      next();
    }
  }
});

export default router;
