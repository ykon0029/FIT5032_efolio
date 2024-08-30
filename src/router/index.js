import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import AccessDeniedView from '../views/AccessDenied.vue';
import { ref } from 'vue';

// Simulate a global authentication state
export const isAuthenticated = ref(false);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next('/access-denied'); // Redirect to Access Denied if not authenticated
      } else {
        next(); // Allow access if authenticated
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
