<template>
  <section class="showcase" :class="{ active: isActive }">
    <header>
      <div class="logo-container">
        <h2 class="logo">Natural </h2>
      </div>
      <div class="buttons">
        <button class="white-border" @click="toSign">Sign In</button>
        <button class="white-border" @click="toLogin">Login</button>
      </div>
      <div class="toggle1" @click="toggleMenu1">
        <i :class="['mdi', 'mdi-menu', { active: isActive }]"></i>
      </div>
    </header>
    <div v-if="isActive" class="dropdown-card">
      <button class="white-border" @click="toSign">Sign In</button>
      <button class="white-border" @click="toLogin">Login</button>
    </div>
  
    <video  :src="videoSource" type="video/mp4" muted loop autoplay></video>
    <div class="overlay"></div>
    <div class="text">
      <h3>Never Stop To</h3>
      <h3>Exploring The World</h3>
      <p>Nature's beauty whispers in the wind, roars in the ocean's waves, and blooms in every petal. It holds the secrets of life in its silent forests and paints the sky with dreams. Embrace its wild grace; it is where the soul finds its truest reflection !</p>
      <a href="#">Explore</a>
    </div>
    <ul class="social">
      <li><a href="https://www.instagram.com/"><img src="https://i.ibb.co/x7P24fL/facebook.png"></a></li>
      <li><a href="#"><img src="https://i.ibb.co/Wnxq2Nq/twitter.png"></a></li>
      <li><a href="#"><img src="https://i.ibb.co/ySwtH4B/instagram.png"></a></li>
    </ul>
  </section>
  
</template>

 <script>
export default {
  data() {
    return {
      isActive: false,
       videoSource: require('@/assets/5441677-hd_1920_1080_24fps.mp4')
    }
  },
    methods:{
      toLogin() {
      this.$router.push("/login-page");
    },
    toSign() {
      this.$router.push("/signup-page");
    },
    toggleMenu1() {
      this.isActive = !this.isActive;
    },
    }
  }

;
</script> 

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
@import url('https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 40px 100px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

header .logo {
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}

.buttons {
  display: flex;
  align-items: center;
  margin-left: auto; /* Pushes buttons to the right */
}

.white-border {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  padding: 10px 30px;
  margin: 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.white-border:hover {
  background-color: #fff;
  color: #111;
}

.toggle1 {
  display: none;
  font-size: 2em;
  color: #fff;
  cursor: pointer;
}

.showcase {
  position: absolute;
  right: 0;
  width: 100%;
  min-height: 100vh;
  padding: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  transition: 0.5s;
  z-index: 2;
}

.showcase video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: overlay;
}

.text {
  position: relative;
  z-index: 10;
}

.text h2 {
  font-size: 5em;
  font-weight: 800;
  color: #fff;
  line-height: 1em;
  text-transform: uppercase;
}

.text h3 {
  font-size: 2.6em;
  font-weight: 700;
  color: #fff;
  line-height: 1em;
  text-transform: uppercase;
}

.text p {
  font-size: 1.1em;
  color: #fff;
  margin: 20px 0;
  font-weight: 400;
  max-width: 700px;
}

.text a {
  display: inline-block;
  font-size: 1em;
  background: #fff;
  padding: 10px 30px;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
  margin-top: 10px;
  color: #111;
  letter-spacing: 2px;
  transition: 0.2s;
}

.text a:hover {
  letter-spacing: 6px;
}

.social {
  position: absolute;
  z-index: 10;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social li {
  list-style: none;
}

.social li a {
  display: inline-block;
  margin-right: 20px;
  filter: invert(1);
  transform: scale(0.5);
  transition: 0.5s;
  color: #fff; /* Make sure to set the color to white here */
}

.social li a:hover {
  transform: scale(0.5) translateY(-15px);
  color: #fff; /* Ensure the color is white on hover */
}

@media (max-width: 1000px) {
  header {
    padding: 20px 50px;
  }

  .buttons {
    display: none;
  }

  .toggle1 {
    display: block;
  }

  .dropdown-card {
    position: absolute;
    top: 70px;
    right: 50px;
    background: rgba(255, 255, 255, 0.2);
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dropdown-card .white-border {
    margin: 10px 0;
  }
}
</style>
<!-- <template>
  <div class="front-page">
     Navigation Bar 
    <nav class="navbar">
   
      <div class="logo">
        <img src="@/assets/logo1.png" alt="Nature Friendly" />
      </div>
      
      <ul class="nav-links">
        <li><a href="#">Log In</a></li>
        <li><a href="#">Sign Up</a></li>
      </ul>
    </nav>-->

    <!-- Call to Action Section
    <section class="call-to-action">
     
      <div class="background-video-container">
        <video autoplay loop muted plays-inline class="background-video">
          <source :src="videoSource" type="video/mp4"/>
         
        
        </video>
      </div>
      <div class="content">
        <h1>Welcome to Nature Friendly</h1>
        <p>Discover the beauty of nature and join us in preserving our planet.</p>
        <a href="#" class="btn">Learn More</a>
      </div>
    </section>
 -->
    <!-- Description Section with Animations
    <section class="description">
      <div class="container">
        <div class="description-text" v-scroll-reveal="{ delay: 200, scale: 0.5, duration: 800, distance: '50px' }">
          <h2>About Nature Friendly</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris quis aliquam dictum. Fusce in massa sed ex consectetur dapibus non eget odio.</p>
          <p>Integer nec eros ligula. Sed id tellus vitae nunc varius vulputate vel et dolor. Mauris in est ut libero iaculis dictum. Phasellus quis libero id eros efficitur vulputate.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
       videoSource: require('@/assets/5441677-hd_1920_1080_24fps.mp4')

    };
  }
};
</script>

