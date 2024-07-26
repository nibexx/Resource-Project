<!-- <template>
  <div id="root">
      Header Component  
    <nav class="navBar">
      <h5 class="nav-heading">Natural</h5>
      <div class="nav-buttons">
        <button class="white-border" @click="toSign">Sign Up</button>
        <button class="white-border" @click="toLogin">Login</button>
      </div>
    </nav>

 Card Container Component  
    <div class="card-container" v-motion-fade-visible>
      <div class="card" v-for="(city, index) in cities" :key="index" :class="{ 'is-flipped': city.showDetails }" @click="toggleDetails(city)">
        <div class="card-front">
          <div class="card-header" @click.stop="openModal(city.image)">
            <img :src="'data:image/jpeg;base64,'+city.image" :width="276.92" :height="215.02" />
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
 Footer Component 
    <footer class="text-center text-lg-start bg-dark text-muted">
 Section: Social media 
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      Left  
        <div class="me-5 d-none d-lg-block text-light bg-dark">
          <span>Get connected with me on social networks:</span>
        </div>
   
         <div>
          <a href="https://www.instagram.com/vikram_4008/" class="me-4 text-reset">
            <i class="mdi mdi-instagram" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
          <a href="https://www.facebook.com/vikram.dhole.1" class="me-4 text-reset">
            <i class="mdi mdi-facebook" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="mdi mdi-twitter" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
          <a href="mailto:vd31134@gmail.com" class="me-4 text-reset solid">
            <i class="mdi mdi-email-outline" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
          <a href="tel:+919145479297" class="me-4 text-reset">
            <i class="mdi mdi-phone" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
        </div> 
    
      </section>

      <div class="text-center p-4 text-light bg-dark" style="background-color: rgba(0, 0, 0, 0.05);">
        © 2023 Copyright:
        <a class="text-reset fw-bold text-light bg-dark" style="text-decoration: underline;" href="https://mdbootstrap.com/">www.naturalresources.com</a>
      </div>
     
     </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
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
      const response = await axios.get ('http://192.168.1.7:8080/GreenGuard/getAll');
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
</script>  -->




<!-- <style scoped>

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
  border: 1px solid #007bff; 
  color: #007bff; 
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

</style>  -->


<!-- <template>
  <div id="root">
    <header-page></header-page>

    
    <div class="filters">
   
      <div class="category">
        <label for="categoryDropdown">
          <i class="mdi mdi-filter-menu mr-3" style="color: white;"></i>
        </label>
        <select id="categoryDropdown" v-model="selectedCategory" @change="applyFilters">
          <option value="">Filter Category</option>
          <option class="dropdown" v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>

      
      <div class="district">
        <select id="districtDropdown" v-model="selectedDistrict" @change="applyFilters">
          <option value="">Filter Districts</option>
          <option class="dropdown" v-for="district in districts" :key="district">{{ district }}</option>
        </select>
      </div>
    </div>

 
    <div class="card-container" v-motion-fade-visible>
      <div class="card" v-for="(city, index) in cities" :key="index" :class="{ 'is-flipped': city.showDetails }" @click="toggleDetails(city)">
   
        <div class="card-front">
          <v-carousel>
            <v-carousel-item v-for="(image, imgIndex) in city.images" :key="imgIndex">
              <img :src="'data:image/jpeg;base64,' + image" :width="310.92" :height="215.02" />
            </v-carousel-item>
          </v-carousel>
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
        </div>

        <div class="card-back">
          <div class="card-body">
            <h3>{{ city.saverName }}</h3>
            <hr>
            <p class="scrollable-description">{{ city.description }}</p>
          </div>
        </div>
      </div>

      <v-dialog v-model="showModal" max-width="900px">
        <v-carousel>
          <v-carousel-item v-for="(image, imgIndex) in modalImages" :key="imgIndex">
            <img :src="'data:image/jpeg;base64,' + image" />
          </v-carousel-item>
        </v-carousel>
      </v-dialog>
    </div>

    <footer-page></footer-page>
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
      modalImages: [],
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
        const response = await axios.get('http://192.168.1.9:8080/GreenGuard/getAll');
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
    openModal(images) {
      this.modalImages = images;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalImages = [];
    }
  }
};
</script>

<style scoped>
#root {
  background-color: #8BC34A; 
  background-image: url('~@/assets/background9.jpg'); /* Adjust path if necessary */
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
  z-index: 100;
}

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}
.card-back {
  transform: rotateY(180deg);
  justify-content: center;
  text-align: center;
}
.card.is-flipped {
  transform: rotateY(180deg);
}
.card img {
  width: 100%;
  height: auto;
  border-radius: 1rem 1rem 0 0;
}
.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}
.card-body h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}
.card-body p {
  margin-bottom: 0.5rem;
}
.btn {
  background: none;
  border: none;
  color: #FF9800;
  cursor: pointer;
  text-align: left;
}
.scrollable-description {
  max-height: 150px;
  overflow-y: auto;
  padding-right: 5px; /* Adjust this value as needed */
}

