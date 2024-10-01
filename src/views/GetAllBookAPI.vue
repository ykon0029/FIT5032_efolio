<template>
    <div class="top-center-container">
      <!-- Display JSON data fetched from the API -->
      <pre>{{ bookData }}</pre>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        bookData: null,  // Holds the JSON response for all books
        error: null,     // Holds any error message
      };
    },
    mounted() {
      // Automatically fetch all book data when the component is mounted
      this.getAllBooksAPI();
    },
    methods: {
      async getAllBooksAPI() {
        try {
          const response = await axios.get(
            'https://getallbooks-as3pekg27q-uc.a.run.app'  
          );
          this.bookData = response.data;  // Store the fetched JSON data
          this.error = null;
        } catch (error) {
          console.error("Error fetching all books:", error);
          this.error = error;  // Capture the error message
          this.bookData = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .top-center-container {
    display: flex;
    justify-content: center;  
    align-items: flex-start;  
    padding-top: 20px;
    text-align: center;
  }
  pre {
    font-size: 1.2rem;
    line-height: 1.5;
  }
  </style>
  