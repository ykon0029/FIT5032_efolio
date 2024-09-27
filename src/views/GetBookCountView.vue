<template>
    <div id="app" class="container">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <div class="form-container">
        <input v-model="isbn" placeholder="Enter ISBN" />
        <input v-model="name" placeholder="Enter Book Name" />
        <button @click="addBook">Add Book</button>
      </div>
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        count: null,
        error: null,
        isbn: '', // Model for ISBN input
        name: '', // Model for Book Name input
      };
    },
    methods: {
      async getBookCount() {
        try {
          const response = await axios.get('https://countbooks-as3pekg27q-uc.a.run.app');
          this.count = response.data.count;
          this.error = null;
        } catch (error) {
          console.error('Error fetching book count:', error);
          this.error = error;
          this.count = null;
        }
      },
      async addBook() {
        if (!this.isbn || !this.name) {
          this.error = "Please enter both ISBN and book name.";
          return;
        }
  
        try {
          const newBook = {
            isbn: this.isbn.trim(),
            name: this.name.trim()
          };
          await axios.post('https://addbook-as3pekg27q-uc.a.run.app', newBook);
          alert('Book added successfully!');
  
          // Clear the input fields after submission
          this.isbn = '';
          this.name = '';
  
          // Optionally, update the book count
          this.getBookCount();
        } catch (error) {
          console.error('Error adding book:', error);
          this.error = error.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    background-color: #f9f9f9;
  }
  
  button {
    background-color: #3a3a3a;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;
  }
  
  .form-container {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input {
    margin: 5px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
  }
  
  p {
    font-size: 18px;
    margin-top: 15px;
    color: #333;
  }
  </style>
  