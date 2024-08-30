<template>
  <div class="about-container">
    <div class="about">
      <h1 class="text-center">About Our Library</h1>
      <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
    </div>
  </div>
</template>

<script setup>
  // No script needed for now
</script>

<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh; /* Full height of the viewport */
  text-align:start; /* Centers the text inside the container */
}

.about {
  max-width: 600px; /* Optional: Limit the width of the text */
}
</style>
