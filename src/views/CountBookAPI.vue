<template>
    <div class="top-center-container">
      <!-- Display JSON data fetched from the API -->
      <pre>{{ jsondata }}</pre>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        jsondata: null,  // Holds the JSON response data
        error: null,     // Holds any error message
      };
    },
    mounted() {
      // Automatically fetch the data when the component is mounted
      this.getBookCountAPI();
    },
    methods: {
      async getBookCountAPI() {
        try {
          const response = await axios.get(
            'https://countbooks-as3pekg27q-uc.a.run.app'
          );
          this.jsondata = response.data;  // Store the fetched JSON data
          this.error = null;
        } catch (error) {
          console.error("Error fetching book count:", error);
          this.error = error;  // Capture the error message
          this.jsondata = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .top-center-container {
    display: flex;
    justify-content: center;  /* Horizontally center */
    align-items: flex-start;  /* Align to the top */
    height: 100vh;            /* Full viewport height */
    padding-top: 20px;        /* Optional padding from the top */
    text-align: center;
  }
  pre {
    font-size: 1.2rem;
    line-height: 1.5;
  }
  </style>
  