<template>
    <div id="app" class="container">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <div class="form-container">
        <h1>Add a book</h1> 
        <input v-model="isbn" placeholder="Enter ISBN" />
        <input v-model="name" placeholder="Enter Book Name" />
        <button @click="addBook">Add Book</button>
      </div>
      <p v-if="error">{{ error }}</p>
      <p v-if="successMessage">{{ successMessage }}</p>
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
        successMessage: null, // Success message to display after adding a book
      };
    },
    methods: {
      async getBookCount() {
        try {
          const response = await axios.get('https://countbooks-as3pekg27q-uc.a.run.app');
          this.count = response.data.count;
          this.error = null;
          this.successMessage = null; // Clear success message when fetching count
        } catch (error) {
          console.error('Error fetching book count:', error);
          this.error = error.message;
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
            name: this.name.trim(),
          };
          await axios.post('https://addbook-as3pekg27q-uc.a.run.app', newBook);
  
          // Display success message
          this.successMessage = `A new book "${newBook.name}" with ISBN "${newBook.isbn}" is added.`;
          
          // Clear the input fields after submission
          this.isbn = '';
          this.name = '';
          this.error = null; // Clear any previous error
        } catch (error) {
          console.error('Error adding book:', error);
          this.error = error.message;
          this.successMessage = null; // Clear success message on error
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
    margin-bottom: 20px; /* Added margin for spacing */
  }
  
  button:hover {
    background-color: #555;
  }
  
  .form-container {
    margin: 30px 0; /* Increased margin for more space */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h1 {
    margin-bottom: 15px; /* Added margin below the form title */
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
  