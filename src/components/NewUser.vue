<template>
    <div class="profile-page-container">
      <div class="profile-page">
        <div class="welcome-message">
          <h2>Welcome {{ userName }} </h2>
          <p>It looks like you're new here. Let's get started by adding your first resource.</p>
          <!-- Use a button with a dynamic image -->
          <button @click="addResource" class="upload-button">
            <img :src="uploadIcon" alt="Upload Icon">
          </button>
        </div>
        <!-- Additional content or components can be added here -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        uploadIcon: require('@/assets/png-transparent-green-upload-icon-or-logo.png') // Assuming this is your image path
      };
    },
    methods: {
      addResource() {
        this.$router.push('/file-upload');
      }
    },
    computed:{
        userName(){
        return this.$store.getters.getName
       
    },
    }
  };
  </script>
  
  <style scoped>
  .profile-page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .profile-page {
    max-width: 800px;
    padding: 40px;
    text-align: center;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .welcome-message {
    margin-bottom: 40px;
  }
  
  .welcome-message h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .welcome-message p {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 20px;
  }
  
  .upload-button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .upload-button img {
    width: 94px; /* Adjust size as needed */
    height: 94px; /* Adjust size as needed */
    transition: transform 0.3s ease; /* Optional: Add a hover effect */
  }
  
  .upload-button:hover img {
    transform: scale(1.1); /* Optional: Add a hover effect */
  }
  </style>
  