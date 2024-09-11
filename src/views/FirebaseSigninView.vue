<template>
  <div class="signin-container">
    <h1>Sign in</h1>
    <div class="form-group">
      <input type="text" placeholder="Email" v-model="email" />
    </div>
    <div class="form-group">
      <input type="password" placeholder="Password" v-model="password" />
    </div>
    <div class="form-group">
      <select v-model="selectedRole">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <div class="form-group">
      <button @click="handleSignin">Sign in via Firebase</button>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useAuth } from '../composables/useAuth'

const { isAuthenticated, signin } = useAuth()

const email = ref("")
const password = ref("")
const selectedRole = ref("user") // Default to 'user'
const errorMessage = ref("")

const handleSignin = async () => {
  errorMessage.value = await signin(email.value, password.value, selectedRole.value)
}
</script>

<style scoped>
.signin-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #007bff;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 15px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
