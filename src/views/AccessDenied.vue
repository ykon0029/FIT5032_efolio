<template>
    <div class="access-denied-container">
      <h2>Access Denied</h2>
      <p>You do not have permission to view this page.</p>
      <router-link to="/login" class="btn btn-primary">Go to Login</router-link>
    </div>
  </template>
  
  <script setup>
  // No additional logic needed for this simple page
  </script>
  
  <style scoped>
  .access-denied-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .btn-primary {
    margin-top: 20px;
    width: 100%;
  }
  </style>
  