import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import AccessDeniedView from '../views/AccessDenied.vue';
import { ref } from 'vue';
import FirebaseSigninView from '../views/FirebaseSigninView.vue';
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue';  // Add this import
import AddBookView from '../views/AddBookView.vue';  // Add this import
import BookList from '../components/BookList.vue';  // Add this import
import GetBookCountView from '@/views/GetBookCountView.vue';

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
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/books',
    name: 'booklist',
    component: BookList 
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
