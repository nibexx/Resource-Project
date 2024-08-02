
<template>
  <div id="root">
    <header-page></header-page>

    <!-- Filter Dropdowns -->
    <div class="filters-container">
      <!-- Category Dropdown -->
      <div class="dropdown-wrapper">
        <label for="categoryDropdown">
          <i class="mdi mdi-filter-menu filter-icon"></i>
        </label>
        <select id="categoryDropdown" v-model="selectedCategory">
          <option value="">Filter Category</option>
          <option class="dropdown" v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>

      <!-- District Dropdown -->
      <div class="dropdown-wrapper">
        <label for="districtDropdown">
          <i class="mdi mdi-filter-menu filter-icon"></i>
        </label>
        <select id="districtDropdown" v-model="selectedDistrict">
          <option value="">Filter Districts</option>
          <option class="dropdown" v-for="district in districts" :key="district">{{ district }}</option>
        </select>
      </div>
    </div>

    <!-- Card Container Component -->
    <div class="card-container mb-3" v-motion-fade-visible>
      <div
        class="card"
        v-for="(city, index) in filteredCities"
        :key="index"
        :class="{ 'is-flipped': city.showDetails }"
        @click="toggleDetails(city)"
      >
        <!-- Card Front -->
        <div class="card-front">
          <div class="card-header" @click.stop="openModal(city.image)">
            <img :src="'data:image/jpeg;base64,' + city.image" :width="310.92" :height="215.02" />
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
            <hr />
            <p class="scrollable-description">{{ city.description }}</p>
          </div>
        </div>
      </div>

      <!-- Modal for Image -->
      <v-dialog v-model="showModal" @click="closeModal" width="100%" height="600">
        <v-btn class="close-btn" @click="closeModal" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        <v-card>
          <v-img :src="'data:image/jpeg;base64,' + modalImage" @click.stop cover height="100vh"></v-img>
        </v-card>
      </v-dialog>
    </div>
    <br />
    <!-- Footer Component -->
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
    HeaderPage,
  },
  data() {
    return {
      allCities: [], // Store all cities data
      showModal: false,
      modalImage: '',
      selectedCategory: '',
      selectedDistrict: '',
      categories: ['Lake', 'Pond', 'Tree', 'Seashore', 'Soil', 'Canal', 'Plantation', 'Garden','River'],
      districts: [
        'Alappuzha',
        'Ernakulam',
        'Idukki',
        'Kannur',
        'Kasaragod',
        'Kollam',
        'Kottayam',
        'Kozhikode',
        'Malappuram',
        'Palakkad',
        'Pathanamthitta',
        'Thiruvananthapuram',
        'Thrissur',
        'Wayanad',
      ],
    };
  },
  created() {
    this.fetchCities();
  },
  computed: {
    filteredCities() {
      // Filter cities based on selectedCategory and selectedDistrict
      return this.allCities.filter((city) => {
        const categoryMatch = !this.selectedCategory || city.category === this.selectedCategory;
        const districtMatch = !this.selectedDistrict || city.district === this.selectedDistrict;
        return categoryMatch && districtMatch;
      });
    },
  },
  methods: {
    navLocation(locationId) {
      this.$router.push({ path: '/locations', query: { locationId } });
    },
    async fetchCities() {
      try {
        const response = await axios.get('http://192.168.1.18:8080/GreenGuard/getAll');
        console.log(response.data);
        this.allCities = response.data;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
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
    },
  },
};
</script>

<style scoped>
#root {
  background-color: #8BC34A; 
  background-image: url('~@/assets/b2.jpg'); /* Adjust path if necessary */
  background-size: cover; /* Adjust to cover the entire container */
  background-position: center; /* Center the background image */
  min-height: 100vh;
  min-height: 100vh; /* Ensure the background covers the full height */
}



/* Filters Styles */
.filters-container {
  display: flex;
  gap: 20px; /* Adds space between the dropdowns */
  margin-left: 1130px;
  margin-top: 10px;
}

.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.filter-icon {
  position: absolute;
  top: 50%;
  left: 10px; /* Adjust icon's horizontal position */
  transform: translateY(-50%);
  pointer-events: none; /* Ensures clicks go through to the select */
  color: #ffffff;
  font-size: 1.2em;
  z-index: 1; /* Ensure icon is above the dropdown */
}

select {
  padding: 10px 30px; /* Adjust padding for the icon */
  border-radius: 4px;
  border: 2px solid #ffffff;
  background-color: rgba(13, 13, 13, 0.201);
  appearance: none; /* Remove default styling */
  -webkit-appearance: none; /* Remove default styling for Safari */
  -moz-appearance: none; /* Remove default styling for Firefox */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E"); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 12px;
  color: #ffffff;
  font-size: 1em;
  width: 180px; /* Set a width for the dropdown */
}

.dropdown {
  padding: 8px;
  color: #333;
  background-color: white;
  border-bottom: 1px solid #ffffff;
}

.dropdown:last-child {
  border-bottom: none; /* Remove border from last item */
}

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
  color: #030303;
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
  overflow: hidden; /* Ensure no scrollbars show */
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  width: 500px; /* Responsive width */
 /* Maximum width for larger screens */
  height:300px; /* Responsive height */
  /* Maximum height for larger screens */
  transform: translateY(-800px); 
}

.modal-content img {
  max-width: 100%; /* Scale the image to fit the modal */
  max-height: 100%;
  object-fit: contain; /* Ensures the image maintains its aspect ratio */
  border-radius: 1rem;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #070707; /* Adjust color if needed */
  z-index: 1001; /* Ensure the button is above other elements */
}

.close-btn .v-icon {
  font-size: 1.5rem;
  
}

</style>