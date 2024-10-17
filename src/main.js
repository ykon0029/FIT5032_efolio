// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css' 

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHE0OwC89V2nt8JxHGHaIM4yqL08BWGk0",
  authDomain: "week7-yungshing-d1932.firebaseapp.com",
  projectId: "week7-yungshing-d1932",
  storageBucket: "week7-yungshing-d1932.appspot.com",
  messagingSenderId: "683242667194",
  appId: "1:683242667194:web:4ec6d84b59d8b671619683"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); // Create Firestore instance

export { db }; // Export the db instance

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark',
        }
    }
});
app.use(router)

app.mount('#app')

