<template>
  <div class="page-container">
    <div class="content-container">
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div class="form-group">
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
      
      <h2>Books with ISBN > 1000</h2>
      <ul class="book-list">
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '../main.js'; // Firebase init file
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import BookList from '../components/BookList.vue'; // Importing another component

export default {
  setup() {
    const isbn = ref('');
    const name = ref('');

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        // Add document to Firestore collection
        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value,
        });

        // Reset form inputs
        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    };

    return {
      isbn,
      name,
      addBook,
    };
  },
  components: {
    BookList,
  },
};
</script>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.content-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  margin-bottom: 20px;
}

form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3367d6;
}

ul {
  padding-left: 20px;
}

.book-list {
  padding-left: 40px; /* Increase this value to move items more to the right */
  margin-top: 20px;
}

.book-list li {
  margin-bottom: 10px;
}
</style>