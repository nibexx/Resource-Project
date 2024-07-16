<template>
    <div class="error-container">
      <div class="error-text">
       
        <h1>404 Error Found</h1>
        <p>The Page You Are looking for is not found</p>
        <button  class="home-button mt-5" type="button" @click="toHome">Go To Home</button>
      </div>
      <div class="error-image">
        <img :src="require('@/assets/404error.jpg')" alt="Error Image">
      </div>
    </div>
  </template>
  <script>
export default{
    methods: {
        toHome(){
            this.$router.push("/")
        }   
    }
}
</script>
  <style>
  .error-container {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    height: 100vh; /* Full height of the viewport */
  }
  
  .error-text {
    text-align: center; /* Center text */
    margin-right: 20px; /* Add some space between text and image */
  }
  
  .error-image img {
    width: 250px; /* Set the width of the image */
    height: auto; /* Maintain aspect ratio */
    /* filter: grayscale(100%) brightness(70%); Apply a blue filter */
    transition: filter 0.3s ease; /* Add transition effect */
  }
  
  .error-image img:hover {
    filter: grayscale(0%) brightness(100%); /* Change filter on hover */
  }
  .home-button {
  background-color: blue; /* Set button background color to blue */
  color: white; /* Set text color to white */
  padding: 10px 20px; /* Add some padding */
  border: none; /* Remove default button border */
  border-radius: 5px; /* Add border radius */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background-color 0.3s ease; /* Add transition effect */
}

.home-button:hover {
  background-color: rgb(79, 127, 231); /* Change button background color on hover */
}
p{
  font-size: 18px;
}
  </style>
  