/* Custom Scrollbar Styles */
.scrollable-description::-webkit-scrollbar {
  width: 4px;
}

.scrollable-description::-webkit-scrollbar-thumb {
  background-color: #FF9800; /* Scrollbar color */
  border-radius: 2px; /* Rounded edges for the scrollbar */
}

/* Custom Styles for Navigation and Indicators */
.v-window {
  background: none; /* Remove default background */
  padding: 1rem;
  max-width: 310.92px; /* Adjust this to match your image width */
}
.v-window__container {
  border-radius: 1rem; /* Match the border-radius of your card */
  overflow: hidden;
}
.v-carousel__controls__prev,
.v-carousel__controls__next {
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent background */
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
}
.v-carousel__controls__prev {
  left: -20px; /* Move it outside the card */
}
.v-carousel__controls__next {
  right: -20px; /* Move it outside the card */
}
.v-carousel__controls__prev:focus,
.v-carousel__controls__next:focus {
  box-shadow: none; /* Remove default focus shadow */
}

.v-carousel__controls__prev .v-icon,
.v-carousel__controls__next .v-icon {
  margin: 0;
}

.v-carousel__controls__prev .v-icon::before,
.v-carousel__controls__next .v-icon::before {
  font-size: 1.2rem; /* Adjust the size of the arrows */
}
</style> -->


<template>
  <div id="root">

    <header-page></header-page> 

      <!-- Filter Dropdowns -->
    
      <div class="filters"> 
        <!-- Category Filter -->
         <div class="category">
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
      </div> 
   


    <!-- Card Container Component -->
    <div class="card-container mb-3" v-motion-fade-visible>
      <div class="card" v-for="(city, index) in cities" :key="index" :class="{ 'is-flipped': city.showDetails }" @click="toggleDetails(city)">
       <!--Card Front -->
         <div class="card-front"> 
          <!-- <div class="card-header" @click.stop="openModal(city.images)">
    <v-carousel
      :items="city.images"
      hide-delimiters
      hide-controls
      :show-arrows="true"
      :autoplay="true"
      :cycle="true"
      :height="215.02"
    >
      <v-carousel-item
        v-for="(image, index) in city.images"
        :key="index"
        :src="'data:image/jpeg;base64,' + image"
        :width="310.92"
      >
      </v-carousel-item>
    </v-carousel>
  </div> -->
          <div class="card-header" @click.stop="openModal(city.image)">
            <img :src="'data:image/jpeg;base64,'+city.image" :width="310.92" :height="215.02" />
          </div>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <h3>{{ city.saverName }}</h3>
              <button @click="navLocation(city.id)" class="location-btn mdi mdi-map-marker-radius"></button>
            </div>
            <p class="text-subtitle-1">Category: {{ city.category }}</p>
            <p class="text-subtitle-2 mb-2">District: {{ city.district }}</p>
            <p>{{ shortenedDescription(city.description) }}</p>
            <button class="btn py-1 mt-2 ps-0" @click.stop="toggleDetails(city)">
              {{ city.showDetails ? 'Show Less' : 'Read More' }}
            </button>
          </div>
        </div> 

        <!-- Card Back -->
         <div class="card-back">
          <div class="card-body">
            <h3>{{ city.saverName }}</h3>
            <hr>
            <p class="scrollable-description">{{ city.description }}</p>
          </div>
        </div>
      </div>

      <!-- Modal for Image -->
       <div v-if="showModal" class="modal" @click="closeModal">
        <div class="modal-content">
          <img :src="'data:image/jpeg;base64,'+modalImage" @click.stop />
        </div>
      </div>
    </div> 
<br>
    <!-- Footer Component -->
     <footer-page ></footer-page>
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
      categories: ['Lake', 'Pond', 'Tree', 'Seashore', 'Soil', 'Canal', 'Plantation', 'Garden'],
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
    navLocation(locationId) {
  this.$router.push({ path: '/locations', query: { locationId } });
},
    async fetchCities() {
      try {
        const response = await axios.get('http://192.168.1.26:8080/GreenGuard/getAll');
        console.log(response.data);
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
</script> 

<style scoped>
#root {
  background-color: #8BC34A; 
  background-image: url('~@/assets/b2.jpg'); /* Adjust path if necessary */
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
} 
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
  background-color: rgba(0, 0, 0, 0.205); /* Set background color */
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
</style>

<!-- the original code
 

<template>
  <div id="root">

    <header-page></header-page> -->

      <!-- Filter Dropdowns -->
    
      <!-- <div class="filters">-->
        <!-- Category Filter -->
        <!-- <div class="category">
          <label for="categoryDropdown">
            <i class="mdi mdi-filter-menu mr-3" style="color: white;"></i>  
          </label>
          <select id="categoryDropdown" v-model="selectedCategory" @change="applyFilters">
            <option  value=""  >Filter Category</option>
            <option class="dropdown" v-for="category in categories" :key="category">{{ category }}</option>
          </select>
        </div>  -->

        <!-- District Filter -->
        <!-- <div class="district"> -->
          <!-- <label for="districtDropdown">Select District</label> -->
          <!-- <select id="districtDropdown" v-model="selectedDistrict" @change="applyFilters">
            <option value=""  >Filter Districts</option>
            <option class="dropdown" v-for="district in districts" :key="district">{{ district }}</option>
          </select>
        </div>
      </div>
    -->


    <!-- Card Container Component -->
    <!-- <div class="card-container" v-motion-fade-visible>
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
</template> -->

<!-- <script>
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
    }, -->

    <!-- applyFilters() { -->
      <!-- // Filtering logic based on selectedCategory and selectedDistrict
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
}

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
} -->
<!-- 
/* footer {
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
} */
</style>
 -->







