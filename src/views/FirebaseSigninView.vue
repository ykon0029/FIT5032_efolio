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
      <button @click="signin">Sign in via Firebase</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Sign In Successful!")
      router.push("/")
      console.log(auth.currentUser) // To check the current User signed in
    })
    .catch((error) => {
      console.log(error.code)
    })
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
</style>
