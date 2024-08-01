<template>
  <section class="showcase" :class="{ active: isActive }">
    <header>
      <div class="logo-container">
        <img :src="earthImage" alt="Earth Image" class="logo-image">
        <h2 class="logo">Green Guard</h2>
      </div>
      <div class="buttons">
        <button class="white-border" @click="toSign">Sign Up</button>
        <button class="white-border" @click="toLogin">Login</button>
      </div>
      <div class="toggle1" @click="toggleMenu1">
        <i :class="['mdi', 'mdi-menu', { active: isActive }]"></i>
      </div>
    </header>
    <div v-if="isActive" class="dropdown-card">
      <button class="white-border" @click="toSign">Sign Up</button>
      <button class="white-border" @click="toLogin">Login</button>
    </div>

    <video :src="videoSource" type="video/mp4" muted loop autoplay></video>
    <div class="overlay"></div>
    <div class="text">
      <h3>Never Stop To</h3>
      <h3>Exploring The World</h3>
      <p>Nature's beauty whispers in the wind, roars in the ocean's waves, and blooms in every petal. It holds the secrets of life in its silent forests and paints the sky with dreams. Embrace its wild grace; it is where the soul finds its truest reflection!</p>
      <a @click="toDisplay">Explore Resources</a>
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
      videoSource: require('@/assets/video2_4k.mp4'),
      earthImage: require('@/assets/earth.png') // Ensure the path is correct
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login-page");
    },
    toSign() {
      this.$router.push("/signup-page");
    },
    toggleMenu1() {
      this.isActive = !this.isActive;
    },
    toDisplay() {
      this.$router.push("/dummy");
    }
  }
};
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

.logo-image {
  width: 100px;
  height: 55;
  margin-right: 10px;
}

header .logo { 
  background: linear-gradient(45deg, #4ab43f, #f0d560);
  background-clip: text;
  -webkit-text-fill-color: transparent;
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
  cursor: pointer;
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
