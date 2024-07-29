<template>
    <div class="welcome-container">
      <div class="welcome-card">
        <h3>Hi {{ userName }} ,</h3>
        <p>Upload your amazing finds and contribute to our growing community of nature enthusiasts! 🌿</p>
        <v-btn  class="upload-btn">
          <v-icon left>mdi-plus</v-icon> Upload Resource
        </v-btn>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      userName() {
        return this.$store.getters.getUserData.name;
      },
    },
  };
  </script>
  
  <style scoped>
  .welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  }
  
  .welcome-card {
    padding: 40px 30px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 450px;
    width: 100%;
  }
  
  .welcome-card h3 {
    margin-bottom: 10px;
    text-align: left;
    font-size: 1.5em;
    color: #333;
  }
  
  .welcome-card p {
    margin-bottom: 20px;
    font-size: 1.1em;
    color: #666;
  }
  
  .upload-btn {
    margin-top: 20px;
    font-weight: bold;
    background-color: green;
    color: white;

  }
  .upload-btn:hover{
    background-color: rgb(29, 90, 29);
    color: white;
  }
  </style>