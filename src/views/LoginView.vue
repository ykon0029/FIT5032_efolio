<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-control"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isAuthenticated } from '../router'; // Import the global authentication state
  
  // Hardcoded credentials
  const hardcodedUsername = 'user';
  const hardcodedPassword = 'password';
  
  // Reactive variables for form data
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  // Router instance to navigate after login
  const router = useRouter();
  
  // Function to handle form submission and authentication
  const handleSubmit = () => {
    if (username.value === hardcodedUsername && password.value === hardcodedPassword) {
      isAuthenticated.value = true;
      errorMessage.value = '';
      console.log('Authentication successful!');
      router.push('/about'); // Redirect to About page after successful login
    } else {
      isAuthenticated.value = false;
      errorMessage.value = 'Invalid username or password.';
      console.log('Authentication failed.');
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .btn-primary {
    width: 100%;
  }
  </style>
  