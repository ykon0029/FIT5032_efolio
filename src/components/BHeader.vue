<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <div class="d-flex flex-grow-1 justify-content-center">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Week 5)</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
          </li>
          <!-- Add the new FireRegister link -->
          <li class="nav-item">
            <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
          </li>
        </ul>
      </div>
      <div class="d-flex">
        <ul class="nav">
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <a @click.prevent="logout" class="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script setup>
import { isAuthenticated } from '../router'; // Import the global authentication state
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  isAuthenticated.value = false; // Set isAuthenticated to false on logout
  router.push('/login'); // Redirect to login page
};
</script>