<style scoped>
/* Navigation Bar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: black;
  height: 78px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.logo img {
  max-height: 40px;
}

.nav-links li {
  display: inline-block;
  margin-right: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  transition: outline 0.3s;
}

.nav-links a:hover {
  outline: 3px solid #4CAF50;
  border-radius: 16px;
  background-color: #4CAF50;
} -->

<!-- .background-video-container {
  width: 500px;
  height: 100%;
 
} */
.background-video-container {
  max-width: 100%; /* Adjust this width as needed */
  height: auto; /* Maintain aspect ratio */
}

.background-video {
  width: 100%;
  height: auto;
}

.call-to-action .content {
  position: relative;
  z-index: 1;
}

.call-to-action h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.call-to-action p {
  font-size: 18px;
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #45a049;
}

/* Description Section Styles */
.description {
  padding: 50px 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.description-text {
  text-align: center;
}

.description-text h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.description-text p {
  font-size: 16px;
  margin-bottom: 10px;
}
</style> -->


<!-- <template>
    <h2>This is the Main Page</h2>
    <button  class="home-button" type="button" @click="toUpload">Upload The Resources</button>
    <div class="card-container">
    <div v-for="(gal, index) in limitedGallery" :key="index" class="card">
      <img :src="gal.image" alt="Gallery Image" class="card-image" />
      <div class="card-content">
        <h2 class="card-title">{{ gal.name }}</h2>
        <p class="card-description">{{ gal.description }}</p>
      </div>
    </div>
  </div>
  <router-link to="/display-resorces" class="view-more">View More</router-link>
    </template>
  <script>
  export default{
      methods: {
          toUpload(){
              this.$router.push("/file-upload")
          }   
      }
  }
  </script> -->
  <!-- <style> -->
  <!-- /* .home-button {
  background-color: blue; /* Set button background color to blue */
  color: white; /* Set text color to white */
  padding: 10px 20px; /* Add some padding */
  border: none; /* Remove default button border */
  border-radius: 5px; /* Add border radius */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background-color 0.3s ease; /* Add transition effect */
  margin-top: 60px; */ -->
  
<!-- }

.home-button:hover {
  background-color: rgb(79, 127, 231); /* Change button background color on hover */
}
</style> -->