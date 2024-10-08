<template>
  <div id="root">
    <!-- Header Component -->
    <nav class="navBar">
      <h5 class="nav-heading">Natural</h5>
      <div class="nav-buttons">
        <button class="white-border" @click="toLogout">Logout</button>
      </div>
    </nav>

    <!-- Card Container Component -->
    <div class="card-container" v-motion-fade-visible>
      <div class="card" v-for="(city, index) in cities" :key="index" :class="{ 'is-flipped': city.showDetails }" @click="toggleDetails(city)">
        <div class="card-front">
          <div class="card-header" @click.stop="openModal(city.image)">
            <img :src="'data:image/jpeg;base64,'+city.image" :width="306.92" :height="215.02" />
          </div>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <h3>{{ city.saverName }}</h3>
              <button class="location-btn mdi mdi-map-marker-radius"></button>
            </div>
            <p class="text-subtitle-1" style="font-family:Verdana, Geneva, Tahoma, sans-serif">category : {{ city.category }}</p>
            <p class="text-subtitle-2 mb-2">district : {{ city.district }}</p>
            <p style="font-weight: 400;">{{ shortenedDescription(city.description) }}</p>
            <button class="btn py-1 mt-2 ps-0" @click.stop="toggleDetails(city)">
              {{ city.showDetails ? 'Show Less' : 'Read More' }}
            </button>
          </div>
        </div>
        <div class="card-back">
          <div class="card-body">
            <h3>{{ city.saverName }}</h3>
            <hr>
            <p class="scrollable-description">{{ city.description }}</p>
          </div>
        </div>
      </div>

      <div v-if="showModal" class="modal" @click="closeModal">
        <div class="modal-content">
          <img :src="'data:image/jpeg;base64,'+modalImage" @click.stop />
        </div>
      </div>
    </div>
  </div>
  <footer-page></footer-page>
</template>

<script>
import axios from 'axios';
import FooterPage from './FooterPage.vue';


export default {
  data() {
    return {
      components: {
        FooterPage
      },
      cities: [],
      showModal: false,
      modalImage: ''
    };
  },
  created() {
    this.fetchCities();
  },
  methods: {
    async fetchCities() {
      try {
        const response = await axios.get('http://192.168.1.6:8080/GreenGuard/getAll');
        console.log(response.data);
        this.cities = response.data;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    toLogout() {
      // Logic for Logout button
      console.log("Logout clicked");
      this.$router.push('/login-page'); // Navigate to LoginPage.vue
    },
    toggleDetails(city) {
      // Flip the card by toggling showDetails property
      city.showDetails = !city.showDetails;
    },
    shortenedDescription(description) {
      // Display first 13 words of description
      const words = description.split(' ');
      if (words.length > 13) {
        return words.slice(0, 13).join(' ') + '...';
      } else {
        return description;
      }
    },
    openModal(image) {
      this.modalImage = image;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalImage = '';
    }
  }
};
</script>

<style scoped>
/* Header Styles */
.navBar {
  width: 100%;
  background-color: #25383c;
  color: white;
  padding: 10px 20px;
  display: flex;
  margin-left: 5px;
  margin-right: 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
}
.nav-heading {
  margin: 0;
  font-size: 2rem;
  color: white;
  text-transform: uppercase;
}
.nav-buttons {
  display: flex;
  gap: 10px;
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

/* Card Container Styles */
.card-container {
  padding: 0 1rem;
  counter-reset: card;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  max-width: 92%;
  margin: 0 auto;
}
.card {
  margin: 1em 0;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  display: grid;
  grid-template-rows: 1fr;
  cursor: pointer;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform-style: preserve-3d;
  position: relative;
  perspective: 1000px;
}
.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 2px solid #000;
  border-radius: 1rem;
  background: #fff;
}
.card-front {
  z-index: 2;
  transform: rotateY(0deg);
}
.card-back {
  transform: rotateY(50deg);
  color: #000;
  padding: 1rem;
}
.card.is-flipped {
  transform: rotateY(50deg);
}
.card-header {
  aspect-ratio: 16/12;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;
  position: relative;
}
.card-header::after {
  content: "";
  position: absolute;
  inset: auto 0 0 auto;
  margin-bottom: .5em;
  font-size: 6em;
  color: var(--accent);
  font-weight: 800;
  opacity: .75;
}
.card img {
  min-height: 100%;
  max-inline-size: 100%;
  object-fit: cover;
}
.card-body {
  padding: 1rem;
  height: 220px;
}
.card-footer {
  display: grid;
  align-items: center;
}
.card h3 {
  margin: 0;
  position: relative;
  font-size: 2rem;
  font-weight: 600;
}
.card-body p {
  font-weight: 200;
  font-size: 1rem;
  margin: 0;
}
.btn {
  font-weight: regular;
  border-radius: .5rem;
  padding: 14px 20px;
  font-size: 13px;
  outline: none;
  max-width: 42%;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  transition: all .3s;
  background-color: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}
.location-btn {
  border: 1px solid #007bff; /* Blue outline */
  color: #007bff; /* Blue text */
  background-color: transparent;
  padding: 4px 10px;
  border-radius: 4px;
  margin-top: 8px;
  margin-bottom: 5px;
}
.scrollable-description {
  max-height: 370px; /* Adjust the height as needed */
  overflow-y: auto;  /* Enables vertical scrolling */
}
/* Custom scrollbar for WebKit browsers */
.scrollable-description::-webkit-scrollbar {
  width: 2px ; /* Adjust the width as needed */
}
.scrollable-description::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-radius: 10px;
}
.scrollable-description::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
.scrollable-description::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* Custom scrollbar for Firefox */
.scrollable-description {
  scrollbar-width: thin; /* "auto" or "thin" */
  scrollbar-color: #888 #f1f1f1; /* thumb and track color */
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8); 
  /* background-color: transparent; */
}
.modal-content {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent; /* Ensure background is transparent */
  border: none; /* Remove any border */
}
.modal-content img {
  max-width: 900px;
  max-height: 900px;
  border-radius: 1rem;
}

/* Footer Styles */
footer {
  width: 100%;
  background-color: #333;
  color: #ddd;
  padding: 1rem 0;
  position: relative;
  bottom: 0;
}
footer .mdi {
  font-size: 24px;
  margin-right: 10px;
}
footer a {
  color: #ddd;
  text-decoration: none;
  margin: 0 15px;
}
footer a:hover {
  color: #fff;
}
</style>
