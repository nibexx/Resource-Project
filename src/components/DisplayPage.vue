<template>
  <div id="root">
    <!-- Header Component -->
    <nav class="navBar">
      <h5 class="nav-heading">Natural</h5>
      <div class="nav-buttons">
        <button class="white-border" @click="toSign">Sign Up</button>
        <button class="white-border" @click="toLogin">Login</button>
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
      const response = await axios.get ('http://192.168.1.26:8080/GreenGuard/getAll');
        console.log(response.data);
        this.cities = response.data;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    toSign() {
      // Logic for Sign Up button
      console.log("Sign Up clicked");
    },
    toLogin() {
      // Logic for Login button
      console.log("Login clicked");
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
  transform: rotateY(180deg);
  color: #000;
  padding: 1rem;
}
.card.is-flipped {
  transform: rotateY(180deg);
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


<!--
this is the original code


<template>
  <div id="root">

    <header-page></header-page> -->

      <!-- Filter Dropdowns -->
    
      <!-- <div class="filters"> -->
        <!-- Category Filter -->
        <!-- <div class="category">
          <label for="categoryDropdown">
            <i class="mdi mdi-filter-menu mr-3" style="color: white;"></i>  
          </label>
          <select id="categoryDropdown" v-model="selectedCategory" @change="applyFilters">
            <option  value=""  >Filter Category</option>
            <option class="dropdown" v-for="category in categories" :key="category">{{ category }}</option>
          </select>
        </div>

        
        <div class="district">
         
          <select id="districtDropdown" v-model="selectedDistrict" @change="applyFilters">
            <option value=""  >Filter Districts</option>
            <option class="dropdown" v-for="district in districts" :key="district">{{ district }}</option>
          </select>
        </div>
      </div> -->
   


    <!-- Card Container Component
    <div class="card-container" v-motion-fade-visible>
      <div class="card" v-for="(city, index) in cities" :key="index" :class="{ 'is-flipped': city.showDetails }" @click="toggleDetails(city)">
       Card Front -->
        <!-- <div class="card-front">
          <div class="card-header" @click.stop="openModal(city.image)">
            <img :src="'data:image/jpeg;base64,'+city.image" :width="310.92" :height="215.02" />
          </div>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <h3>{{ city.saverName }}</h3>
              <button class="location-btn mdi mdi-map-marker-radius"></button>
            </div>
            <p class="text-subtitle-1">Category: {{ city.category }}</p>
            <p class="text-subtitle-2 mb-2">District: {{ city.district }}</p>
            <p>{{ shortenedDescription(city.description) }}</p>
            <button class="btn py-1 mt-2 ps-0" @click.stop="toggleDetails(city)">
              {{ city.showDetails ? 'Show Less' : 'Read More' }}
            </button>
          </div>
        </div> -->

        <!-- Card Back -->
        <!-- <div class="card-back">
          <div class="card-body">
            <h3>{{ city.saverName }}</h3>
            <hr>
            <p class="scrollable-description">{{ city.description }}</p>
          </div>
        </div>
      </div> -->

      <!-- Modal for Image -->
      <!-- <div v-if="showModal" class="modal" @click="closeModal">
        <div class="modal-content">
          <img :src="'data:image/jpeg;base64,'+modalImage" @click.stop />
        </div>
      </div>
    </div> -->

    <!-- Footer Component -->
    <!-- <footer-page ></footer-page>
  </div>
</template>

<script>
import axios from 'axios';
import FooterPage from './FooterPage.vue';
import HeaderPage from './HeaderPage.vue';

export default {
  components: {
    FooterPage,
    HeaderPage
  },
  data() {
    return {
      cities: [],
      showModal: false,
      modalImage: '',
      selectedCategory: '',
      selectedDistrict: '',
      categories: ['Lake', 'pond', 'Tree', 'Seashore', 'soil', 'Canal', 'Plantation', 'Garden'],
      districts: [
        'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode',
        'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
      ]
    };
  },
  created() {
    this.fetchCities();
  },
  methods: {
    async fetchCities() {
      try {
        const response = await axios.get('http://192.168.1.46:8080/GreenGuard/getAll');
        this.cities = response.data;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },

    applyFilters() {
      // Filtering logic based on selectedCategory and selectedDistrict
      const filteredCities = this.cities.filter(city => {
        if (this.selectedCategory && city.category !== this.selectedCategory) {
          return false;
        }
        if (this.selectedDistrict && city.district !== this.selectedDistrict) {
          return false;
        }
        return true;
      });
      this.cities = filteredCities;
    },
    toggleDetails(city) {
      city.showDetails = !city.showDetails;
    },
    shortenedDescription(description) {
      const words = description.split(' ');
      if (words.length > 16) {
        return words.slice(0, 16).join(' ') + '...';
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
</script> -->
<!-- 
<style scoped>
#root {
  background-color: #8BC34A; 
  background-image: url('~@/assets/background10.jpg'); /* Adjust path if necessary */
  background-size: cover; /* Adjust to cover the entire container */
  background-position: center; /* Center the background image */
  min-height: 100vh; /*
  /* background-color: #F5F5DC;  */
  /* background-color:#9E9E9E; */
  min-height: 100vh; /* Ensure the background covers the full height */
}



/* Filters Styles */
.filters {
  display: flex;
  gap: 20px;
  padding: 10px;
  justify-content: flex-end; /* Align filters to the right */
  /* background-color: #f5f5dc; */
  z-index: 100;
} -->
<!-- 
/* .category label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: #000;
} */
.category {
  position: relative;
}

.category label i {
  font-size: 1.5rem;
  
}
.category select {
  border: 1px solid white;
  padding: 8px 12px;
  border-radius: 5px;
  width: 170px;
}

.district select {
  border: 1px solid white;
  padding: 8px 12px;
  border-radius: 5px;
  width: 170px;
}
.category select,
.district select {
  border: 1px solid white;
  padding: 8px 12px;
  border-radius: 5px;
  width: 170px;
  color: white; /* Set text color */
  background-color: black; /* Set background color */
}

.category select option,
.district select option {
  color: black; /* Set text color for options */
  background-color: white; /* Set background color for options */
}

/* Ensure the dropdown arrow color matches the text color */
.category select::-ms-expand,
.district select::-ms-expand {
  color: white;
}
/* Card Container Styles */
.card-container {
  padding: 0 1rem;
  counter-reset: card;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  gap: 1rem;
  max-width: 92%;
  margin: 20px auto; /* Added margin-top for spacing from filters */
}
.card {
  margin: 1em 0;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  min-height: 487px;
  display: grid;
  grid-template-rows: 1fr;
  cursor: pointer;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform-style: preserve-3d;
  position: relative;
  perspective: 1000px;
  width: 325px;
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
  transform: rotateY(180deg);
  color: #000;
  padding: 1rem;
}
.card.is-flipped {
  transform: rotateY(180deg);
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
  border: 1px solid #007bff;
  color: #007bff;
  background-color: transparent;
  padding: 4px 10px;
  border-radius: 4px;
  margin-top: 8px;
  margin-bottom: 5px;
}
.scrollable-description {
  max-height: 370px;
  overflow-y: auto;
}
.scrollable-description::-webkit-scrollbar {
  width: 2px;
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
.scrollable-description {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
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
}
.modal-content {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
}
.modal-content img {
  max-width: 900px;
  max-height: 900px;
  border-radius: 1rem;
}
</style>  -->








<!-- <template>
  <div id="root">
    <nav class="navBar">
      <h5 class="nav-heading">Natural</h5>
      <div class="nav-buttons">
        <button class="white-border" @click="toSign">Sign Up</button>
        <button class="white-border" @click="toLogin">Login</button>
      </div>
    </nav>

    <div class="card-container">
      <div v-for="(gal) in gallery" :key="gal.name" class="card" @click="showPopup(gal)">
        <img :src="gal.image" alt="Gallery Image" class="card-image">
        <div class="card-content">
          <h2 class="card-title">{{ gal.name }}</h2>
          <a class="location"><span class="mdi mdi-map-marker-outline "></span>Location</a>
          <p class="card-description">
            {{ truncateDescription(gal.description) }}
            <span class="read-more" @click.stop="showPopup(gal)">Read More</span>
          </p>
        </div>
      </div>
    </div>

    <div v-if="selectedGallery" class="popup" @click="closePopup">
      <div class="popup-content" @click.stop>
        <span class="close" @click="closePopup">&times;</span>
        <img :src="selectedGallery.image" alt="Gallery Image" class="popup-image">
        <div class="popup-text">
          <h2>{{ selectedGallery.name }}</h2>
          <a class="location"><span class="mdi mdi-map-marker-outline "></span>Location</a>
          <p>{{ selectedGallery.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gallery: [
        {
          image: require("@/assets/lake1.jpg"),
          name: "Kerala heritage museum",
          description: "I'm a thing. I'm a thing. But, like most politicians, he promised more than he could deliver. I'm a thing. But, like most politicians, he promised more than he could deliver. I'm a thing. But, like most politicians, he promised more than he could deliver. I'm a thing. But, like most politicians, he promised more than he could deliver. But, like most politicians, he promised more than he could deliver. I'm a thing. But, like most politicians, I'm a thing. But, like most politicians, he promised more than he could deliver. he promised more than he could deliver. I'm a thing. I'm a thing. But, like most politicians, he promised more than he could deliver. I'm a thing. But, like most politicians, he promised more than he could deliver. I'm a thing. But, like most politician.",
        },
        {
          image: require("@/assets/lake2.jpg"),
          name: "Kerala traditional painting",
          description: "I'm a thing. But, like most politicians, he promised more than he could deliver...",
        },
        {
          image: require("@/assets/lake3.jpg"),
          name: "Kerala Folklore Museum",
          description: "I'm a thing. But, like most politicians, he promised more than he could deliver...In this article, I’d like to reacquaint you with the humble workhorse of communication that is the paragraph. Paragraphs are everywhere. In fact, at the high risk of stating the obvious, you are reading one now. Despite their ubiquity",
        },
        {
          image: require("@/assets/lake4.jpeg"),
          name: "Travancore Painters",
          description: "I'm a thing. But, like most politicians, I'm a thing. But, like most politicians, he promised more than h he promised more than he could deliver...",
        },
        {
          image: require("@/assets/lake5.jpeg"),
          name: "Kerala Folklore Museum",
          description: "I'm a thing. But, like most politicians, he promised more than he could deliver...",
        },
        {
          image: require("@/assets/lake6.jpeg"),
          name: "Cultural musical museum",
          description: "I'm a thing. But, like most politicians, he promised more than he could deliver...",
        },
        {
          image: require("@/assets/lake1.jpg"),
          name: "Travancore Painters",
          description: "I'm a thing. But, like most politicians, he promised more than he could deliver...",
        },
      ],
      selectedGallery: null,
    };
  },
  methods: {
    truncateDescription(description) {
      const maxLength = 100; // Define the max length for truncated description
      return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
    },
    showPopup(gal) {
      this.selectedGallery = gal;
    },
    closePopup() {
      this.selectedGallery = null;
    },
    toSign() {
      // Logic for Sign Up button
      console.log("Sign Up clicked");
    },
    toLogin() {
      // Logic for Login button
      console.log("Login clicked");
    }
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 10px ;
}
body {
  background: #2b547e;
}
.navBar {
  width: 100%;
  background-color: #25383c;
  color: white;
  padding: 10px 20px;
  display: flex;
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
.card-container {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  width: calc(33.33% - 10px);
  margin-bottom: 20px;
  border-radius: 8px;
  max-width: 450px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: auto;
}
.location{
  color: royalblue;
  text-decoration: underline;
  text-align: left;
}
.card-content {
  padding: 10px;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.card-description {
  font-size: 1rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
}

.read-more {
  color: blue;
  cursor: pointer;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  position: relative;
  width: 90%;
  max-width: 800px;
  padding: 0;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}

.popup-image {
  width: 100%;
  height: 400px;
}

.popup-text {
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 20px;
  width: 100%;
}

.popup-text h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.popup-text p {
  font-size: 1rem;
  width: 100%;
}
</style> -->


  <!-- <template>
  <div>
    <div class="card-container">
      <div v-for="(gal) in gallery" :key="gal.saverName" class="card" @click="showPopup(gal)">
        <img :src="'data:image/jpeg;base64,'+gal.image" alt="Gallery Image" class="card-image">
        <div class="card-content">
          <h2 class="card-title">{{ gal.saverName }}</h2>
          <h5 class="card-category">{{ gal.category }}</h5>
          <p class="card-district">{{ gal.district }}</p>
          <p class="card-description">
            {{ truncateDescription(gal.description) }}
            <span class="read-more" @click.stop="showPopup(gal)">Read More</span>
          </p>
        </div>
      </div>
    </div>

    <div v-if="selectedGallery" class="popup" @click="closePopup">
      <div class="popup-content" @click.stop>
        <span class="close" @click="closePopup">&times;</span>
        <img :src="'data:image/jpeg;base64,'+selectedGallery.image" alt="Gallery Image" class="popup-image">
        <div class="popup-text">
          <h2>{{ selectedGallery.name }}</h2>
          <h5>{{ selectedGallery.category }}</h5>
          <p>{{ selectedGallery.district }}</p>
          <p>{{ selectedGallery.description }}</p> 
       </div>
      </div>
    </div>
  </div>
</template> -->

<!-- <script>
import axios from 'axios';

export default {
  data() {
    return {
      gallery: [],
      selectedGallery: null,
    };
  },
  mounted() {
    this.fetchGalleryData();
  },
  methods: {
    async fetchGalleryData() {
      try {
        const response = await axios.get();//'http://192.168.1.7:8080/GreenGuard/getAll'
        console.log(response.data);
        this.gallery = response.data;

      } catch (error) {
        console.error('Error fetching gallery data:', error); 
        // Handle error (e.g., show error message to user)
      }
     },
     truncateDescription(description) {
      const maxLength = 100; // Define the max length for truncated description
      return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
      },
     showPopup(gal) {
       this.selectedGallery = gal;
     },
    closePopup() {
      this.selectedGallery = null;
    },
  },
 };
</script>  

<style scoped>
.card-container {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  width: calc(33.33% - 10px);
  margin-bottom: 20px;
  border-radius: 8px;
  max-width: 650px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: auto;
}
.location{
  color: royalblue;
  text-decoration: underline;
  text-align: left;
}
.card-content {
  padding: 10px;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.card-category {
  font-size: 1rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-description {
  font-size: 1rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-district {
  font-size: 1rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
}

.read-more {
  color: blue;
  cursor: pointer;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  position: relative;
  width: 90%;
  max-width: 800px;
  padding: 0;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}

.popup-image {
  width: 100%;
  height: 400px;
}

.popup-text {
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 20px;
  width: 100%;
}

.popup-text h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}
.popup-text h5 {
  font-size: 1.2rem;
  width: 100%;
}
.popup-text p {
  font-size: 1rem;
  width: 100%;
}
</style> -->