<!--
CORRECT CODE WITH FOOTER COMPONENT
<template>
  <div id="root">
    
    <nav class="navBar">
      <h5 class="nav-heading">Natural</h5>
      <div class="nav-buttons">
        <button class="white-border" @click="toSign">Sign Up</button>
        <button class="white-border" @click="toLogin">Login</button>
      </div>
    </nav>

   
    <div class="card-container ">
      <div class="card me-2 ms-2" v-for="(city, index) in cities" :key="index" :class="{ 'is-flipped': city.showDetails }" @click="toggleDetails(city)">
        <div class="card-front">
          <div class="card-header" @click.stop="openModal(city.image)">
            <img :src="city.image" />
          </div>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <h3>{{ city.name }}</h3>
              <button class="location-btn mdi mdi-map-marker-radius"></button>
            </div>
            <p class="text-subtitle-1" style="font-family:Verdana, Geneva, Tahoma, sans-serif">category</p>
            <p class="text-subtitle-2 mb-2">district</p>
            <p style="font-weight: 400;">{{ shortenedDescription(city.description) }}</p>
            <button class="btn py-1 mt-2 ps-0" @click.stop="toggleDetails(city)">
              {{ city.showDetails ? 'Show Less' : 'Read More' }}
            </button>
          </div>
        </div>
        <div class="card-back">
          <div class="card-body">
            <h3>{{ city.name }}</h3>
            <hr>
            <p class="scrollable-description">{{ city.description }}</p>
          </div>
        </div>
      </div>

      <div v-if="showModal" class="modal" @click="closeModal">
        <div class="modal-content">
          <img :src="modalImage" @click.stop />
        </div>
      </div>
    </div>
    
  </div>
  <footer-page></footer-page>
</template>

<script>
import FooterPage from './FooterPage.vue';
export default {
  data() {
    return {
      components: {
        FooterPage
      },
      cities: [
        {
          name: 'Paris',
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1471&q=80',
          description: ' Paris is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich historyParis is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich history...',
          showDetails: false // Added for tracking card flip state
        },
        {
          name: 'Prague',
          image: 'https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?fit=crop&w=1470&q=80',
          description: 'Paris is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history. Paris is the capital city of France, known for its rich history Prague is the capital city of the Czech Republic, known for its stunning architecture and charming old town. Write short paragraphs...',
          showDetails: false // Added for tracking card flip state
        },
        {
          name: 'Vienna',
          image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?fit=crop&w=1472&q=80',
          description: 'Vienna is the capital city of Austria, known for its rich musical history.',
          showDetails: false // Added for tracking card flip state
        },
        {
          name: 'London',
          image: 'https://images.unsplash.com/photo-1520967824495-b529aeba26df?auto=format&fit=crop&w=1471&q=80',
          description: 'London is the capital city of England and the United Kingdom, known for its rich history, iconic landmarks, and diverse culture.',
          showDetails: false // Added for tracking card flip state
        },
        {
          name: 'Vienna',
          image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?fit=crop&w=1472&q=80',
          description: 'Vienna is the capital city of Austria, known for its rich musical history.',
          showDetails: false // Added for tracking card flip state
        },
      ],
      showModal: false,
      modalImage: ''
    };
  },
  methods: {
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
  },

  mounted() {
    const backgroundImageURL = require('@/assets/Background.jpeg');
    console.log('Background Image URL:', backgroundImageURL);
    document.body.style.backgroundImage = `url(${backgroundImageURL})`;
  },
  beforeUnmount() {
    document.body.style.backgroundImage = '';
  }
};


</script>

