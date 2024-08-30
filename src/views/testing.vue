<template>
    <div class="container">
      <header class="d-flex justify-content-between align-items-center py-3">
        <div class="d-flex flex-grow-1 justify-content-center">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Week 5)</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <router-link to="/about" class="nav-link" active-class="active">About</router-link>
            </li>
          </ul>
        </div>
        <div class="d-flex">
          <ul class="nav">
            <li class="nav-item">
              <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  </template>
  
  <script setup>
  import { isAuthenticated } from '../router'; // Import the global authentication state
  </script>
  