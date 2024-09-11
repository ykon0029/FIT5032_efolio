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
          <li class="nav-item">
            <router-link v-if="!isAuthenticated" to="/FireLogin" class="nav-link" active-class="active">Login</router-link>
            <a v-else @click.prevent="logout" class="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth';

const { isAuthenticated, logout } = useAuth();
</script>