<style scoped>
body {
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
/* Header Styles */
.navBar {
  width: 100%;
  background-color: #25383c;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 30px;
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
</style>  

 -->





<!-- 
 
perfect card


<template>
  <div class="card-container">
    <div class="card" v-for="(city, index) in cities" :key="index" :class="{ 'is-flipped': city.showDetails }" @click="toggleDetails(city)">
      <div class="card-front">
        <div class="card-header" @click.stop="openModal(city.image)">
          <img :src="city.image" />
        </div>
        <div class="card-body pb-0">
          <div class="d-flex justify-content-between">
            <h3>{{ city.name }}</h3>
            <button class="location-btn mdi mdi-map-marker-radius"></button>
          </div>
          <p class="text-subtitle-1" style="font-family:Verdana, Geneva, Tahoma, sans-serif">category</p>
          <p class="text-subtitle-2 mb-2">district</p>
          <p style="font-weight: 400;">{{ shortenedDescription(city.description) }}</p>
          <button class="btn py-1 mt-2 ps-0" @click.stop="toggleDetails(city)">
            {{ city.showDetails ? 'Show Less' : 'Read More' }}
          </button>
        </div>
      </div>
      <div class="card-back">
        <div class="card-body">
          <h3>{{ city.name }}</h3>
          <hr>
          <p class="scrollable-description">{{ city.description }}</p>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal" @click="closeModal">
  <div class="modal-content">
    <img :src="modalImage" @click.stop />
  </div>
</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        {
          name: 'Paris',
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1471&q=80',
          description: 'Paris is the capital city of France, known for its rich history.Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich historym Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history Paris is the capital city of France, known for its rich history',
          showDetails: false // Added for tracking card flip state
        },
        {
          name: 'Prague',
          image: 'https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?fit=crop&w=1470&q=80',
          description: 'Prague is the capital city of the Czech Republic, known for its stunning architecture and charming old town. Write short paragraphs and cover one topic per paragraph. Long paragraphs discourage users from even trying to understand your material. Short paragraphs are easier to read and understand.',
          showDetails: false // Added for tracking card flip state
        },
        {
          name: 'Vienna',
          image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?fit=crop&w=1472&q=80',
          description: 'Vienna is the capital city of Austria, known for its rich musical history.',
          showDetails: false // Added for tracking card flip state
        },
        {
          name: 'London',
          image: 'https://images.unsplash.com/photo-1520967824495-b529aeba26df?auto=format&fit=crop&w=1471&q=80',
          description: 'London is the capital city of England and the United Kingdom, known for its rich history, iconic landmarks, and diverse culture.',
          showDetails: false // Added for tracking card flip state
        },
        {
          name: 'Vienna',
          image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?fit=crop&w=1472&q=80',
          description: 'Vienna is the capital city of Austria, known for its rich musical history.',
          showDetails: false // Added for tracking card flip state
        },
      ],
      showModal: false,
      modalImage: ''
    };
  },
  methods: {
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
</style> -->



<!--
new card
<template>
  <div class="card-container">
    <div class="card" v-for="(city, index) in cities" :key="index" :class="{ 'is-flipped': city.showDetails }">
      <div class="card-front">
        <div class="card-header">
          <img :src="city.image" />
        </div>
        <div class="card-body">
          <h3>{{ city.name }}</h3>
          <p>{{ city.description }}</p>
        </div>
        <div class="card-footer">
          <button class="btn" @click="toggleDetails(city)">Tell me more</button>
        </div>
      </div>
      <div class="card-back">
        <div class="card-body">
          <h3>{{ city.name }}</h3>
          <p>{{ city.fullDescription }}</p>
        </div>
        <div class="card-footer">
          <button class="btn" @click="toggleDetails(city)">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        {
          name: 'Paris',
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1471&q=80',
          description: 'Paris is the capital city of France, known for its rich history.',
          fullDescription: 'Paris is the capital city of France. It is known for its iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.'
        },
        {
          name: 'Prague',
          image: 'https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?fit=crop&w=1470&q=80',
          description: 'Prague is the capital city of the Czech Republic, known for its stunning architecture and charming old town.',
          fullDescription: 'Prague, the capital city of the Czech Republic, is famous for its historic architecture, including Prague Castle, Charles Bridge, and the Old Town Square.'
        },
        {
          name: 'Vienna',
          image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?fit=crop&w=1472&q=80',
          description: 'Vienna is the capital city of Austria, known for its rich musical history.',
          fullDescription: 'Vienna, the capital city of Austria, is renowned for its cultural events, imperial palaces, and classical music heritage.'
        },
        {
          name: 'London',
          image: 'https://images.unsplash.com/photo-1520967824495-b529aeba26df?auto=format&fit=crop&w=1471&q=80',
          description: 'London is the capital city of England and the United Kingdom, known for its rich history, iconic landmarks, and diverse culture.',
          fullDescription: 'London, the capital city of England and the United Kingdom, is famous for its history stretching back to Roman times, iconic landmarks such as the Big Ben, Buckingham Palace, and vibrant cultural scene.'
        }
      ]
    };
  },
  methods: {
    toggleDetails(city) {
      city.showDetails = !city.showDetails;
    }
  }
};
</script>

<style scoped>
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
  background: var(--bg-accent);
  box-shadow: -12px 12px 24px #212121, 12px -12px 24px #353535;
  min-height: 500px;
  display: grid;
  grid-template-rows: 1fr;
  background: linear-gradient(225deg, #2d2d2d, #363636);
  transition: transform 0.8s ease;
  transform-style: preserve-3d;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-front {
  z-index: 2;
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
  background-color: #fff;
  color: #000;
  padding: 1rem;
  border-radius: 1rem;
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
  counter-increment: card;
  content: "0" counter(card);
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
</style> -->


<!-- <template>
  <div id="app">
    <nav class="navBar">
      <h5 class="nav-heading">Natural</h5>
      <div class="nav-buttons">
        <button class="white-border" @click="toSign">Sign Up</button>
        <button class="white-border" @click="toLogin">Login</button>
      </div>
    </nav>
    

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

    <footer class="text-center text-lg-start bg-dark text-muted">
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div class="me-5 d-none d-lg-block text-light bg-dark">
          <span>Get connected with me on social networks:</span>
        </div>
        <div>
          <a href="https://www.instagram.com/vikram_4008/" class="me-4 text-reset">
            <i class="mdi mdi-instagram" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
          <a href="https://www.facebook.com/vikram.dhole.1" class="me-4 text-reset">
            <i class="mdi mdi-facebook" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="mdi mdi-twitter" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
          <a href="mailto:vd31134@gmail.com" class="me-4 text-reset">
            <i class="mdi mdi-email-outline" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
          <a href="tel:+919145479297" class="me-4 text-reset">
            <i class="mdi mdi-phone" style="color: white; font-weight: bold; font-size: 24px;"></i>
          </a>
        </div>
      </section>
      <div class="text-center p-4 text-light bg-dark" style="background-color: rgba(0, 0, 0, 0.05);">
        © 2023 Copyright:
        <a class="text-reset fw-bold text-light bg-dark" href="https://mdbootstrap.com/">www.naturalresources.com</a>
      </div>
    </footer>
  </div>
</template>

<script>
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
        const response = await axios.get('http://192.168.1.5:8080/GreenGuard/getAll');
        console.log(response.data);
        this.gallery = response.data;
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    },
    truncateDescription(description) {
      const maxLength = 100;
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
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 10px;
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
  max-width: 650px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: auto;
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

footer {
  margin-top: 20px;
  padding: 20px 0;
  background-color: #343a40;
  color: #fff;
  text-align: center;
}

footer a {
  color: #fff;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}

</style> -->


<!--

FILTERING LOGIC FROM BACKEND



<template>
  <div>
     Filter dropdowns 
    <div class="filter-dropdowns">
      <select v-model="selectedCategory" @change="applyFilters">
        <option value="">Select Category</option>
        <option value="tree">Tree</option>
        <option value="river">River</option>
        <option value="pond">Pond</option>
      </select>
      <select v-model="selectedDistrict" @change="applyFilters">
        <option value="">Select District</option>
        <option v-for="district in districts" :key="district" :value="district">{{ district }}</option>
      </select>
    </div> 

    Gallery cards
    <div class="card-container">
      <div v-for="(gal) in filteredGallery" :key="gal.saverName" class="card" @click="showPopup(gal)">
        <img :src="'data:image/jpeg;base64,' + gal.image" alt="Gallery Image" class="card-image">
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

     Popup 
    <div v-if="selectedGallery" class="popup" @click="closePopup">
      <div class="popup-content" @click.stop>
        <span class="close" @click="closePopup">&times;</span>
        <img :src="'data:image/jpeg;base64,' + selectedGallery.image" alt="Gallery Image" class="popup-image">
        <div class="popup-text">
          <h2>{{ selectedGallery.name }}</h2>
          <h5>{{ selectedGallery.category }}</h5>
          <p>{{ selectedGallery.district }}</p>
          <p>{{ selectedGallery.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      gallery: [],
      selectedGallery: null,
      selectedCategory: '',
      selectedDistrict: '',
      districts: [
        'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode',
        'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
      ]
    };
  },
  mounted() {
    this.fetchGalleryData();
  },
  methods: {
    async fetchGalleryData() {
      try {
        const response = await axios.get('http://192.168.1.5:8080/GreenGuard/getAll');
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
    applyFilters() {
      // Function to filter gallery based on selected category and district
      this.filteredGallery = this.gallery.filter(gal => {
        const categoryMatch = !this.selectedCategory || gal.category === this.selectedCategory;
        const districtMatch = !this.selectedDistrict || gal.district === this.selectedDistrict;
        return categoryMatch && districtMatch;
      });
    }
  },
  computed: {
    filteredGallery() {
      // Initialize filteredGallery with all gallery items
      if (!this.selectedCategory && !this.selectedDistrict) {
        return this.gallery;
      }

      // Apply filters
      return this.gallery.filter(gal => {
        const categoryMatch = !this.selectedCategory || gal.category === this.selectedCategory;
        const districtMatch = !this.selectedDistrict || gal.district === this.selectedDistrict;
        return categoryMatch && districtMatch;
      });
    }
  }
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

.filter-dropdowns {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.filter-dropdowns select {
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
}

.location {
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





<!--

footer section
 <template>
  <footer class="text-center text-lg-start bg-dark text-muted"> -->
    <!-- Section: Social media -->
    <!-- <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"> -->
      <!-- Left -->
      <!-- <div class="me-5 d-none d-lg-block text-light bg-dark">
        <span>Get connected with me on social networks:</span>
      </div> -->
      <!-- Left -->

      <!-- Right -->
      <!-- <div>
        <a href="https://www.instagram.com/vikram_4008/" class="me-4 text-reset">
          <i class="mdi mdi-instagram" style="color: white; font-weight: bold;font-size: 24px;"></i>
        </a>
        <a href="https://www.facebook.com/vikram.dhole.1" class="me-4 text-reset">
          <i class="mdi mdi-facebook" style="color: white; font-weight: bold;font-size: 24px;"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="mdi mdi-twitter" style="color: white; font-weight: bold;font-size: 24px;"></i>
        </a>
        <a href="mailto:vd31134@gmail.com" class="me-4 text-reset solid">
          <i class="mdi mdi-email-outline" style="color: white; font-weight: bold;font-size: 24px;"></i>
        </a>
        <a href="tel:+919145479297" class="me-4 text-reset">
          <i class="mdi mdi-phone" style="color: white; font-weight: bold;font-size: 24px;"></i>
        </a>

 
      </div> -->
      <!-- Right -->
    <!-- </section> -->
    <!-- Section: Social media -->

    <!-- Copyright -->
    <!-- <div class="text-center p-4 text-light bg-dark" style="background-color: rgba(0, 0, 0, 0.05);">
      © 2023 Copyright:
      <a class="text-reset fw-bold text-light bg-dark" href="https://mdbootstrap.com/">www.naturalresources.com</a>
    </div> -->
    <!-- Copyright -->
  <!-- </footer>
</template> -->

<!-- <script>
export default {
 
};
</script>

<style scoped>
</style>
 -->

<!--
header component
<template>
  <div id="root">
    <nav class="navBar">
      <h5 class="nav-heading">Natural</h5>
      <div class="nav-buttons">
        <button class="white-border" @click="toSign">Sign Up</button>
        <button class="white-border" @click="toLogin">Login</button>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toSign() {
      // Logic for Sign Up button
      console.log("Sign Up clicked");
    },
    toLogin() {
      // Logic for Login button
      console.log("Login clicked");
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 10px;
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
</style> -->



<!-- <template>
  <div class="container">
    <div class="movie-card">
      <div class="poster">
        <img src="https://m.media-amazon.com/images/M/MV5BZjU2N2I3MzctMWUwOC00MTQwLTljYWEtOTVkYzU4MmM3NjkzXkEyXkFqcGdeQXVyMzUxMzczMDc@._V1_SX300.jpg" />
      </div>
      <div class="details">
        <h3>Tar</h3>
        <div class="tags">
          <span>Movie</span>
          <span>2020</span>
        </div>
        <div class="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
            quos aliquam perferendis quaerat beatae hic sed porro accusamus et
            itaque.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 
};
</script>

<style scoped>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
  width: 1200px;
}
.movie-card {
  position: relative;
  width: 320px;
  height: 450px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  margin: 10px 0;
  color: #fff;
}
.movie-card .poster {
  position: relative;
  overflow: hidden;
}
.movie-card .poster::before {
  content: "";
  position: absolute;
  bottom: -180px;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, #1064a6 50%, transparent);
  transition: 0.5s;
  z-index: 1;
}
.movie-card:hover .poster::before {
  bottom: 0px;
}
.movie-card .poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}
.movie-card:hover .poster img {
  transform: translateY(-50px);
  filter: blur(5px);
}
.movie-card .details {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  text-align: start;
  width: 100%;
  bottom: -120px;
  transition: 0.5s;
  padding: 10px;
  z-index: 999;
  transition: 0.5s;
}
.movie-card:hover .details {
  bottom: 0;
}
.movie-card .tags span {
  border-radius: 5px;
  background: blue;
  padding: 4px;
  margin: 0 5px;
  margin-bottom: 10px;
}
.movie-card .details .tags span:nth-child(2) {
  background: orange;
}
</style> -->



<!-- <template>
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
    <video :src="videoSource" type="video/mp4" muted loop autoplay></video>
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
  methods: {
    toggleMenu1() {
      this.isActive = !this.isActive;
    },
    toLogin() {
      this.$router.push("/login-page");
    },
    toSign() {
      this.$router.push("/signup-page");
    },
  }
}
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

</style> -->
<!-- <template>
    <div id="app1">
      <div v-for="card in cards" :key="card.title" class="card">
        <img class="card-image" :src="card.image" alt="Card Image" />
        <div class="card-content">
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
          <button @click="editCard(card)">Edit</button>
          <button @click="deleteCard(card.title)">Delete</button>
        </div>
      </div>
  
      <div v-if="editingCard" class="modal">
        <h2>Edit Card</h2>
        <label for="editTitle">Title:</label>
        <input v-model="editingCard.title" id="editTitle" type="text" />
        
        <label for="editImage">Image:</label>
        <input type="file" @change="onImageChange" id="editImage" />
        <img v-if="editingCard.image" :src="editingCard.image" alt="New Image Preview" class="image-preview" />
        
        <label for="editDescription">Description:</label>
        <textarea v-model="editingCard.description" id="editDescription" rows="5"></textarea>
        
        <button @click="saveChanges">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
    <v-sheet
    class="position-relative"
    min-height="450"
  >


  
    <div class="position-absolute d-flex align-center justify-center w-100 h-100">
      <v-btn
        color="deep-purple-darken-2"
        size="x-large"
        @click="dialog = !dialog"
      >
        Open Dialog
      </v-btn>
    </div>

    <v-fade-transition hide-on-leave>
      <v-card
        v-if="dialog"
        append-icon="$close"
        class="mx-auto"
        elevation="16"
        max-width="500"
        title="Send a receipt"
      >
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
        </template>

        <v-divider></v-divider>

        <div class="py-12 text-center">
          <v-icon
            class="mb-6"
            color="success"
            icon="mdi-check-circle-outline"
            size="128"
          ></v-icon>

          <div class="text-h4 font-weight-bold">This receipt was sent</div>
        </div>

        <v-divider></v-divider>

        <div class="pa-4 text-end">
          <v-btn
            class="text-none"
            color="medium-emphasis"
            min-width="92"
            variant="outlined"
            rounded
            @click="dialog = false"
          >
            Close
          </v-btn>
        </div>
      </v-card>
    </v-fade-transition>
  </v-sheet>
  </template>
  
  <script>
    import { ref } from 'vue'


  export default {
    data() {
      return {
        
        cards: [
          {
            image: require("@/assets/lake1.jpg"),
            title: "Card Title 1",
            description: "Description for card 1. This is a sample description of the card content.",
          },
          {
            image: "https://via.placeholder.com/150",
            title: "Card Title 2",
            description: "Description for card 2. This is a sample description of the card content.",
          },
          {
            image: "https://via.placeholder.com/150",
            title: "Card Title 3",
            description: "Description for card 3. This is a sample description of the card content.",
          },
        ],
        editingCard: null,
        originalTitle: "",
         dialog : ref(true),
      };
    },
    methods: {
      deleteCard(title) {
        this.cards = this.cards.filter(card => card.title !== title);
      },
      editCard(card) {
        this.editingCard = { ...card };
        this.originalTitle = card.title;
      },
      onImageChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.editingCard.image = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      saveChanges() {
        const index = this.cards.findIndex(card => card.title === this.originalTitle);
        if (index !== -1) {
          this.cards.splice(index, 1, { ...this.editingCard });
          this.editingCard = null;
        }
      },
      cancelEdit() {
        this.editingCard = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    max-width: 700px;
    height: 270px;
    margin: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .card-image {
    width: 40%;
    object-fit: cover;
  }
  
  .card-content {
    padding: 16px;
    width: 60%;
  }
  
  .card-content h2 {
    margin: 0;
    font-size: 1.5em;
    color: #333;
  }
  
  .card-content p {
    margin: 8px 0 0;
    color: #666;
  }
  
  button {
    margin-top: 10px;
    margin-right: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #ddd;
  }
  
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .modal input,
  .modal textarea {
    width: 100%;
    margin-top: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .image-preview {
    width: 100%;
    max-height: 150px;
    object-fit: cover;
    margin-top: 10px;
  }
  
  .modal button {
    margin-top: 10px;
  }
  </style>
   -->

<!-- src/components/UserLocation.vue -->
<!-- <template>
  <div>
    <h1>User Location</h1>
    <button @click="getLocation">Get Location</button>
    <div v-if="error">{{ error }}</div>
    <div v-if="latitude && longitude">
      <p>Latitude: {{ latitude }}</p>
      <p>Longitude: {{ longitude }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UserLocation',
  setup() {
    const latitude = ref(null);
    const longitude = ref(null);
    const error = ref(null);

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            latitude.value = position.coords.latitude;
            longitude.value = position.coords.longitude;
          },
          (err) => {
            error.value = `Error: ${err.message}`;
          }
        );
      } else {
        error.value = "Geolocation is not supported by this browser.";
      }
    };

    return {
      latitude,
      longitude,
      error,
      getLocation,
    };
  },
};
</script>

<style scoped>
div {
  margin: 20px;
}
button {
  margin-bottom: 20px;
}
</style> -->

<!-- src/components/UserLocation.vue -->
<!-- <template>
  <div>
    <h1>User Location</h1>
    <button @click="getLocation">Get Location</button>
    <div v-if="error">{{ error }}</div>
    <div v-if="latitude && longitude">
      <p>Latitude: {{ latitude }}</p>
      <p>Longitude: {{ longitude }}</p>
      <l-map :zoom="13" :center="[latitude, longitude]" style="height: 2000px; width: 100%">
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker :lat-lng="[latitude, longitude]"></l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'UserLocation',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  setup() {
    const latitude = ref(null);
    const longitude = ref(null);
    const error = ref(null);
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            latitude.value = position.coords.latitude;
            longitude.value = position.coords.longitude;
          },
          (err) => {
            error.value = `Error: ${err.message}`;
          }
        );
      } else {
        error.value = "Geolocation is not supported by this browser.";
      }
    };

    return {
      latitude,
      longitude,
      error,
      getLocation,
      url,
      attribution,
    };
  },
};
</script>

<style scoped>
div {
  margin: 20px;
}
button {
  margin-bottom: 20px;
}
</style> -->
<!-- <template>
  <div class="map-container">
    <l-map :zoom="zoom" :center="center" class="full-page-map">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker v-if="markerPosition" :lat-lng="markerPosition">
        <l-popup>{{ markerPosition }}</l-popup>
      </l-marker>
    </l-map>
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        @keyup.enter="searchLocation" 
        placeholder="Search for a place"
      />
      <span class="search-icon mdi mdi-magnify" @click="searchLocation"></span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  setup() {
    const zoom = ref(13);
    const center = ref([9.4981, 76.3388]);
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const markerPosition = ref(null);
    const searchQuery = ref('');
    const provider = new OpenStreetMapProvider();

    const searchLocation = async () => {
      const results = await provider.search({ query: searchQuery.value });
      if (results && results.length > 0) {
        const { x, y } = results[0];
        markerPosition.value = [y, x];
        center.value = [y, x];
        console.log(`Latitude: ${y}, Longitude: ${x}`);
      }
    };

    return {
      zoom,
      center,
      url,
      attribution,
      markerPosition,
      searchQuery,
      searchLocation
    };
  }
};
</script>

<style>
.map-container {
  position: relative;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
}
.search-bar {
  position: absolute;
  background-color: white;
  margin-right: 15px;
  top: 10px;
  right: 10px;
  z-index: 1000;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.full-page-map {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.search-bar .search-icon {
  cursor: pointer;
  font-size: 1.5rem; /* Adjust icon size as needed */
  color: #007BFF; /* Adjust icon color */
}
</style> -->

<!-- <template>
  <div class="map-container">
    <l-map :zoom="zoom" :center="center" class="full-page-map" @click="handleMapClick">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker v-if="markerPosition" :lat-lng="markerPosition" :icon="redIcon">
        <l-popup>{{ markerPosition }}</l-popup>
      </l-marker>
    </l-map>
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        @keyup.enter="searchLocation" 
        placeholder="Search for a place"
      />
      <span class="search-icon mdi mdi-magnify" @click="searchLocation"></span>
    </div>
  </div>
</template> -->
<!-- <script>
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  setup() {
  const zoom = ref(19);  // Increased zoom level to 15
  const center = ref([9.4981, 76.3388]);
  const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const markerPosition = ref(null);
  const searchQuery = ref('');
  const provider = new OpenStreetMapProvider();

  // Red marker icon definition
  const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const searchLocation = async () => {
    const results = await provider.search({ query: searchQuery.value });
    if (results && results.length > 0) {
      const { x, y } = results[0];
      markerPosition.value = [y, x];
      center.value = [y, x];
      console.log(`Latitude: ${y}, Longitude: ${x}`);
    }
  };

  const handleMapClick = (event) => {
    const clickedPosition = event.latlng;
    markerPosition.value = [clickedPosition.lat, clickedPosition.lng];
  };

  return {
    zoom,
    center,
    url,
    attribution,
    markerPosition,
    searchQuery,
    searchLocation,
    handleMapClick,
    redIcon
  };
}

};
</script>
<style>
.map-container {
  position: relative;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
}
.search-bar {
  position: absolute;
  background-color: white;
  margin-right: 15px;
  top: 10px;
  right: 10px;
  z-index: 1000;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.full-page-map {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.search-bar .search-icon {
  cursor: pointer;
  font-size: 1.5rem; /* Adjust icon size as needed */
  color: #007BFF; /* Adjust icon color */
}
</style> -->

<!-- in this code i need some modifications that is if isearch a place and zoom in and iclick on that point then i should mark that place it should be a red pointer and there should be an info window -->
















